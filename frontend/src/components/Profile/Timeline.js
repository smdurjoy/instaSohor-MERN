import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import url from '../../BackendUrl'
import Swal from 'sweetalert2'
import Post from '../Home/Post';
import { Redirect } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';  
import { PostContext } from '../../context/PostContext'

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

export default function Timeline({userprofile, username}) {
    const [ postText, setPostText ] = useState('')
    const [ image, setImage ] = useState([]);
    const [ postBtnText, setPostBtnText ] = useState('Post')
    const [ open, setOpen ] = useState(false)
    const [ postId, setPostId ] = useState(false)
    const classes = useStyles();
    const [ posts, setPosts, getPosts, getUserPosts ] = useContext(PostContext)

    useEffect(() => {   
        if(userprofile) {
            getUserPosts(username)
        }else {
            getPosts()
        }
    }, [])


    const token = localStorage.getItem('x-auth-token');
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

    const confirmDeleteComment = (postId, commentId) => {
        Swal.fire({
            title: 'Are you sure ?',
            text: "You won't be able to revert this !",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: `Delete`,
          }).then((result) => {
            if(result.isConfirmed) {
                deleteComment(postId, commentId)
            }
        })
    }

    const confirmDeletePost = (postId) => {
        Swal.fire({
            title: 'Are you sure ?',
            text: "You won't be able to revert this !",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: `Delete`,
          }).then((result) => {
            if(result.isConfirmed) {
                deletePost(postId)
            }
        })
    }

    const deleteComment = async (postId, commentId) => {
        try {
            await axios.put(`${url}/posts/uncomment/${postId}`, { commentId }, {
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

    const renderMultiplePostImages = (src) => {
        const paths = src[0].split(",");
        return paths.map(path => {
            return <img className="home__feed__posts__image" src={url + '/' + path} key={path} alt={path}/>
        })
    }

    const deletePost = async (id) => {
        try {
            await axios.delete(`${url}/posts/${id}`, {
                headers: {
                    'x-auth-token' : localStorage.getItem('x-auth-token')
                }
            }).then(response => {
                if(response.status === 200) {
                    getPosts()
                    alert(response.data.msg)
                }
            })

        } catch(err) {
            alert(err.message)
        }
    }

    const updateComment = async (postId, commentId) => {
        try {
            await axios.put(`${url}/posts/comment/${postId}`, {commentId}, {
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
        <Fragment>
            <div className="container d-flex justify-content-between">
                <div className="home__sidebar">
                    <div className="box-style">
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <p className="sidebar_title ml-3">Life Event</p>
                            <p className="sidebar_link mr-3">Create</p>
                        </div>
                        <div className="col-md-12">
                        <Divider/>
                        </div>
                        <div className="mt-1 p-2">
                            <div>
                                <img className="sidebar_image" src="https://source.unsplash.com/random" alt="Event"/>
                            </div>
                            <div className="mt-2 text-center">
                                <h4 className="sidebar_box_title">Started New Job at Apple</h4>
                                <h4 className="sidebar_box_des">January 24, 2021</h4>
                            </div>
                        </div>
                    </div>

                    <div className="box-style mt-3">
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <p className="sidebar_title ml-3">Photos</p>
                            <p className="sidebar_link mr-3">Add Photo</p>
                        </div>
                        <div className="col-md-12">
                        <Divider/>
                        </div>
                        <div className="sidebar_photos mt-1">
                            <div className="sidebar_photo"><img src="https://source.unsplash.com/random" alt="Yoo"/></div>
                            <div className="sidebar_photo"><img src="https://source.unsplash.com/random" alt="Yoo"/></div>
                            <div className="sidebar_photo"><img src="https://source.unsplash.com/random" alt="Yoo"/></div>
                            <div className="sidebar_photo"><img src="https://source.unsplash.com/random" alt="Yoo"/></div>
                            <div className="sidebar_photo"><img src="https://source.unsplash.com/random" alt="Yoo"/></div>
                            <div className="sidebar_photo"><img src="https://source.unsplash.com/random" alt="Yoo"/></div>
                        </div>
                    </div>
                    <div className="box-style mt-3">
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <p className="sidebar_title ml-3">Friends</p>
                            <p className="sidebar_link mr-3">Add New</p>
                        </div>
                        <div className="col-md-12">
                        <Divider/>
                        </div>
                        <div className="sidebar_photos mt-1">
                            <div className="text-center"><img src="https://source.unsplash.com/random" alt="Yoo"/><span>Henry Fiyol</span></div>
                            <div className="text-center"><img src="https://source.unsplash.com/random" alt="Yoo"/><span>Henry Fiyol</span></div>
                            <div className="text-center"><img src="https://source.unsplash.com/random" alt="Yoo"/><span>Henry Fiyol</span></div>
                            <div className="text-center"><img src="https://source.unsplash.com/random" alt="Yoo"/><span>Henry Fiyol</span></div>
                            <div className="text-center"><img src="https://source.unsplash.com/random" alt="Yoo"/><span>Henry Fiyol</span></div>
                            <div className="text-center"><img src="https://source.unsplash.com/random" alt="Yoo"/><span>Henry Fiyol</span></div>
                        </div>
                    </div>
                </div>
                <div className="timeline_feed">
                    <div className="timeline_create_post row box-style">
                        <div className="col-md-12 mt-1">
                            <p className="sidebar_title">Create Post</p>
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
                                        text={post.text}
                                        images={post.images}
                                        likes={post.likes}
                                        comments={post.comments}
                                        posts={posts}
                                        setPosts={setPosts}
                                        confirmDeletePost={confirmDeletePost}
                                        confirmDeleteComment={confirmDeleteComment}
                                        likePost={likePost}
                                        unlikePost={unlikePost}
                                        renderMultiplePostImages={renderMultiplePostImages}
                                        updateComment={updateComment}
                                        editPostModal={editPostModal}
                                    />
                                )
                            })
                        ) : (
                            <div className="row box-style text-center mt-3 pt-3">
                                <h4 className="content__title ml-auto mr-auto">No Post Available</h4>
                            </div>
                        )
                    }
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
                <Button onClick={updatePost} disabled={!postText}> 
                    Update
                </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}