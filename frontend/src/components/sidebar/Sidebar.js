import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Sidebar = (props) => {
    const expandLogo = () => {
        document.getElementById("logobg").classList.toggle("expand-logo");
    }

    return (
        <aside className="left-sidebar" id="sidebarbg" data-sidebarbg="skin6" onMouseEnter={expandLogo.bind(null)} onMouseLeave={expandLogo.bind(null)}>    
            <div className="scroll-sidebar">
                <PerfectScrollbar className="sidebar-nav">
                    <Nav id="sidebarnav">
                        <li className="sidebar-item">
                            <NavLink exact to="/" className="sidebar-link" activeStyle={{ color: '#111111' }} > 
                                <i className='fas fa-home' />
                                <span className="hide-menu">Home</span> 
                            </NavLink>
                            <NavLink to="/profile" className="sidebar-link" activeStyle={{ color: '#111111' }} >
                                <i class="fas fa-user-circle" />
                                <span className="hide-menu">Profile</span>
                            </NavLink>
                        </li>
                    </Nav>
                </PerfectScrollbar>
            </div>
        </aside>
    );
}
export default Sidebar;
