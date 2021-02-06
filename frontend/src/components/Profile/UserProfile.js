import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Layout from '../../layouts/fulllayout'
import ProfileTop from './ProfileTop';
import Content from './Content';
import url from '../../BackendUrl'

const UserProfile = () => {
    const [ user, setUser ] = useState('');
    const params = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
        
        const getUser = async (username) => {
            await axios.get(`${url}/users/${username}`, { headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }}).then((res) => {
                setUser(res.data)
            })
        }

        getUser(params.username)
    }, [params.username])

    return ( 
        <Layout title={ user.name }>
            <div className="container">
                <ProfileTop name={ user.name }/>
                <Content userprofile={true} username={params.username}/>
            </div>
        </Layout>
    );
}
 
export default UserProfile;