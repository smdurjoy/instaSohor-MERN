import React, { useState } from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import SendIcon from '@material-ui/icons/Send';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
    
function Post(props) {
    const [open, setOpen] = useState(false);
    const [commentText, setCommentText] = useState(false);
    const [postId, setPostId] = useState(false);
    const [commentId, setCommentId] = useState(false);

    const editModalOpen = (postId, commentId, text) => {
        setOpen(true);
        setCommentText(text)
        setPostId(postId)
        setCommentId(commentId)
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div className="row box-style mt-3" key={props.id}>
            <div className="col-md-12 d-flex align-items-center mt-2">
                <div>
                    <img className="home__image" src="https://source.unsplash.com/random" alt={props.name}/>
                </div>
                <div className="ml-3">
                    <div>
                        <h4 className="content__title">{props.name}</h4>
                    </div>
                    
                    <div>
                        <span className="content__time">Just Now</span>
                    </div>
                </div>
                <div className="ml-auto home__feed__posts__action">
                    {
                        props.postedBy.includes(localStorage.getItem('user')) ? (
                            <UncontrolledButtonDropdown className="home__post__action__dropdown">
                                <DropdownToggle nav>
                                    <ExpandMoreIcon/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => props.editPostModal(props.id, props.text)}>Edit</DropdownItem>
                                    <DropdownItem onClick={() => props.confirmDeletePost(props.id)}>Delete</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>

            <div className="col-md-12 mt-3">
                <p className="home__feed__posts__text">
                    {props.text}
                </p>
            </div>

            <div className="col-md-12 home__feed__posts__images">
                {
                    props.images.length > 0 ? (
                        props.renderMultiplePostImages(props.images)
                    ) : (
                        <img className="home__feed__posts__image" src={props.images} alt={props.images}/>
                    )
                }
            </div>

            <div className="col-md-12 d-flex mt-3 mb-2">
                <div>
                    {
                        props.likes && props.likes.includes(localStorage.getItem('user')) ? (
                            <IconButton className="home__button__background ml-3" onClick={() => props.unlikePost(props.id)} title="Dislike Post">
                                <ThumbDownAltOutlinedIcon className="home__like__btn__icon"/>
                            </IconButton>
                        ) : (
                            <IconButton className="home__button__background ml-3" onClick={() => props.likePost(props.id)} title="Like Post">
                                <ThumbUpAltOutlinedIcon className="home__like__btn__icon"/>
                            </IconButton>
                        )
                    } 
                </div> 
                <div>
                    <IconButton className="home__button__background ml-2">
                        {
                            props.likes ? (
                                <span>{props.likes.length} Likes</span>
                            ) : (
                                <span>0 Likes</span>
                            )
                        }
                        
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
            
            { props.comments.length > 0 ? (
                props.comments.map(comment => {
                    return (
                        <div className="col-md-12 d-flex mt-4" key={comment._id}>
                            <img className="home__comment__image" src="https://source.unsplash.com/random" alt={comment.commentedBy.name}/>
                            <div className="ml-3">
                                <h4 className="content__title">{comment.commentedBy.name}</h4>
                                <h4 id="post__comment" className="home__feed__posts__text">{comment.text}</h4>
                                <div className="d-flex">
                                    <IconButton className="home__button__background">   
                                        <ThumbUpAltOutlinedIcon className="home__like__btn__icon"/> 
                                    </IconButton>
                                    <IconButton className="home__button__background ml-2">
                                        <span>0 Likes</span>
                                    </IconButton>
                                </div>
                            </div>
                            {
                                comment.commentedBy._id.includes(localStorage.getItem('user')) ? (
                                    <UncontrolledButtonDropdown className="home__comment__dropdown">
                                        <DropdownToggle nav>
                                            <ExpandMoreIcon/>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => editModalOpen(props.id, comment._id, comment.text)}>Edit</DropdownItem>
                                            <DropdownItem onClick={() => props.confirmDeleteComment(props.id, comment._id, comment.text)}>Delete</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                ) : (
                                    <></>
                                )
                            }

                        </div>
                    )
                })
            ) : (
                <></>
            ) }
            <div className="col-md-12 mt-4 mb-2">
                <form className="home__post__comment__form" onSubmit={(e) => {
                    e.preventDefault()
                    props.makeComment(props.comment, props.id, e.target)    
                }}>
                    <input type="text" className="home__post__comment__input" placeholder="Add a comment" onChange={(e) => props.setComment(e.target.value)}/>
                    <IconButton >
                        <InsertEmoticonIcon />
                    </IconButton>
                    <IconButton disabled={!props.comment} type="submit" variant="contained" color="primary" className="home__post__comment__button">
                        <SendIcon/>
                    </IconButton>
                </form>
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Comment</DialogTitle>
                <DialogContent>
                <form className="home__post__comment__form">
                    <input type="text" className="home__post__comment__input" value={commentText} placeholder="Add a comment" onChange={(e) => setCommentText(e.target.value)}/>
                    <IconButton>
                        <InsertEmoticonIcon />
                    </IconButton>
                </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => props.updateComment(postId, commentId)} color="primary" disabled={!commentText}> 
                    Update
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Post
