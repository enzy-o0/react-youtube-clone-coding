import React from 'react'

import Typography from '@material-ui/core/Typography';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    section: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    title: {
        marginLeft: theme.spacing(3),
        color: '#f50057'
    },
}));

export default function Logo() {
    const classes = useStyles();

    return (
        <div className={classes.section}>
                <a href="/">
                    <Typography className={classes.title} variant="h6" noWrap>
                            <VideoLibraryIcon />
                            AZTube
                    </Typography>
                </a>
        </div>
    )
}
