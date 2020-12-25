import React from 'react'
import Layout from '../../layouts/fulllayout'
import { Redirect } from 'react-router-dom'
import './Home.css';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
}));


const Home = () => {
    const token = localStorage.getItem('x-auth-token');
    const classes = useStyles();
    if (!token) {
        return (
            <Redirect to="/signin" />
        )
    }

    return (
        <Layout title="instaSohor">
            <div className="container d-flex justify-content-center">
                <div className="home">
                    <div className="home__feed">
                        <div className="home__feed__createPost row box-style">
                            <div className="col-md-12 mt-1">
                                <p className="title">Create Post</p>
                            </div>
                            <div className="col-md-12">
                            <Divider/>
                            </div>
                            <div className="col-md-12 d-flex align-items-center">
                                <div className="home__feed__createPost__image">
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="profile image"/>
                                </div>
                                <div className="home__feed__createPost__input">
                                    <input type="text" placeholder="Write something here"/>
                                </div>
                            </div>
                            <div className="col-md-12 d-flex align-items-center mt-2">
                                <div className={classes.root}>
                                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                    <label htmlFor="icon-button-file">
                                        <IconButton aria-label="upload picture" component="span" className="home__button__background">
                                            <ImageIcon /> <span className="ml-1">Photo/Video</span>
                                        </IconButton>   
                                    </label>
                                </div>
                                <div>
                                    <IconButton className="home__button__background">
                                        <InsertEmoticonIcon /> <span className="ml-1">Insert Emoji</span>
                                    </IconButton>
                                </div>
                            </div>  
                        </div>
                        <div className="row box-style mt-3">
                            <div className="col-md-12 d-flex align-items-center mt-2">
                                <div>
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="profile image"/>
                                </div>
                                <div className="ml-3">
                                    <div>
                                        <h4 className="content__title">Anna Sthesia</h4>
                                    </div>
                                    
                                    <div>
                                        <span className="content__time">Just Now</span>
                                    </div>
                                </div>
                                <div className="ml-auto home__feed__posts__action">
                                    <IconButton>
                                        <MoreHorizIcon/>
                                    </IconButton>
                                </div>
                            </div>

                            <div className="col-md-12 mt-3">
                                <p className="home__feed__posts__text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus
                                </p>
                            </div>

                            <div className="col-md-12 home__feed__posts__images">
                                <img className="home__feed__posts__image" src="https://source.unsplash.com/random" alt="profile image"/>
                                <img className="home__feed__posts__image" src="https://source.unsplash.com/random" alt="profile image"/>
                            </div>

                            <div className="col-md-12 d-flex mt-3 mb-2">
                                <div>
                                    <IconButton className="home__button__background ml-3">
                                        <ThumbUpAltOutlinedIcon className="home__like__btn__icon"/>
                                    </IconButton>
                                </div> 
                                <div>
                                    <IconButton className="home__button__background ml-2">
                                        <span>30 Likes</span>
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton className="home__button__background ml-2">
                                        <span>20 Comments</span>
                                    </IconButton>
                                </div>
                            </div>
                            <div className="col-md-12">
                            <Divider/>
                            </div>

                            <div className="col-md-12 d-flex mt-4">
                                <div>
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="profile image"/>
                                </div>

                                <div className="ml-3">
                                    <h4 className="content__title">DurJoy DudDro</h4>
                                    <h4 className="home__feed__posts__text">Nice Picture</h4>
                                    <div className="d-flex">
                                        <IconButton className="home__button__background">
                                            <ThumbUpAltOutlinedIcon className="home__like__btn__icon"/> 
                                        </IconButton>
                                        <IconButton className="home__button__background ml-2">
                                            <span>30 Likes</span>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="profile image"/>
                                </div>
                                <div className="ml-3">
                                    <h4 className="content__title">Web Workshop</h4>
                                    <h4 className="home__feed__posts__text">1 hour ago</h4>
                                </div>
                            </div>
                            <div className="d-flex mt-3 ml-3 align-items-center">
                                <div>
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="profile image"/>
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
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="profile image"/>
                                </div>
                                <div className="ml-3">
                                    <h4 className="content__title">Anna Sthesia</h4>
                                    <h4 className="home__feed__posts__text">Today</h4>
                                </div>
                            </div>
                            <div className="d-flex mt-3 ml-3 align-items-center">
                                <div>
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="profile image"/>
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
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="profile image"/>
                                </div>
                                <div className="ml-3">
                                    <h4 className="content__title">Iqonic Studio</h4>
                                    <h4 className="home__feed__posts__text">Arts and Entertainment</h4>
                                </div>
                            </div>
                            <div className="d-flex mt-3 ml-3 align-items-center">
                                <div>
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="profile image"/>
                                </div>
                                <div className="ml-3">
                                    <h4 className="content__title">Cakes & Bakes</h4>
                                    <h4 className="home__feed__posts__text">Business</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home
