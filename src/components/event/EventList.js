import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents } from "./EventManager"

export const EventList = (props) => {
    const history = useHistory()
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <h2>Events List</h2>
            <button className="create__event"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}>
                Create New Event
            </button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.game.title}</div>
                        <div className="event__description">{event.description} by {event.organizer}</div>
                        <div className="event__attendees"> Attendees: {event.attendees}</div>
                        <div className="event__dateTime">{event.date} - {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}
