import React, { useContext } from 'react';
import {
    Navbar,
    NavbarBrand,
    Collapse,
    DropdownItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import brandLogo from '../../assets/images/brang-logo.png';
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import DehazeIcon from '@material-ui/icons/Dehaze';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Header.css'
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';

const Header = () => {
    /*--------------------------------------------------------------------------------*/
    /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
    /*--------------------------------------------------------------------------------*/
    const showMobilemenu = () => {
        document.getElementById('main-wrapper').classList.toggle('show-sidebar');
    }

    const history = useHistory()
    const { userData, setUserData } = useContext(UserContext)

    const onLogout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('x-auth-token', '')
        localStorage.setItem('user', '')
        history.push('/signin')
    }

    return (
        <header className="topbar navbarbg" data-navbarbg="skin1">
            <Navbar className="top-navbar" dark expand="md">
                <div className="navbar-header" id="logobg" data-logobg="skin6">
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
                    {/*--------------------------------------------------------------------------------*/}
                    <NavbarBrand href="/">
                        <b className="logo-icon">
                            <img style={{width:"30px"}} src={brandLogo} alt="homepage" className="dark-logo" />
                            <img
                                src={brandLogo}
                                alt="homepage"
                                className="light-logo"
                            />
                        </b>
                        <span className="logo-text brandLogoText" style={{color:"#363535", fontWeight:"900"}}>
                         instaSohor
                        </span>
                    </NavbarBrand>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <button className="btn-link nav-toggler d-block d-md-none" onClick={() => showMobilemenu()}>
                        <DehazeIcon/>
                    </button>
                </div>
            
                <Collapse className="navbarbg" navbar data-navbarbg="skin1" >
                    <div className="header__search ml-auto">
                        <input type="text" className="header__search__input" placeholder="Type here to search"/>
                    </div>
                    <div className="header__icons ml-auto d-flex align-items-center">
                        <div className="d-flex align-items-center header__profile__link" onClick={() => history.push('/profile')}>
                            <img src="https://source.unsplash.com/random" alt="Profile"/>
                            <h4>{ userData.user.name.split(" ")[0] }</h4>
                        </div>
                        <IconButton className="header__icon ml-2">
                            <NotificationsNoneIcon className="icon"/>
                        </IconButton>
                        <IconButton className="header__icon">
                            <DraftsOutlinedIcon className="icon"/>
                        </IconButton>
                        <IconButton className="header__icon">
                            <RecordVoiceOverOutlinedIcon className="icon"/>
                        </IconButton>
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret className="pro-pic">
                                <ExpandMoreIcon/>
                            </DropdownToggle>
                            <DropdownMenu right className="user-dd">
                                <DropdownItem divider />
                                <DropdownItem>
                                    <i className="ti-settings mr-1 ml-1" /> Settings
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <i className="fa fa-power-off mr-1 ml-1" /> Profile
                                </DropdownItem>
                                <DropdownItem divider />
                                <Button
                                    className="ml-3 mb-2 mt-2 header__logout__btn"
                                    onClick={onLogout}
                                >
                                    Logout
                                </Button>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </Collapse>
            </Navbar>
        </header>
    );
}
export default Header;
