let store = {
    user: { name: "NASA MARS EXPLORATION" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    image: [],
    navIndex: 0
}

// add our markup to the page
const root = document.getElementById('root')
const information = document.getElementById('info');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)

}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {
    let { rovers, navIndex } = state

    return `
        <div class="main-container">
            <header class="header" id="header">
                <h2>Mars Dashboard</h2>
                <div class="tab-container">
                    ${nav()}
                </div>
            </header> 
            <main>
                ${Greeting(store.user.name)}
                ${updateInfo(store, rovers[navIndex])}
            </main>
        </div>
        ${footer()}
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>${name} PROGRAM</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

function changeIndex(rovers, index) {
    updateStore(store, {navIndex: index});
    updateInfo(store, index);
    console.log(rovers[0]);
    // element.classList.add('active');
    // if(element.id === index) {
    //     element.classList.add('active');
    // } else {
    //     element.classList.remove('active');
    // }
}

const nav = () => {
    let { rovers } = store
    const navigation_tags = rovers.map((element,index) => {
        const a = `<a id="${element}" onclick=changeIndex(${rovers},${index})> ${element} </a>`
        return a
    }).join(' ');
    return `<nav>
                ${navigation_tags}
            </nav>`;
}

const footer = () => {
    return `
        <footer class="foot-container">
            © Copyright 2020. Developed by Jay Lin
        </footer>
    `
}

const updateInfo = (store, navIndex) => {
    return `
        <section class="information-container">
            <div class="rover-container">
                <h1>Rover Name: ${navIndex}</h1>
                ${roverInfo(navIndex)}
                ${getRoverData(store)}}
            </div>
            <div class="recentInfo-container">

            </div>
        </section>
    `
}

const roverInfo = (state, index) => {
    //console.log(state);
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state
    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
    return data
}

const getRoverData = (state) => {
    let { image } = state;
    function handleError(err) {
        console.log(err);
    }
    const endPoint = 'http://localhost:3000/roverimage';
    fetch(endPoint)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        updateStore(store, { image: data })
    }).catch(handleError)
}

