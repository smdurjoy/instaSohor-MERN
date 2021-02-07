import React, { useState, createContext } from 'react'
import url from '../BackendUrl'
import axios from 'axios';

export const PostContext = createContext()

export const PostProvider = (props) => {
    const [ posts, setPosts ] = useState([])

    const getAllPosts = async () => {
        await axios.get(`${url}/posts/all`, {
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(res => {
            setPosts(res.data)
        })
    }

    const getPosts = async () => {
        await axios.get(`${url}/posts/`, {
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(res => {
            setPosts(res.data)
        })
    }

    const getUserPosts = async (username) => {
        await axios.get(`${url}/posts/${username}`, { headers: {
            'x-auth-token' : localStorage.getItem('x-auth-token')
        }}).then((res) => {
            setPosts(res.data)
        })
    }

    const getFollowingPosts = async () => {
        await axios.get(`${url}/posts/following-posts`, {
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(res => {
            setPosts(res.data)
        })
    }

    return(
        <PostContext.Provider value={[posts, setPosts, getPosts, getUserPosts, getAllPosts, getFollowingPosts]}>
            {props.children}
        </PostContext.Provider>
    )
}