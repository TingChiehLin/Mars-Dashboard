// Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {

//     // If image does not already exist, or it is not from today -- request it again
//     const today = new Date()
//     const photodate = new Date(apod.date)
//     console.log(photodate.getDate(), today.getDate());

//     console.log(photodate.getDate() === today.getDate());
//     if (!apod || apod.date === today.getDate() ) {
//         getImageOfTheDay(store)
//     }

//     // check if the photo of the day is actually type video!
//     if (apod.media_type === "video") {
//         return (`
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `)
//     } else {
//         return (`
//             <img src="${apod.image.url}" height="350px" width="100%" />
//             <p>${apod.image.explanation}</p>
//         `)
//     }
// }

// ------------------------------------------------------  API CALLS

// // Example API call
// const getImageOfTheDay = (state) => {
//     let { apod } = state
//     fetch(`http://localhost:3000/apod`)
//         .then(res => res.json())
//         .then(apod => updateStore(store, { apod }))
//     return data
// }

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

//Server Side

app.post('./info', async (req,res) => {
    try {
        res.send();
    } catch (err) {
        console.log('error:', err);
    }
})