import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGame, getGameTypes, updateGame } from './GameManager.js'
import "./Games.css"

export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    // const [currentGame, setCurrentGame] = useState({})
    // const [game, setGameState] = useState({})
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
        if (gameId) {
            getGame(gameId).then((gameData) => setCurrentGame({
                ...gameData,
                skillLevel: gameData.skill_level,
                numberOfPlayers: gameData.number_of_players,
                gameTypeId: gameData.game_type.id
            }))
        }
    }, [gameId])

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes()
            .then(data => setGameTypes(data))
    }, [])

    // const editGame = (event) => {
    //     event.preventDefault()

    //     updateGame(game).then(() => {
    //         history.push('/')
    //     })
    // }



    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    console.log(currentGame)

    const submitNewGame = (evt) => {
        evt.preventDefault()

        const newGame = {
            maker: currentGame.maker,
            title: currentGame.title,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            skillLevel: parseInt(currentGame.skillLevel),
            gameTypeId: parseInt(currentGame.gameTypeId)
        }
        createGame(newGame)
            .then(() => history.push("/games"))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame?.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame?.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame?.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame?.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select name="gameTypeId" placeholder="Select Game Type" className="form-control"
                        value={currentGame?.gameTypeId}
                        // placeholder="Select Game Type"
                        onChange={changeGameState}>
                        <option value="0" disabled>Select Game Type</option>
                        {
                            gameTypes.map(
                                (gameType) => {
                                    return <option name="gameTypeId" value={gameType.id}>{gameType.label}</option>})
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={submitNewGame}
                className="btn btn-primary btn__submit">Save Game</button>
        </form>
    )
}
