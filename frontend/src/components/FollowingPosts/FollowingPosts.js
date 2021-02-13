import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/fulllayout';
import { Divider } from '@material-ui/core';
import axios from 'axios'
import url from '../../BackendUrl'
import Post from '../Home/Post'
import Button from '@material-ui/core/Button'
import nolanImage from '../../assets/images/users/nolan.jpg'
import messiImage from '../../assets/images/users/messi.png'
import mark from '../../assets/images/users/mark.jfif'

const FollowingPosts = () => {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        const getPosts = async () => {
            await axios.get(`${url}/posts/following-posts`, {
                headers: {
                    'x-auth-token' : localStorage.getItem('x-auth-token')
                }
            }).then(res => {
                setPosts(res.data)
            })
        }
        getPosts()
    }, [])

    return (
        <Layout title="Following Posts">
            <h4 className="followingPostTitle">Following Posts</h4>
            <div className="container d-flex justify-content-between">
                <div className="timeline_feed">
                    { !posts === []
                        ? <>{posts.msg}</>
                        : [
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
                                            posts={posts}
                                            setPosts={setPosts} 
                                        />
                                    )
                                })
                            ) : (
                                <div className="row box-style text-center mt-3 pt-3" key="1">
                                    <h4 className="content__title ml-auto mr-auto">Loading ..</h4>
                                </div>
                            )
                        ]
                    }
                </div>
                <div className="home__sidebar mt-3">
                    <div className="box-style">
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <p className="sidebar_title ml-3">Popular Contacts</p>
                        </div>
                        <div className="col-md-12">
                        <Divider/>
                        </div>
                        <div className="d-flex mt-3 ml-3 align-items-center">
                            <div>
                                <img className="home__image" src={messiImage} alt="Birthday"/>
                            </div>
                            <div className="ml-3">
                                <h4 className="content__title">Leo Messi</h4>
                                <Button className="button__background">
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div className="d-flex mt-3 ml-3 align-items-center mb-3">
                            <div>
                                <img className="home__image" src={nolanImage} alt="Birthday"/>
                            </div>
                            <div className="ml-3">
                                <h4 className="content__title">Christopher Nolan</h4>
                                <Button className="button__background">
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div className="d-flex mt-3 ml-3 align-items-center mb-3">
                            <div>
                                <img className="home__image" src={mark} alt="Birthday"/>
                            </div>
                            <div className="ml-3">
                                <h4 className="content__title">Mark Zuckerberg</h4>
                                <Button className="button__background">
                                    Follow
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="box-style mt-3">
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <p className="sidebar_title ml-3">People Near You</p>
                        </div>
                        <div className="col-md-12">
                        <Divider/>
                        </div>
                        <div className="d-flex mt-3 ml-3 align-items-center">
                            <div>
                                <img className="home__image" src="https://source.unsplash.com/random" alt="Birthday"/>
                            </div>
                            <div className="ml-3">
                                <h4 className="content__title">Jack Shepherd</h4>
                                <Button className="button__background">
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div className="d-flex mt-3 ml-3 align-items-center mb-3">
                            <div>
                                <img className="home__image" src="https://source.unsplash.com/random" alt="Birthday"/>
                            </div>
                            <div className="ml-3">
                                <h4 className="content__title">Hanna Baker</h4>
                                <Button className="button__background">
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div className="d-flex mt-3 ml-3 align-items-center mb-3">
                            <div>
                                <img className="home__image" src="https://source.unsplash.com/random" alt="Birthday"/>
                            </div>
                            <div className="ml-3">
                                <h4 className="content__title">Anna Sthesia</h4>
                                <Button className="button__background">
                                    Follow
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
 
export default FollowingPosts;