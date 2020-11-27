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
    let {user, rovers, navIndex} = state

    return `
        <div class="main-container">
            <header class="header" id="header">
                <h2>Mars Dashboard</h2>
                <div class="tab-container">
                    ${nav(rovers, navIndex)}
                </div>
            </header> 
            <main>
                ${Greeting(user.name)}
                ${roverInfo(rovers, navIndex)}
            </main>
        </div>
        ${footer()}
    `
}
//${roverInfo(rovers, navIndex)}
// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
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
    //const navActiveItem = document.getElementsByClassName(`nav-item-${index}`);
    const navItems = document.getElementsByClassName("nav-item");
    for(let i = 0; i < navItems.length; i++) {
        if(navItems[i] === element) {
            navItems[i].classList.add('active');
        } else {
            navItems[i].classList.remove('active');
        }
    }
    //Problem here
   updateStore(store, {navIndex: index});
}

const nav = (rovers, navIndex) => {

    const navigation_tags = rovers.map((element, index) => {
        const a = `<a id="${element}" class="nav-item-${navIndex}" onclick='changeIndex(${element},${index})'> ${element} </a>`
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

const roverInfo = (element, navIndex) => {
    return `
        <section class="information-container">
            <h1 class="title">Rover Name: ${element[navIndex]}</h1>
            <div class="rover-container">
                ${getRoverData(element[navIndex])}
            </div>
            <h1 class="title">Most recently available photos</h1>
            <div class="recentPhoto-container">
                ${getRecentlyImage(element[navIndex])}
            </div>
        </section>
    `
}
// ${getRoverData()}
// ${getRecentlyImage()}
// /  ${getRoverImage(element[navIndex])}

const getRoverData = (apod) => {

    return (
        `
        <div class="intro-rover-image">

        </div>
        <div class="intro-rover-container">
            <div>Launch Date: </div>
            <div>Landing Date: </div> 
            <div>Status: </div>
        </div>
        `
    )
}

const getRecentlyImage =  (apod) => {
    const data =  getRoverImage(store, apod);
    console.log(data);
    //data[0].img_src
    return (
        `<div>
        
            <img src=${""} alt="image"/>
            <div>Earth-Date: </div>
         </div>
        `
    )
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

const getRoverImage = (state, apod) => {
    let { image } = state;

    function handleError(err) {
        console.log(err);
    }
    const endPoint = `http://localhost:3000/roverimage/${apod.toLowerCase()}`;
    fetch(endPoint, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            updateStore(store, { image: data })
            console.log(data);
            console.log(data.image.photos);
            return data.image.photos;
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