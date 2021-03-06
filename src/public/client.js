let store = Immutable.Map({
    user: { name: "NASA MARS EXPLORATION"},
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    navIndex: 0,
    roverInfo:[],
    roverImage:[]
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (state, newState) => {
    store = Object.assign(state, newState)
}

const updateIndex = (state, newState) => {
    store = state.merge(newState)
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
    let roverInfo = state.get('roverInfo')
    let roverImage = state.get('roverImage')
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
                ${renderRoverInfo(roverInfo, roverImage, renderRoverData, renderRecentlyImage)}
            </main>
        </div>
        ${footer()}
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    getRoverInfoData(store, store.get('rovers')[0]);
    getRoverImageData(store, store.get('rovers')[0]);
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
            updateIndex(store, {navIndex: i})
            index = i;
        } else {
            navItems[i].classList.remove('active');
        }
    }

    getRoverInfoData(store, store.get('rovers')[index]);
    getRoverImageData(store, store.get('rovers')[index]);
}

const nav = (rovers) => {
    const navigation_tags = rovers.map((element,index) => {
        const a = `<a id="${element}" class="nav-item ${index === store.get("navIndex") ? "active" : ""}" onclick='changeIndex(${element},${index})'> ${element} </a>`
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
const renderRoverInfo = (roverInfo, roverImage, renderRoverData, renderRecentlyImage) => {
    const roverHTML = renderRoverData(roverInfo);
    const roverimageHTML = renderRecentlyImage(roverImage);
    return `
        <section class="information-container">
            <div>
                ${roverHTML}
            </div>
            <h1 class="title">Most recently available photos</h1>
            <div class="recentPhoto-container">
                ${roverimageHTML}
            </div>
        </section>
    `
}

const renderRoverData = (state) => {
    const roverData = state.photo_manifest;
    return (
        `
        <h1 class="title">Rover Name: ${roverData.name}</h1>
        <div class="rover-container">
            <img src="./assets/image/${roverData.name + ".jpg"}" alt="" class="intro-rover-image"/>
            <div class="intro-rover-container">
                <div>Launch Date: ${roverData.launch_date} </div>
                <div>Landing Date: ${roverData.landing_date}</div> 
                <div>Status: 
                    <span class="status-active">
                        ${(roverData.status).toUpperCase()}
                    </span>
                </div>
            </div>
        </div>
        `
    )
}

const renderRecentlyImage = (state) => {
    const roverData = state.latest_photos;
    let content = ``;
    if (roverData == undefined) {
        content += `<div>
            <div class="introImage-text">There is no any news</div>
        </div>
        `
    } else {
        roverData.slice(0,4).map(element => {
            content += `<div>
                    <img class="renderImage" src=${element.img_src} alt="image"/>
                    <div class="introImage-text">Earth-Date: ${element.earth_date}</div>
                </div>
            `
        })
    }
    return content;
}

//get rover info
const getRoverInfoData = (state, rover) => {

    function handleError(err) {
        console.log(err);
    }

    const endPoint = `http://localhost:3000/roverinfo/${rover}`;
    fetch(endPoint, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            //const newStore = store.setIn(['roverInfo'], Immutable.fromJS(data))
            JSON.stringify(data);
            const newStore = state.set("roverInfo", data);
            // console.dir({"roverInfo": data})
            //updateStore(state, {'roverInfo': data.photo_manifest});
            updateStore(state, newStore);
            render(root, store);
    }).catch(handleError)
}

//get rover image
const getRoverImageData = (state, rover) => {
    function handleError(err) {
        console.log(err);
    }
    const endPoint = `http://localhost:3000/roverimage/${rover}`;
    fetch(endPoint, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            //JSON.parse(data);
            const newState = state.set('roverImage', data);
            updateStore(state, newState);
            //updateStore(state, {'roverImage': data.latest_photos});
    }).catch(handleError)
    
}