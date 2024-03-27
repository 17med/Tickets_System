// @ts-nocheck
import ProjectList from "../../Elements/Projects/ProjectList.tsx"
import {IconButton, LinearProgress, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import AddProject from "../../Elements/Projects/AddProject.tsx";
import {Input} from "@/components/ui/input";

export default function Projects({isadmin}:any){
    console.log(window.location.href)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data,setdata]=useState([])
    const [refrech,setrefrech]=useState(false);
    useEffect(() => {
        async function getdata(){
            const x=await axios.get("/api/project/",{ withCredentials: true })
            setdata(x.data);

            setLoading(false);
        }
        getdata();
    }, [refrech]);
    return(<>
        {loading == true ? <LinearProgress size={40}
                                           thickness={4} style={{marginTop:"-30px",marginLeft:"-55px",width:"105%"}} sx={{
            [`&.${linearProgressClasses.colorPrimary}`]: {
                backgroundColor: '#333333',
                height:"10px"
            },
            [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: '#6c6c6c'
            },


        }}  /> :<>
            <AddProject setrefrech={()=>{setrefrech(!refrech)}} open={open} setopen={setOpen}/>
            <br/>
            <table style={{width:"100%",marginLeft:"10px"}}>
                <tr>
                    {isadmin ?<>
                            <td style={{width: "100%"}}>
                                <Input label="username" placeholder={"name or id"} fullWidth={true}/>
                            </td>
                            <td>
                                <IconButton size="large" aria-label="Example" onClick={()=>{setOpen(true)}}>
                                    <AddIcon/>
                                </IconButton>
                            </td></>
                        :<td style={{width:"100%"}}>
                            <Input label="username" style={{width:"97.5%"}}/>
                        </td>
                    }
                </tr>
            </table>
            <br/>

            <ProjectList  data={data}/></>}</>)
}