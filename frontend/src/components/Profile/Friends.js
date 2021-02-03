import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

export default function Friends() {
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
        <Tab label="Followers" {...a11yProps(0)} />
        <Tab label="Following" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
      <div className="friends">
          <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Martha Nielson</h4>
                    <div className="d-flex">
                      <p className="aboutDes">29 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Ulric Nielson</h4>
                    <div className="d-flex">
                      <p className="aboutDes">29 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <div className="friends mt-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Jon Snow</h4>
                    <div className="d-flex">
                      <p className="aboutDes">32 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Arya Strak</h4>
                    <div className="d-flex">
                      <p className="aboutDes">25 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <div className="friends mt-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Sansa Strak</h4>
                    <div className="d-flex">
                      <p className="aboutDes">11 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Jack Shephard</h4>
                    <div className="d-flex">
                      <p className="aboutDes">43 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="friends">
          <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Ragner Lothbroke</h4>
                    <div className="d-flex">
                      <p className="aboutDes">29 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Hanny Baker</h4>
                    <div className="d-flex">
                      <p className="aboutDes">29 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <div className="friends mt-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Jonas Kahnwald</h4>
                    <div className="d-flex">
                      <p className="aboutDes">32 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">James Sawyer</h4>
                    <div className="d-flex">
                      <p className="aboutDes">25 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <div className="friends mt-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Katness Evadin</h4>
                    <div className="d-flex">
                      <p className="aboutDes">11 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img className="friends_image" src="https://source.unsplash.com/random" alt="friends"/>
                <div>
                    <h4 className="sidebar_title">Ramsay Bolton</h4>
                    <div className="d-flex">
                      <p className="aboutDes">43 friends</p>
                      <UncontrolledButtonDropdown className="friends_action">
                          <DropdownToggle nav>
                              <ExpandMoreIcon/>
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem>Unfollow</DropdownItem>
                              <DropdownItem>Block</DropdownItem>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </TabPanel>
    </div>
  );
}