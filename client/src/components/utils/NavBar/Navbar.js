import React from 'react';

import Logo from './Sections/Logo'
import Search from './Sections/SearchBar'
import NavBarMenu from './Sections/NavBarMenu'

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
    ({
        root: {
            display: 'flex',
        },
        grow: {
            flexGrow: 1,
        },
        appbar: {
            boxShadow: 'none',
            backgroundColor: '#fff',
            color: '#000',
            zIndex: theme.zIndex.drawer + 1,
        },
        toolbar: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
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
    }),
);

export default function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <Logo />
                    <Search />
                    <NavBarMenu />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
            </Drawer>
        </div>
    );
}