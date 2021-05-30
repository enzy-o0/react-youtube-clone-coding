import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { BookFilled, HomeFilled, LikeFilled } from '@ant-design/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
    ({
        grow: {
            flexGrow: 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            display: 'none',
            backgroundColor: 'transparent',
            [theme.breakpoints.up('md')]: {
            display: 'block',
            },
        },
        drawerPaper: {
            width: drawerWidth,
            display: 'none',
            [theme.breakpoints.up('md')]: {
            display: 'block',
            },
        },
        drawerContainer: {
            overflow: 'auto',
            display: 'none',
            [theme.breakpoints.up('md')]: {
            display: 'block',
            },
        },
        bottomAppBar: {
            top: 'auto',
            bottom: 0,
            display: 'flex',
            [theme.breakpoints.up('md')]: {
            display: 'none',
            },
        },
        toolbarFlex :{ 
            display: 'flex',   
            justifyContent: 'space-around'
        }
    }),
);

export default function DrawerMenu() {
    const classes = useStyles();

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <AppBar position="fixed" color="inherit" className={classes.bottomAppBar}>
            <Toolbar className={classes.toolbarFlex}>
                <IconButton edge="start" color="inherit" aria-label="open drawer"  component={Link} to="/" >
                    <LikeFilled />
                </IconButton>
                <IconButton color="inherit" component={Link} to="/subScribe">
                    <BookFilled />
                </IconButton>
                <IconButton edge="end" color="inherit" component={Link} to="/youtube">
                    <HomeFilled />
                </IconButton>
            </Toolbar>
        </AppBar>
    );

    const [MenuState, setMenuState] = useState(0)

    const handleListItemClick = (event, index) => {
        setMenuState(index);
    };

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                <List>
                    <ListItem button 
                                component={Link} to="/"
                                selected={MenuState === 0}
                                onClick={(event) => handleListItemClick(event, 0)}>
                            <ListItemIcon><LikeFilled /></ListItemIcon>
                            <ListItemText primary="내가 올린 영상" />
                    </ListItem>
                    <ListItem button 
                                component={Link} to="/subScribe"
                                selected={MenuState === 1}
                                onClick={(event) => handleListItemClick(event, 1)}>
                            <ListItemIcon><BookFilled /></ListItemIcon>
                            <ListItemText primary="구독" />
                    </ListItem>
                    <ListItem button 
                            component={Link} to="/youtube" 
                            selected={MenuState === 2}
                            onClick={(event) => handleListItemClick(event, 2)}>
                        <ListItemIcon><HomeFilled /></ListItemIcon>
                        <ListItemText primary="유투브 영상" />
                    </ListItem>
                </List>
                </div>
            </Drawer>
            {renderMobileMenu}
        </>

    )
}
