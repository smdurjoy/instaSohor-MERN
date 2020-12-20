import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Nav, Button } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import BlurLinearOutlinedIcon from '@material-ui/icons/BlurLinearOutlined';
import UserContext from '../../context/UserContext'

const Sidebar = (props) => {
    const expandLogo = () => {
        document.getElementById("logobg").classList.toggle("expand-logo");
    }

    const history = useHistory()
    const { setUserData } = useContext(UserContext)

    const onLogout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('x-auth-token', '')
        history.push('/signin')
    }

    return (
        <aside className="left-sidebar" id="sidebarbg" data-sidebarbg="skin6" onMouseEnter={expandLogo.bind(null)} onMouseLeave={expandLogo.bind(null)}>    
            <div className="scroll-sidebar">
                <PerfectScrollbar className="sidebar-nav">
                    <Nav id="sidebarnav">
                        <li className="sidebar-item mt-2">
                            <NavLink exact to="/" className="sidebar-link" activeStyle={{ color: '#111111' }} > 
                                <HomeOutlinedIcon className="mr-1"/>
                                <span className="hide-menu"> Home</span> 
                            </NavLink>
                            <NavLink to="/profile" className="sidebar-link" activeStyle={{ color: '#111111' }} >
                                <AccountCircleOutlinedIcon className="mr-1"/>
                                <span className="hide-menu">Profile</span>
                            </NavLink>
                            <NavLink to="/following-posts" className="sidebar-link" activeStyle={{ color: '#111111' }} >
                                <BlurLinearOutlinedIcon className="mr-1"/>
                                <span className="hide-menu">Following Posts</span>
                            </NavLink>
                            <NavLink to="/messages" className="sidebar-link" activeStyle={{ color: '#111111' }} >
                                <ChatOutlinedIcon className="mr-1"/>
                                <span className="hide-menu">Messages</span>
                            </NavLink>
                        </li>
                    </Nav>
                    <Button
                        color="primary"
                        className="btn-rounded ml-3 mt-3 d-md-none d-lg-none d-xl-none"
                        onClick={onLogout}
                    >
                        Logout
                    </Button>  
                </PerfectScrollbar>
            </div>
        </aside>
    );
}
export default Sidebar;
