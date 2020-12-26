import React, { useEffect, useState } from 'react'
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
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import url from '../../BackendUrl'

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
    const [ posts, setPosts ] = useState([])
    const [ comment, setComment ] = useState('')
    const [ postText, setPostText ] = useState('')

    useEffect(() => {
        const getPosts = async () => {
            await axios.get('http://localhost:5000/posts/all', {
                headers: {
                    'x-auth-token' : localStorage.getItem('x-auth-token')
                }
            }).then(res => {
                setPosts(res.data)
            })
        }
    
        getPosts()
    }, [])

    const token = localStorage.getItem('x-auth-token');
    const classes = useStyles();
    if (!token) {
        return (
            <Redirect to="/signin" />
        )
    }

    const likePost = async (id) => {
        try {
            await axios.put(`${url}/posts/like/${id}`, null, {
                headers: {
                    'x-auth-token' : localStorage.getItem('x-auth-token')
                }
            }).then(result => {
                const newPosts = posts.map(data => {
                    if(data._id === result.data._id) {
                        return result.data
                    } else {
                        return data
                    }             
                })
                setPosts(newPosts)
            })
        } catch(err) {
            alert(err.message)
        }
    }

    const unlikePost = async (id) => {
        try {
            await axios.put(`${url}/posts/unlike/${id}`, null, {
                headers: {
                    'x-auth-token' : localStorage.getItem('x-auth-token')
                }
            }).then(result => {
                const newPosts = posts.map(data => {
                    if(data._id === result.data._id) {
                        return result.data
                    } else {
                        return data
                    }             
                })
                setPosts(newPosts)
            })
        } catch(err) {
            alert(err.message)
        }
    }

    const makeComment = async (text, postId, form) => {
        try {
            await axios.put(`${url}/posts/comment/${postId}`, { text }, {
                headers: {
                    'x-auth-token' : localStorage.getItem('x-auth-token')
                }
            }).then(result => {
                const newPosts = posts.map(data => {
                    if(data._id === result.data._id) {
                        return result.data
                    } else {
                        return data
                    }             
                })
                setPosts(newPosts)
                setComment('')
                form.reset()
            })

        } catch(err) {
            alert(err.message)
        }
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
                                    <img className="home__image" src="https://source.unsplash.com/random" alt="User Profile"/>
                                </div>
                                <div className="home__feed__createPost__input">
                                    <input className="w-100" type="text" placeholder="Write something here" onChange={(e) => setPostText(e.target.value)}/>
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
                                <div className="ml-auto">
                                    <IconButton className="home__feed__createPost__button" disabled={!postText}>
                                        <span>Post</span>
                                    </IconButton>
                                </div>
                            </div>  
                        </div>
                        {
                            posts.map(post => {
                                return (
                                    <div className="row box-style mt-3" key={post._id}>
                                        <div className="col-md-12 d-flex align-items-center mt-2">
                                            <div>
                                                <img className="home__image" src="https://source.unsplash.com/random" alt={post.postedBy.name}/>
                                            </div>
                                            <div className="ml-3">
                                                <div>
                                                    <h4 className="content__title">{post.postedBy.name}</h4>
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
                                                {post.text}
                                            </p>
                                        </div>

                                        <div className="col-md-12 home__feed__posts__images">
                                            <img className="home__feed__posts__image" src={post.image} alt={post.image}/>
                                            <img className="home__feed__posts__image" src="https://source.unsplash.com/random" alt={post.image}/>
                                        </div>

                                        <div className="col-md-12 d-flex mt-3 mb-2">
                                            <div>
                                                {
                                                    post.likes.includes(localStorage.getItem('user')) ? (
                                                        <IconButton className="home__button__background ml-3" onClick={() => unlikePost(post._id)} title="Dislike Post">
                                                            <ThumbDownAltOutlinedIcon className="home__like__btn__icon"/>
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton className="home__button__background ml-3" onClick={() => likePost(post._id)} title="Like Post">
                                                            <ThumbUpAltOutlinedIcon className="home__like__btn__icon"/>
                                                        </IconButton>
                                                    )
                                                } 
                                            </div> 
                                            <div>
                                                <IconButton className="home__button__background ml-2">
                                                    <span>{post.likes.length} Likes</span>
                                                </IconButton>
                                            </div>
                                            <div>
                                                <IconButton className="home__button__background ml-2">
                                                    <span>20 Comments</span>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            <Divider/>
                                        </div>
                                        
                                        { post.comments.length > 0 ? (
                                            post.comments.map(comment => {
                                                return (
                                                    <div className="col-md-12 d-flex mt-4" key={comment._id}>
                                                        <div>
                                                            <img className="home__comment__image" src="https://source.unsplash.com/random" alt={comment.commentedBy.name}/>
                                                        </div>
                                                        <div className="ml-3">
                                                            <h4 className="content__title">{comment.commentedBy.name}</h4>
                                                            <h4 className="home__feed__posts__text">{comment.text}</h4>
                                                            <div className="d-flex">
                                                                <IconButton className="home__button__background">   
                                                                    <ThumbUpAltOutlinedIcon className="home__like__btn__icon"/> 
                                                                </IconButton>
                                                                <IconButton className="home__button__background ml-2">
                                                                    <span>0 Likes</span>
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <></>
                                        ) }
                                        <div className="col-md-12 mt-4 mb-2">
                                            <form className="home__post__comment__form" onSubmit={(e) => {
                                                e.preventDefault()
                                                makeComment(comment, post._id, e.target)
                                            }}>
                                                <input type="text" className="home__post__comment__input" placeholder="Add a comment" onChange={(e) => setComment(e.target.value)}/>
                                                <IconButton >
                                                    <InsertEmoticonIcon />
                                                </IconButton>
                                                <IconButton disabled={!comment} type="submit" variant="contained" color="primary" className="home__post__comment__button">
                                                    <SendIcon/>
                                                </IconButton>
                                            </form>
                                        </div>
                                    </div>
                                )
                            })
                        }
        
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
                </div>
            </div>
        </Layout>
    )
}

export default Home
