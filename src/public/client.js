let store = {
    user: { name: "NASA MARS EXPLORATION" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')


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
                <h1>Mars Dashboard</h1>
                <div class="tab-container">
                    ${nav(rovers)}
                </div>
            </header> 
            <main>
                ${Greeting(store.user.name)}
                ${Info(rovers[0])}
            </main>
        </div>
        ${footer()}
    `
}

//Launch Date
// Landing Date
// Status
// Most recently available photos
// Date the most recent photos were taken


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

const nav = (element) => {
    return `
    <nav>
        <a href="" id="curiosity">${element[0]}</a>
        <a href="" id="opportunity">${element[1]}</a>
        <a href="" id="spirit">${element[2]}</a>
    </nav>
    `
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
        <section class="">
            <div></div>
            <div></div>
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



// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state
    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
    return data
}

const getRoverData = (name) => {
    fetch(`http://localhost:3000/info`, {
        method: `POST`,
        header: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => updateStore(store,{image}))
    return data
}