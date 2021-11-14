import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createEvent, updateEvent, getEvent } from "./EventManager.js"
import { getGames } from '../game/GameManager.js'


export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const {eventId} = useParams()
    const [currentEvent, setEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        // TODO: Get all existing games from API
        getGames()
            .then(data => setGames(data))
    }, [])

    const changeEventState = (event) => {
        // TODO: Complete the onChange function
        const newEvent = Object.assign({}, currentEvent)
        newEvent[event.target.name] = event.target.value
        setEvent(newEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent?.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option name="gameId" value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: Create the rest of the input fields */}

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent?.description}
                        onchange={changeEventState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date: </label>
                    <input name="date" value={currentEvent?.date} 
                        onChange={changeEventState}
                        type="date"
                        id="date"
                        className="form-control"
                        placeholder="Choose a Date"
                        required/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Event Time: </label>
                    <input name="time" value={currentEvent?.time} 
                        onChange={changeEventState}
                        type="time"
                        id="time"
                        className="form-control"
                        placeholder="Choose a Time"
                        required/>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // TODO: Call the createEvent function and pass it the event object
                    const newEvent = {
                        gameId: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }
                    // TODO: Once event is created, redirect user to event list
                    {createEvent(newEvent)
                        .then(() => history.push("/events"))
                    }
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
