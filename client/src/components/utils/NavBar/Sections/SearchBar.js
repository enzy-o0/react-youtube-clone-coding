import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) =>
    ({
        searchSection: {
            alignItems: 'center',
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('md')]: {
            display: 'flex',
            },
        },
        search: {
            alignItems: 'center',
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            borderBottom: '1px solid #c2c2c2',
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: theme.spacing(2),
            margin: '0 auto',
            flexGrow: 1,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            marginLeft: theme.spacing(1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',

        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
            width: '20ch',
            },
        },
    }),
);

function SearchBar(props) {
    const classes = useStyles();

    const [Keyword, setKeyword] = useState('')

    const onSubmit = (e, index) => {
        console.log(e.value);
        e.preventDefault();
    }

    const onSearchHandler = (e) => {
        setKeyword(e.currentTarget.value)
    }

    return (
            <form onSubmit={onSubmit} className={classes.searchSection}>
                <div className={classes.search}>
                    <InputBase
                        placeholder="유튜브 검색하기"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        value={Keyword}
                        onChange={onSearchHandler}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className={classes.searchIcon}>
                    <Link to={`/search/${Keyword}`}>
                        <SearchIcon />
                    </Link>
                </div>
            </form>
    )
}

export default withRouter(SearchBar)