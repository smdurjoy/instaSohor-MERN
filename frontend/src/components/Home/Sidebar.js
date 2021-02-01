import React from 'react'
import { Divider } from '@material-ui/core';

function Sidebar() {
    return (
        <div className="home__sidebar">
            <div className="box-style">
                <div className="mt-1">
                    <p className="title ml-3">Events</p>
                </div>
                <div className="col-md-12">
                <Divider/>
                </div>
                <div className="d-flex mt-3 ml-3 align-items-center">
                    <div>
                        <img className="home__image" src="https://source.unsplash.com/random" alt="Event"/>
                    </div>
                    <div className="ml-3">
                        <h4 className="content__title">Web Workshop</h4>
                        <h4 className="home__feed__posts__text">1 hour ago</h4>
                    </div>
                </div>
                <div className="d-flex mt-3 ml-3 align-items-center mb-2">
                    <div>
                        <img className="home__image" src="https://source.unsplash.com/random" alt="Event"/>
                    </div>
                    <div className="ml-3">
                        <h4 className="content__title">Fun Events and Festivals</h4>
                        <h4 className="home__feed__posts__text">Yesterday</h4>
                    </div>
                </div>
            </div>
            <div className="box-style mt-3">
                <div className="mt-1">
                    <p className="title ml-3">Upcoming Birthday</p>
                </div>
                <div className="col-md-12">
                <Divider/>
                </div>
                <div className="d-flex mt-3 ml-3 align-items-center">
                    <div>
                        <img className="home__image" src="https://source.unsplash.com/random" alt="Birthday"/>
                    </div>
                    <div className="ml-3">
                        <h4 className="content__title">Anna Sthesia</h4>
                        <h4 className="home__feed__posts__text">Today</h4>
                    </div>
                </div>
                <div className="d-flex mt-3 ml-3 align-items-center mb-2">
                    <div>
                        <img className="home__image" src="https://source.unsplash.com/random" alt="Birthday"/>
                    </div>
                    <div className="ml-3">
                        <h4 className="content__title">Paul Molive</h4>
                        <h4 className="home__feed__posts__text">Tomorrow</h4>
                    </div>
                </div>
            </div>
            <div className="box-style mt-3">
                <div className="mt-1">
                    <p className="title ml-3">Suggested Pages</p>
                </div>
                <div className="col-md-12">
                <Divider/>
                </div>
                <div className="d-flex mt-3 ml-3 align-items-center">
                    <div>
                        <img className="home__image" src="https://source.unsplash.com/random" alt="Page"/>
                    </div>
                    <div className="ml-3">
                        <h4 className="content__title">Iqonic Studio</h4>
                        <h4 className="home__feed__posts__text">Arts and Entertainment</h4>
                    </div>
                </div>
                <div className="d-flex mt-3 ml-3 align-items-center mb-2">
                    <div>
                        <img className="home__image" src="https://source.unsplash.com/random" alt="Page"/>
                    </div>
                    <div className="ml-3">
                        <h4 className="content__title">Cakes & Bakes</h4>
                        <h4 className="home__feed__posts__text">Business</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
