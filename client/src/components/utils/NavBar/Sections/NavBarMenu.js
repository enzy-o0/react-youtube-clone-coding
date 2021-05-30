import React  from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import { logoutUser } from "../../../../_actions/user_action";

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
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);


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

    const logoutHandler = async() => {

        const resultLogout = await dispatch(logoutUser());

        if (resultLogout.payload.success) {
            window.location.replace("/"); // 로그아웃시 새로고침. 히스토리 기록되지 않음.
            localStorage.removeItem('userId');
        } else {
            alert('로그아웃을 실패하였습니다.')
        }        
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
        console.log(user)

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
}

export default withRouter(NavBarMenu)