import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  indicator: {
    backgroundColor: '#2AA3FB',
    color: '#2AA3FB',
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        classes={{
            indicator: classes.indicator,
          }}
      >
        <Tab label="Contact and Basic info" {...a11yProps(0)} />
        <Tab label="Work and Education" {...a11yProps(1)} />
        <Tab label="Details" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div>
            <h4 className="sidebar_title mb-3">Contact Information</h4>
            <table>
              <tbody>
                <tr>
                    <td><p className="aboutTitle">Email:</p></td>
                    <td><p className="aboutDes">smdurjoy.cse@gmail.com</p></td>
                </tr>
                <tr>
                    <td><p className="aboutTitle">Mobile:</p></td>
                    <td><p className="aboutDes">+880 1784996428</p></td>
                </tr>
                <tr>
                    <td><p className="aboutTitle">Address:</p></td>
                    <td><p className="aboutDes">East Guptapara, Rangpur</p></td>
                </tr>
                </tbody>
            </table>

            <h4 className="sidebar_title mb-3">Basic Information</h4>
            <table className="mt-3">
              <tbody>
                <tr>
                    <td><p className="aboutTitle">Birthday:</p></td>
                    <td><p className="aboutDes">9 July</p></td>
                </tr>
                <tr>
                    <td><p className="aboutTitle">Gender:</p></td>
                    <td><p className="aboutDes">Male</p></td>
                </tr>
                <tr>
                    <td><p className="aboutTitle">Language</p></td>
                    <td><p className="aboutDes">Bangla & English</p></td>
                </tr>
              </tbody>
            </table>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
            <div className="d-flex justify-content-between align-items-center" style={{width: "700px"}}>
                <p className="sidebar_title mb-3">Work</p>
                <p className="sidebar_link mr-3">Edit</p>
            </div>
            <div className="d-flex mt-1 align-items-center">
                <div>
                    <img className="home__image" src="https://source.unsplash.com/random" alt="Birthday"/>
                </div>
                <div className="ml-3">
                    <h4 className="content__title">Theme forest</h4>
                    <h4 className="home__feed__posts__text">Web Designer</h4>
                </div>
            </div>
            <div className="d-flex mt-2 align-items-center">
                <div>
                    <img className="home__image" src="https://source.unsplash.com/random" alt="Birthday"/>
                </div>
                <div className="ml-3">
                    <h4 className="content__title">W3 school</h4>
                    <h4 className="home__feed__posts__text">Designer</h4>
                </div>
            </div>
        </div>

        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center" style={{width: "700px"}}>
                <p className="sidebar_title mb-3">Education</p>
                <p className="sidebar_link mr-3">Edit</p>
            </div>
            <div className="d-flex mt-1 align-items-center">
                <div>
                    <img className="home__image" src="https://source.unsplash.com/random" alt="Birthday"/>
                </div>
                <div className="ml-3">
                    <h4 className="content__title">Bangladesh University of Business and Technology - (BUBT)</h4>
                    <h4 className="home__feed__posts__text">Bsc in CSE</h4>
                </div>
            </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
            <div className="d-flex justify-content-between align-items-center" style={{width: "700px"}}>
                <p className="sidebar_title mb-3">About Me</p>
                <p className="sidebar_link mr-3">Edit</p>
            </div>
            <div>
                <p className="home__feed__posts__text">Hi, I’m Durjoy, I’m 22 and I work as a Software Developer for the Google Inc.</p>
            </div>
        </div>
        <div className="mt-4">  
            <div className="d-flex justify-content-between align-items-center" style={{width: "700px"}}>
                <p className="sidebar_title mb-3">Favorite Quotes</p>
                <p className="sidebar_link mr-3">Edit</p>
            </div>
            <div>
                <p className="home__feed__posts__text">What we know is a drop, what we don't know is a ocean.</p>
            </div>
        </div>
      </TabPanel>
    </div>
  );
}