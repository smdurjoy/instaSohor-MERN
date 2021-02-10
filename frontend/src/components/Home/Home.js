import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/fulllayout'
import { Redirect } from 'react-router-dom'
import './Home.css';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import axios from 'axios'
import url from '../../BackendUrl'
import Post from './Post';
import Sidebar from './Sidebar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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
    const [ postText, setPostText ] = useState('')
    const [ image, setImage ] = useState([]);
    const [ postBtnText, setPostBtnText ] = useState('Post')
    const [ open, setOpen ] = useState(false)
    const [ postId, setPostId ] = useState(false)
    const [ posts, setPosts ] = useState([])

    useEffect(() => {   
        window.scrollTo(0, 0)
        getPosts()
    }, [])

    const getPosts = async () => {
        await axios.get(`${url}/posts/all`, {
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(res => {
            setPosts(res.data)
        })
    }

    const token = localStorage.getItem('x-auth-token');
    const classes = useStyles();
    if (!token) {
        return (
            <Redirect to="/signin" />
        )
    }

    const postImagePreview = (e) => {
        if(e.target.files) {
            const imgArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
            setImage(imgArray)
        }
    }

    const renderImage = (src) => {
        return src.map(photo => {
            return <img src={photo} key={photo} className="post__image__preview mb-2" alt={photo}/>
        })
    }

    const addPost = async (form) => {
        try {
            setPostBtnText('Posting ...')
            const formData = new FormData(form);

            await axios.post(`${url}/posts/new`, formData, {
                headers: {
                    'x-auth-token' : localStorage.getItem('x-auth-token')
                }
            }).then(response => {
                if(response.status === 200) {
                    setPosts([...posts, response.data])
                    form.reset()
                    setImage([])
                    setPostBtnText('Post')
                }
            })

        } catch(err) {
            alert(err.message)
            setPostBtnText('Post')
        }
    }

    const editPostModal = (postId, postText) => {
        setPostText(postText)
        setPostId(postId)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setPostText('')
        setPostId('')
    }

    const updatePost = async () => {
        try {
            await axios.put(`${url}/posts/${postId}`, {text:postText}, {
                headers: {
                    'x-auth-token' : localStorage.getItem('x-auth-token')
                }
            }).then(response => {
                if(response.status === 200) {
                    alert(response.data)
                    getPosts()
                    setOpen(false)
                    setPostText('')
                    setPostId('')
                }
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
                            <form className="col-md-12" onSubmit={(e)=> {
                                    e.preventDefault()
                                    addPost(e.target)
                            }}>
                                <div className="col-md-12 d-flex align-items-center">   
                                    <div className="home__feed__createPost__image mb-2">
                                        <img className="home__image" src="https://source.unsplash.com/random" alt="User Profile"/>
                                    </div>
                                    <div className="home__feed__createPost__input mb-2">
                                        <input className="w-100" type="text" name="text" placeholder="Write something here" onChange={(e) => setPostText(e.target.value)}/>
                                    </div>
                                </div>
                                { renderImage(image) }
                                <div className="d-flex align-items-center mt-1">
                                    <div className={classes.root}>
                                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" multiple onChange={postImagePreview} name="images"/>
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
                                        <IconButton type="submit" className="home__feed__createPost__button" disabled={!postText}>
                                            <span>{postBtnText}</span>
                                        </IconButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {
                            posts.length > 0 ? (
                                posts.map(post => {
                                    return (    
                                        <Post
                                            key={post._id}
                                            id={post._id}
                                            postedBy={post.postedBy._id}
                                            name={post.postedBy.name}
                                            username={post.postedBy.username}
                                            text={post.text}
                                            images={post.images}
                                            likes={post.likes}
                                            comments={post.comments}
                                            editPostModal={editPostModal}
                                            posts={posts}
                                            setPosts={setPosts}
                                            getPosts={getPosts}
                                        />
                                    )
                                })
                            ) : (
                                <div className="row box-style text-center mt-3 pt-3">
                                    <h4 className="content__title ml-auto mr-auto">Loading ..</h4>
                                </div>
                            )   
                            
                        }
        
                    </div>

                    <Sidebar/>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
                <DialogContent>
                <form className="home__post__comment__form">
                    <input type="text" className="home__post__comment__input" value={postText} placeholder="Add a comment" onChange={(e) => setPostText(e.target.value)}/>
                    <IconButton>
                        <InsertEmoticonIcon />
                    </IconButton>
                </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={updatePost} disabled={!postText} type="button">
                    Update
                </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    )
}

export default Home
