import React  from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PublishIcon from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) =>
    ({
        grow: {
            flexGrow: 1,
            textAlign: 'right',
        },
        sectionDesktop: {
            float: 'right',
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }),
);

function NavBarMenu(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const user = useSelector(state => state.user);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const logoutHandler = () => {
        axios.get('api/user/logout').then(response => {
        console.log(response)
        if (response.status === 200) {
            props.history.push("/signin");
            localStorage.removeItem('userId');
        } else {
            alert('Log Out Failed')
        }
        });
    };


    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={logoutHandler}>로그아웃</MenuItem>
        </Menu>
    );


    if (user.userData && !user.userData.isAuth) {
        return (
            <div className={classes.grow}>

                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="primary"
                    component={Link} to="/signin" 
                >
                    <AccountCircle /> <span style={{ fontSize: '1rem'}}>로그인</span>
                </IconButton>
            </div>
        )
    } else {
        return (
            <div className={classes.grow}>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.menuButton}
                    component={Link} to="/upload" 
                >
                    <PublishIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    className={classes.menuButton}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                {renderMenu}
        </div>
        )
    }

    // <div className={classes.sectionMobile}>
    //             <IconButton
    //                 edge="end"
    //                 aria-label="account of current user"
    //                 aria-controls={menuId}
    //                 aria-haspopup="true"
    //                 color="inherit"
    //             >
    //                 <SearchIcon />
    //             </IconButton>
    //             <IconButton
    //                 edge="end"
    //                 aria-label="account of current user"
    //                 aria-controls={menuId}
    //                 aria-haspopup="true"
    //                 onClick={handleProfileMenuOpen}
    //                 color="inherit"
    //             >
    //                 <AccountCircle />
    //             </IconButton>

    //         </div>
}

export default withRouter(NavBarMenu)