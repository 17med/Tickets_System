// @ts-nocheck
import Profile from "./Profile.tsx";
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LogoutIcon from "@mui/icons-material/Logout";
import {Button} from "@/components/ui/button";
import styled from "styled-components";
import {Home, Users,Building2,Ticket} from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {ExitIcon} from "@radix-ui/react-icons";

const drawerWidth = 240;
const DrawerPaper = styled.div`
    width: ${drawerWidth}px;
    background-color: #111827;
    color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const NavItem = styled(ListItem)`
    color: #fff;

    &:hover {
        background-color: #000000;
    }
`;

const NavIcon = styled(ListItemIcon)`
    color: #ffffff;
`;

//@ts-ignore
export default function Navbar(props:any){
    const [logout, setLogout] = useState(false);
    console.log(props.isadmin)
    const actLogout = async () => {
        await axios.get("/api/user/logout", { withCredentials: true });

        props.refrechpage();
    }

    return (
        <>
        {props.hidden===false?

            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] z-0">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Profile name={props.name} isAdmin={props.isAdmin}/>
                        </div>
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <NavLink
                                to={"/dashboard"}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Home className="h-4 w-4"/>
                                Dashboard
                            </NavLink>

                            {props.isadmin == true ?
                                <NavLink
                                    to={"/dashboard/users"}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <Users className="h-4 w-4"/>
                                    Users
                                </NavLink>
                                : <></>}
                            <NavLink
                                to={"/dashboard/project"}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Building2 className="h-4 w-4"/>
                                Projects
                            </NavLink>
                            <NavLink
                                to={"/dashboard/tickets"}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Ticket className="h-4 w-4"/>
                                Tickets
                            </NavLink>

                        </nav>


                    </div>
                    <div className="align-bottom my-auto -mt-12 ml-9">
                        <Button onClick={actLogout} className={"w-5/6"}><ExitIcon className="mr-2 h-4 w-4" />logout</Button>

                    </div>
                </div>

            </div> : <><></>
            </>}
        </>)

};

