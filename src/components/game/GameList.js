import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getGames, deleteGame } from "./GameManager.js"
import { confirmAlert } from "react-confirm-alert"
import "../ReactConfirmAlert.css"
import "./Games.css"

export const GameList = (props) => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const { gameId } = useParams()

    useEffect(() => {
        getGames()
            .then(data => setGames(data))
    }, [])

    const deleteSingleGame = (gameId) => {
        deleteGame(gameId)
            .then(() => {
                getGames()
                    .then((gameList) => {
                        setGames(gameList)
                    })
            })
            .then(history.push({ pathname: "/games" }))
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this game?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteSingleGame(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert("Click No if you can't make up your mind")
                }
            ]
        })
    }

    return (
        <article className="games">
            <h2>Games List</h2>
            <button className="btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div className="game__count">#Events For This Game: {game.event_count}</div>
                        <Link to={`games/edit/${game.id}`}>Edit Game</Link>
                        <button className="btn__delete"
                            onClick={() => {
                                confirmDelete(game.id)
                            }}>Delete Game</button>
                    </section>

                }).reverse()
            }

        </article>

    )
}
