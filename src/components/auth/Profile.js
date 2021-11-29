import React, { useEffect, useContext, useState } from "react"
import { ProfileContext } from "./ProfileProvider.js"
import { getProfile } from "./ProfileManager.js"
import "./Profile.css"


export const Profile = () => {
    // const { profile, getUserProfile } = useContext(ProfileContext)
    const [profile, getUserProfile] = useState([])

    useEffect(() => {
        getProfile()
            .then(data => getUserProfile(data))
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: {profile.gamer && profile.gamer?.user.first_name} {profile.gamer && profile.gamer?.user.last_name}
                </div>
                <div className="profile__username">Username: {profile.gamer && profile.gamer?.user.username}</div>
                <div className="profile__bio">About you: {profile.gamer && profile.gamer?.bio}</div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events You Are Attending</h3>
                </header>
                <div className="registrations">
                    {
                        profile.attending?.map(event => {
                            return <div key={event.id} className="registration attending">
                                <div className="registration__game">{event.game.title}</div>
                                <div>{event.description}</div>
                                <div>
                                    {event.date} @ {event.time}
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events You Are Hosting</h3>
                </header>
                <div className="registrations">
                    {
                        profile.hosting?.map(event => {
                            return <div key={event.id} className="registration hosting">
                                <div className="registration__game">{event.game.title}</div>
                                <div>{event.description}</div>
                                <div>
                                    {event.date} @ {event.time}
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>
        </article>
    )
}
