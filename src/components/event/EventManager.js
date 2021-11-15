export const createEvent = (newEvent) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(newEvent)
     })
     .then(res => res.json())
}

export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
     })
     .then(res => res.json())
}

// export const joinEvent = (eventId, status) => {
//     return fetch(`http://localhost:8000/events/${ eventId }/signup`, {
//         method: status?"DELETE":"POST",
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("lu_token")}`
//         }
//     })
//         .then(response => (status ? null:response.json()))
// }

export const leaveEvent = eventId => {
    return fetch(`http://localhost:8000/events/${ eventId }/signup`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
        .then(getEvents)
}

export const joinEvent = eventId => {
    return fetch(`http://localhost:8000/events/${ eventId }/signup`, {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
        .then(getEvents)
}
