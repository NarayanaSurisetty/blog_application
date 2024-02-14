import React from "react";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const options = ["Edit", "Delete"];

const MenuList = (props) => {
    const open = Boolean(props.anchorEl);

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={(e) => props.handleClick(e, props.page == "post" ? null : props.comment)}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={props.anchorEl}
                open={open}
                onClose={() => props.setAnchorEl(null)}
                key={(props.page == "post") ? props.id : props.comment.id}
            >
                {options.map((option) => (
                    <MenuItem key={option}
                        onClick={() => props.closeMenu(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default MenuList;