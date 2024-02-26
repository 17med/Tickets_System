import UsersList from "../../Elements/Users/UsersList.tsx"
import {IconButton, LinearProgress, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";



export default function Users(){

    const [loading, setLoading] = useState(true);
    const [data,setdata]=useState([])
    useEffect(() => {
        async function getdata(){
        const x=await axios.get("http://localhost/api/user/getall",{ withCredentials: true })
            setdata(x.data.data)
            setLoading(false);
        }
        getdata();
    }, []);
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
        <br/>
        <table style={{width:"100%",marginLeft:"10px"}}>
            <tr>
                <td style={{width:"95%"}}>
                    <TextField label="username" fullWidth={true}/>
                </td>
                <td>
                    <IconButton size="large"  aria-label="Example">
                        <AddIcon/>
                    </IconButton>
                </td>
             </tr>
            </table>
            <br/>

        <UsersList data={data}/></>}</>)
}