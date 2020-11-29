let store = Immutable.Map({
    user: { name: "NASA MARS EXPLORATION"},
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    navIndex: 0,
    roverInfo:[]
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const updateIndex = (store, newState) => {
    store = Object.assign(store, newState)
}

const render = async (root, state) => {
    root.innerHTML = App(state, renderRoverData, renderRecentlyImage)
}

// App high order function
const App = (state, renderRoverData, renderRecentlyImage) => {

    //Performance issue
    // let {user, rovers, navIndex, roverInfo} = state.toJS();
    let user = state.get('user')
    let rovers = state.get('rovers')
    let navIndex = state.get('navIndex')
    let roverInfo = state.get('roverInfo')

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
                ${renderRoverInfo(rovers, navIndex, roverInfo, renderRoverData, renderRecentlyImage)}
            </main>
        </div>
        ${footer()}
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    getRoverImageData(store, store.get('rovers')[0]);
    // render(root, store);
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
    updateIndex(store, {navIndex: index});
    getRoverImageData(store, store.rovers[index]);
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

const renderRoverInfo = (element, navIndex, roverInfo, renderRoverData, renderRecentlyImage) => {
    const roverHTML = renderRoverData(roverInfo, navIndex);
    const roverimageHTML = renderRecentlyImage(roverInfo);
    return `
        <section class="information-container">
            <h1 class="title">Rover Name: ${element[navIndex]}</h1>
            <div class="rover-container">
                ${roverHTML}
            </div>
            <h1 class="title">Most recently available photos</h1>
            <div class="recentPhoto-container">
                ${roverimageHTML}
            </div>
        </section>
    `
}

const renderRoverData = (roverInfo, navIndex) => {
    console.log(roverInfo);
    console.log(roverInfo.get('id'));
    return (
        `
        <img src="./assets/image/${roverInfo[navIndex] + ".jpg"}" alt="" class="intro-rover-image"/>
        <div class="intro-rover-container">
            <div>Launch Date: ${roverInfo[0].rover.launch_date} </div>
            <div>Landing Date: ${roverInfo[0].rover.landing_date}</div> 
            <div>Status: ${roverInfo[0].rover.status}</div>
        </div>
        `
    )
}

const renderRecentlyImage = (state) => {
    
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

const getRoverImageData = (store , rover) => {
    function handleError(err) {
        console.log(err);
    }
    console.log(rover);
    const endPoint = `http://localhost:3000/roverimage/${rover}`;
    fetch(endPoint, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            const newStore = store.setIn(['roverInfo'], Immutable.fromJS(data))
            updateStore(store, newStore);
            //updateStore(store, { roverInfo: data })
    }).catch(handleError)
}
