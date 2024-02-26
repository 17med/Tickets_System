import Profile from "./Profile.tsx";
import {List, ListItem, ListItemIcon, ListItemText, N} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LogoutIcon from "@mui/icons-material/Logout";

import styled from "styled-components";
import {Navigate, NavLink} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

const drawerWidth = 240;
const DrawerPaper = styled.div`
    width: ${drawerWidth}px;
    background-color: #333;
    color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const NavItem = styled(ListItem)`
    color: #fff;
    &:hover {
        background-color: #1565c0;
    }
`;

const NavIcon = styled(ListItemIcon)`
    color: #ffffff;
`;

//@ts-ignore
export default function Navbar(props:any){
    const [logout, setLogout] = useState(false);

    const actLogout = async () => {
        await axios.get("http://localhost/api/user/logout", { withCredentials: true });

        props.refrechpage();
    }

    return (<>
        {props.hidden===false?

        <DrawerPaper>
            <Profile name={props.name} />
            <List>

                <NavItem button style={{ marginTop: '10px' }} onClick={()=>{
                    props.nav("/dashboard")
                }}>


                    <NavIcon>
                        <InboxIcon  style={{ color: '#fff' }} />
                    </NavIcon>

                    <ListItemText style={{color:"white",
                    textDecoration:"none"}} primary="Home" />

                </NavItem>
                <NavItem button onClick={()=>{
                    props.nav("/dashboard/project")
                }}>

                    <NavIcon>
                        <BusinessIcon style={{ color: '#fff' }} />
                    </NavIcon>

                    <ListItemText style={{color:"white",textDecoration:"none"}} primary="Project" />

                </NavItem>

                {props.admin===true?
                <NavItem button onClick={()=>{
                    props.nav("/dashboard/users")
                }}>
                    <NavIcon>
                        <GroupIcon style={{ color: '#fff' }} />
                    </NavIcon>
                    <ListItemText primary="Users" />
                </NavItem>
                :<></>}
                    <NavItem button onClick={()=>{
                        props.nav("/dashboard/tickets")
                    }}>
                    <NavIcon>
                        <ConfirmationNumberIcon style={{ color: '#fff' }} />
                    </NavIcon>
                    <ListItemText primary="Tickets" />
                </NavItem>
                <NavItem button onClick={actLogout}>
                    <NavIcon>
                        <LogoutIcon style={{ color: '#fff' }} />
                    </NavIcon>
                    <ListItemText primary="Log out" />
                </NavItem>

            </List>
        </DrawerPaper>:<></>}
    </>)
}