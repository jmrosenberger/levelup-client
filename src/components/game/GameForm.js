import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGame, getGameTypes, updateGame } from './GameManager.js'
import "./Games.css"

export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({})
    const [editMode, toggleEditMode] = useState(false)
    const { gameId } = useParams()

    useEffect(() => {
        getGameTypes()
            .then(data => setGameTypes(data))
    }, [])

    const getGameToEdit = () => {
        if (gameId) {
            toggleEditMode(true)
            getGame(gameId)
                .then(gameData => setCurrentGame({
                    ...gameData,
                    skillLevel: gameData.skill_level,
                    numberOfPlayers: gameData.number_of_players,
                    gameTypeId: gameData.game_type.id
                }))
        } else {
            setCurrentGame({
                title: "",
                maker: "",
                numberOfPlayers: 0,
                skillLevel: 0,
                gameTypeId: 0
            })
        }
    }
    console.log(currentGame)

    useEffect(() => {
        getGameToEdit()
    }, [gameId])

    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select name="gameTypeId" placeholder="Select Game Type" className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                        <option value="0" disabled>Select Game Type</option>
                        {
                            gameTypes.map(
                                (gameType) => {
                                    return <option name="gameTypeId" value={gameType.id}>{gameType.label}</option>
                                })
                        }
                    </select>
                </div>
            </fieldset>
            <button onClick={(event) => {
                event.preventDefault()

                const game = {
                    maker: currentGame.maker,
                    title: currentGame.title,
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    skillLevel: parseInt(currentGame.skillLevel),
                    gameTypeId: parseInt(currentGame.gameTypeId)
                }
                {
                    editMode ? 
                        updateGame(game, gameId)
                            .then(() => {history.push('/games')})
                        : createGame(game)
                            .then(() => {history.push('/games')})
                }
            }}
            className="btn btn-primary">Save Game</button>
        </form>
    )
}
