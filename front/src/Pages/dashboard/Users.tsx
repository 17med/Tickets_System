// @ts-nocheck
import UsersList from "../../Elements/Users/UsersList.tsx"
import {IconButton, LinearProgress, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import AddUser from "../../Elements/Users/AddUser.tsx";
import {Input} from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"
import {Label} from "@/components/ui/label.tsx";
import { useSpring, animated } from 'react-spring';
export default function Users(){
    const animationProps = useSpring({
        opacity: 1,
        from: { opacity: 0 }, // Initial state, opacity is 0
        config: { duration: 500 } // Animation duration
    });
    document.title= "Users";
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data,setdata]=useState([])
    const [refrech,setrefrech]=useState(false);
    useEffect(() => {
        async function getdata(){
        const x=await axios.get("/api/user/getall",{ withCredentials: true })
            setdata(x.data.data)
            setLoading(false);
        }
        getdata();
    }, [refrech]);
    return(<div className={"z-10"}>
    {loading == true ?<>
        </>: <>
    <animated.div style={animationProps}>
        <br/>

        <Label htmlFor="h1" className={"font-bold text-3xl ml-2"}>Users</Label>
        <br/>

        <AddUser setrefrech={() => {
            setrefrech(!refrech)
        }} open={open} setopen={setOpen}/>
        <br/>
        <table style={{width: "100%", marginLeft: "10px"}}>
            <tr>
                <td style={{width: "95%"}}>
                    <Input placeholder={"Name or Id"} label="username" fullWidth={true}/>
                </td>
                <td>
                    <IconButton size="large" aria-label="Example" onClick={() => {
                        setOpen(true)
                    }}>
                        <AddIcon/>
                    </IconButton>
                </td>
            </tr>
        </table>
        <br/>

        <UsersList setrefrech={() => {
            setrefrech(!refrech)
        }} data={data}/>
    </animated.div>
    </>}</div>)
}