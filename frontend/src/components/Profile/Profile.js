import React from 'react'
import Layout from '../../layouts/fulllayout'
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
import Avatar from '@material-ui/core/Avatar';
import Content from './Content'

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

const Profile = (props) => {
  const classes = useStyles();

    return (
      <Layout title="Profile">
        <div className="container">
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
                <h4 className="title mt-2">Saqlain Mustaq Durjoy</h4>
              </div>
              <div className="profile_counts">  
                <div>
                  <h5>Posts</h5>
                  <p>100</p>
                </div>
                <div>
                  <h5>Followers</h5>
                  <p>20</p>
                </div>
                <div>
                  <h5>Following</h5>
                  <p>12</p>
                </div>
              </div>
            </div>
          </div>
          <Content/>
        </div>
      </Layout>
    );
  };

export default Profile
