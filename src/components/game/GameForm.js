import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    // const [currentGame, setCurrentGame] = useState({})
    const { gameId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes()
            .then(data => setGameTypes(data))
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */

    const handleInputChange = (event) => {
        const newGame = Object.assign({}, currentGame)
        newGame[event.target.name] = event.target.value
        setCurrentGame(newGame)
    }

    // const changeGameTitleState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.title = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameMakerState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.maker = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGamePlayersState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.numberOfPlayers = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameSkillLevelState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.skillLevel = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameTypeState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.gameTypeId = event.target.value
    //     setCurrentGame(newGameState)
    // }
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame?.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame?.maker}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame?.numberOfPlayers}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame?.skillLevel}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select type="text" name="gameTypeId" placeholder="Select Game Type" className="form-control"
                        onChange={handleInputChange}>
                        <option value={parseInt(currentGame?.game_type?.id)}>{currentGame?.game_type?.label}</option>
                        {
                            gameTypes.map(
                                (gameType) => {
                                <option name="gameTypeId" value={gameType.id}>{gameType.label}</option>})
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
