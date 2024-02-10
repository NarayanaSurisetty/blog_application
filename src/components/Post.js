import React, { useState, useRef } from "react";
import "./Post.css";
import LoadingBar from 'react-top-loading-bar';
import Comments from "./Comments";
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CommentIcon from '@mui/icons-material/Comment';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Post = ({ post: { title, description, name, id } }) => {
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [expanded, setExpanded] = useState('');


    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&::before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    // const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    //     padding: theme.spacing(2),
    //     borderTop: '1px solid rgba(0, 0, 0, .125)',
    // }));

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <LoadingBar color="#08518b" height={2.5} ref={ref} />
            <div className="post-container">
                <h3 className="heading">{title}</h3>
                <p>{description}</p>
                <div className="info mt-2">
                    <h6>Written by: {name}</h6>
                </div>
                {/* <div variant="light" className="comments-cursor" onClick={openDrawer}>
                    <i className="bi bi-chat-dots"></i> Comments
                </div> */}
                <Accordion expanded={expanded} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                        <>Comments</>
                    </AccordionSummary>
                    <AccordionDetails>
                        {expanded.length > 0 && <Comments show={show} modalClose={handleClose} id={id} title={title} />}
                    </AccordionDetails>
                </Accordion>
                {/* } */}
            </div>
        </>
    );
};

export default Post;