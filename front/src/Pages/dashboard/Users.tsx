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
export default function Users(){
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
        <LinearProgress size={40}
                                       thickness={4} style={{marginTop:"-30px",marginLeft:"-55px",width:"105%"}} sx={{
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: '#333333',
            height:"10px"
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#6c6c6c'
        },


    }}  /> </>:<>
        <AddUser setrefrech={()=>{setrefrech(!refrech)}} open={open} setopen={setOpen}/>
        <br/>
        <table style={{width:"100%",marginLeft:"10px"}}>
            <tr>
                <td style={{width:"95%"}}>
                    <Input placeholder={"Name or Id"} label="username" fullWidth={true}/>
                </td>
                <td>
                    <IconButton size="large"  aria-label="Example" onClick={()=>{setOpen(true)}}>
                        <AddIcon/>
                    </IconButton>
                </td>
             </tr>
            </table>
            <br/>

        <UsersList  data={data}/></>}</div>)
}