import React, { useContext } from 'react'
import './Profile.css'
import IconButton from '@material-ui/core/IconButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import profileCover from '../../assets/images/profile-cover.jpg'
import profilePic from '../../assets/images/profile_image_dummy.svg'
import fb from '../../assets/images/social/fb.png'
import insta from '../../assets/images/social/insta.png'
import linkedin from '../../assets/images/social/in.png'
import twitter from '../../assets/images/social/twitter.png'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import url from '../../BackendUrl'
import UserContext from '../../context/UserContext'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    marginTop: -135,    
  },
}));

const ProfileTop = ({userprofile, user, setUser}) => {
  const classes = useStyles();
  const { setUserData } = useContext(UserContext);

  const followUser = async (followId) => {
    try {
        await axios.put(`${url}/users/follow`, {followId}, {
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(response => {
            // setUser((prevState)=> {
            //   return {
            //     followers:[...prevState.followers, response.data._id]
            //   }
            // })
            setUser(response.data)
            setUserData((prevState) => {
              return {
                ...prevState,
                user:{
                  ...prevState.user,
                  following:[...prevState.user.following, response.data._id]
                }
              }
            })
        })

    } catch(err) {
        alert(err.message)
    }
  }

  const unfollowUser = async (unfollowId) => {
    try {
        await axios.put(`${url}/users/unfollow`, {unfollowId}, {
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(response => {
            setUser(response.data)
            setUserData((prevState) => {
              const newFollowing= prevState.user.following.filter(item=> item !== response.data._id)
              return {
                ...prevState,
                user:{
                  ...prevState.user,
                  following:newFollowing
                }
              }
            })
        })

    } catch(err) {
        alert(err.message)
    }
  }

    return (
        <div className="cover_container">
            <div>
                <img className="cover_image" src={profileCover} alt="Sweet Music" />  
                <div className="cover_button_box d-flex justify-content-end">
                <div className="cover_button_group">
                    <IconButton aria-label="edit cover photo" component="span" className="cover_button" title="Update Profile Cover">
                        <EditOutlinedIcon className="icon" />
                    </IconButton>
                    <IconButton aria-label="setting" component="span" className="cover_button" title="Setting">
                        <SettingsOutlinedIcon className="icon" />
                    </IconButton>
                </div>
                </div>
            </div>
            <div className="cover_info box-style">
                <div>
                <div className="profile_social_links">
                    <IconButton aria-label="edit cover photo" component="span" className="social_link_btn" title="Facebook">
                    <Avatar alt="Facebook" src={fb} className={classes.small}/>
                    </IconButton>
                    <IconButton aria-label="edit cover photo" component="span" className="social_link_btn" title="Twitter">
                    <Avatar alt="Twitter" src={twitter} className={classes.small}/>
                    </IconButton>
                    <IconButton aria-label="edit cover photo" component="span" className="social_link_btn" title="Instagram">
                    <Avatar alt="Instagram" src={insta} className={classes.small}/>
                    </IconButton>
                    <IconButton aria-label="edit cover photo" component="span" className="social_link_btn" title="Linkedin">
                    <Avatar alt="Linkedin" src={linkedin} className={classes.small}/>
                    </IconButton>        
                </div>
                </div>  
                <div className="profile_picture"> 
                <Avatar alt="Remy Sharp" src={profilePic} className={classes.large}/>
                <h4 className="title mt-2">{ user.name }</h4>

                
                  { !userprofile
                    ? <></>
                    : [
                        user.followers && user.followers.includes(localStorage.getItem('user')) ? (
                          <div>
                            <Button className="button__background" onClick={() => unfollowUser(user._id)}>
                              Unfollow
                            </Button>
                            <Button className="button__background ml-2">
                              Message
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Button className="button__background" onClick={() => followUser(user._id)}>
                              Follow
                            </Button>
                            <Button className="button__background ml-2">
                              Message
                            </Button>
                          </div>
                        )
                      ]
                  }
            
                </div>
                <div className="profile_counts">  
                <div>
                    <h5>Posts</h5>
                    <p>0</p>
                </div>
                <div>
                    <h5>Followers</h5>
                    <p>
                      {
                        user.followers ? (
                          user.followers.length
                        ) : (
                          <span>0</span>
                        )
                      }
                    </p>
                </div>
                <div>
                    <h5>Following</h5>
                    <p>
                      {
                        user.following ? (
                          user.following.length
                        ) : (
                          <span>0</span>
                        )
                      }
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
  };

export default ProfileTop
