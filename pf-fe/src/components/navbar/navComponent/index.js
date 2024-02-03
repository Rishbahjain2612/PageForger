import React from 'react';
import {
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

function NavComponent({ text, iconTag: Icon, linkPath }) {
    return (
        <Link to={linkPath}>
            <ListItem>
                <ListItemPrefix>
                    <Icon className="h-5 w-5" />
                </ListItemPrefix>
                {text}
            </ListItem>
        </Link>
    )
}

export default NavComponent;
