let store = {
    user: { name: "NASA MARS EXPLORATION" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    image: [],
    navIndex: 'curiosity'
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
    let { rovers } = state

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
                ${Info(rovers)}
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

const nav = () => {
    const navElement = ['Curiosity', 'Opportunity', 'Spirit'];
    const navigation_tags = navElement.map(index => {
        const a = `<a id="${index}">${index}</a>`
        a.addEventListener('click',() => {
            
        })
        console.log(a);
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

const Info = (name) => {
    return `
        <section class="information-container">
            <div class="rover-container">
                <h1>Rover Name: ${name}</h1>
                ${roverInfo(name)}
                ${getRoverData(store)}}
            </div>
            <div class="recentInfo-container">

            </div>
        </section>
    `
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

const roverInfo = (state, index) => {
  console.log(state);
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
    fetch(`http://localhost:3000/roverimage`, {
        method: `GET`,
        header: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        updateStore(store, { image: data })
    })
}

