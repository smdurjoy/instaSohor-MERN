import React, { useContext, useEffect } from 'react'
import './Profile.css'
import UserContext from '../../context/UserContext'
import Layout from '../../layouts/fulllayout'
import ProfileTop from './ProfileTop';
import Content from './Content';

const Profile = (props) => {
  const { userData } = useContext(UserContext)

  useEffect(() => {
      window.scrollTo(0, 0)
  }, [])

    return (
      <Layout title={ userData.user.name }>
        <div className="container">
          <ProfileTop name={ userData.user.name }/>
          <Content />
        </div>
      </Layout>
    );
  };

export default Profile
