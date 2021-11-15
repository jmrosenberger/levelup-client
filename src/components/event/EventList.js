// import React, { useEffect, useState } from "react"
// import { useHistory } from "react-router-dom"
// import { getEvents } from "./EventManager.js"

// export const EventList = (props) => {
//     const history = useHistory()
//     const [events, setEvents] = useState([])

//     useEffect(() => {
//         getEvents().then(data => setEvents(data))
//     }, [])

//     return (
//         <article className="events">
//             <h2>Events List</h2>
//             <button className="create__event btn-2"
//                 onClick={() => {
//                     history.push({ pathname: "/events/new" })
//                 }}>
//                 Schedule New Event
//             </button>
//             {
//                 events.map(event => {
//                     return <section key={`event--${event.id}`} className="event">
//                         <div className="event__title">{event?.game?.title}</div>
//                         <div className="event__organizer">Organized By: {event?.organizer?.user.first_name} {event?.organizer?.user.last_name}</div>
//                         <div className="event__description">Event Description: {event?.description}</div>
//                         <div className="event__attendees"> Attendees: {event?.attendees}</div>
//                         <div className="event__dateTime">{event?.date} - {event?.time}</div>
//                     </section>
//                 })
//             }
//         </article>
//     )
// }

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents, joinEvent } from "./EventManager.js"
// import "./Events.css"

export const EventList = () => {
    const history = useHistory()
    const [ events, assignEvents ] = useState([])

    const eventFetcher = () => {
        getEvents()
            .then(data => assignEvents(data))
    }

    useEffect(() => {
        eventFetcher()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/events/new" })
                    }}
                >Schedule New Event</button>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div className="registration__organizer">Organized By: {event?.organizer?.user.first_name} {event?.organizer?.user.last_name}</div>
                        <div>Event Description: {event.description}</div>
                        <div>
                            {event.date} @ {event.time}
                        </div>
                        <button className="btn btn-2"
                                onClick={
                                    () => {
                                        joinEvent(event.id, event.joined)
                                            .then(() => eventFetcher())
                                    }
                                }
                        >{event.joined ? "Leave" : "Join"}</button>
                    </section>
                })
            }
        </article >
    )
}
