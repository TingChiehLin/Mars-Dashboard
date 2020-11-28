let store = {
    user: { name: "NASA MARS EXPLORATION" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    navIndex: 0,
    roverInfo: []
}

// add our markup to the page
const root = document.getElementById('root')
const information = document.getElementById('info');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const updateIndex = (store, newState) => {
    store = Object.assign(store, newState)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {
    let {user, rovers, navIndex, roverInfo} = state
    return `
        <div class="main-container">
            <header class="header" id="header">
                <h2>Mars Dashboard</h2>
                <div class="tab-container">
                    ${nav(rovers)}
                </div>
            </header> 
            <main>
                ${Greeting(user.name)}
                ${renderRoverInfo(rovers, navIndex, roverInfo)}
            </main>
        </div>
        ${footer()}
    `
}
//${roverInfo(rovers, navIndex)}
// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    getRoverImage(store, store.rovers[0]);
    render(root, store);
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1 class="center">${name} PROGRAM</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

function changeIndex(element, index) {
    const navItems = document.getElementsByClassName("nav-item");
    for(let i = 0; i < navItems.length; i++) {
        if(navItems[i] === element) {
            navItems[i].classList.add('active');
        } else {
            navItems[i].classList.remove('active');
        }
    }

   getRoverImage(store, store.rovers[index]);
   updateIndex(store, {navIndex: index});
}

const nav = (rovers) => {
    const navigation_tags = rovers.map((element,index) => {
        const a = `<a id="${element}" class="nav-item ${index === store.navIndex ? "active" : ""}" onclick='changeIndex(${element},${index})'> ${element} </a>`
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

const renderRoverInfo = (element, navIndex, roverInfo) => {
    return `
        <section class="information-container">
            <h1 class="title">Rover Name: ${element[navIndex]}</h1>
            <div class="rover-container">
                ${getRoverData(roverInfo, navIndex)}
            </div>
            <h1 class="title">Most recently available photos</h1>
            <div class="recentPhoto-container">
              ${getRecentlyImage(roverInfo)}
            </div>
        </section>
    `
}

const getRoverData = (state, navIndex) => {
    return (
        `
        <img src="./assets/image/${store.rovers[navIndex] + ".jpg"}" alt="" class="intro-rover-image"/>
        <div class="intro-rover-container">
            <div>Launch Date: ${state[0].rover.launch_date} </div>
            <div>Landing Date: ${state[0].rover.landing_date}</div> 
            <div>Status: ${state[0].rover.status}</div>
        </div>
        `
    )
}

const getRecentlyImage = (state) => {
    
    let content = ``;
    state.slice(0,2).map(element => {
        content += `<div>
                <img class="renderImage" src=${element.img_src} alt="image"/>
                <div class="introImage-text">Earth-Date: ${element.earth_date}</div>
            </div>
        `
    })
    return content;
}

//earth_date
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

const getRoverImage = (store , rover) => {

    function handleError(err) {
        console.log(err);
    }

    const endPoint = `http://localhost:3000/roverimage/${rover.toLowerCase()}`;
    fetch(endPoint, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            updateStore(store, { roverInfo: data })
    }).catch(handleError)
}

const postRover = () => {
    const robot = req.body.robot;
    const content = req.body.content;
    const endPoint = 'http://localhost:3000/info';
    fetch(endPoint, {
        method: 'POST',
        body: JSON.stringify({
            robot: 'A Rover Post',
            content: 'Curiosity'
        }),
        header: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.status(201).json())
        .then(data => {
            // message: "Post Test",
            // post: data
    });
}