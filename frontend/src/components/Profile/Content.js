import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Timeline from './Timeline';
import About from './About';
import Friends from './Friends';
import Photos from './Photos';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FAFAFB",
    width: 1000,
  },
  tabBar: {
    backgroundColor: "#2AA3FB",
  },
  indicator: {
    backgroundColor: '#2AA3FB',
    color: '#2AA3FB',
  },
}));

export default function Content({ userprofile, username, setUser }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            indicator: classes.indicator,
          }}
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Timeline" {...a11yProps(0)} />
          <Tab label="About" {...a11yProps(1)} />
          <Tab label="Friends" {...a11yProps(2)} />
          <Tab label="Photos" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Timeline userprofile={userprofile} username={username} setUser={setUser}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <About/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Friends/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Photos/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}