// @ts-nocheck
import {TextField, Button, Container, Typography, Paper, CircularProgress} from '@mui/material';
import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import { Navigate } from "react-router-dom";
import Verificator from "../../Elements/Verificator.tsx";

async function login(name,password,refrech){
    try{
        console.log(name+" "+password)
    const x=await axios.post("/api/user/login",{
        "username":name,
        "password":password
    },{ withCredentials: true })


        refrech();
    }

    catch (e) {
        console.log(e);
        alert("error")
    }


}


//@ts-ignore


export default function Login(props:any){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true)
    const [rtc,setrtc]=useState(false)


    const handleLogin = () => {

        console.log('Username:', username);
        console.log('Password:', password);
    };
    return(<>


   <center>
       <Container component="main" style={{width:"400px"}} >
           <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <Typography variant="h5">Login</Typography>
               <TextField
                   label="Username"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
               />
               <TextField
                   label="Password"
                   type="password"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
               />
               <Button onClick={()=>{login(username,password,props.refrechpage)}}
                   variant="contained" color="primary" style={{ marginTop: '20px',width:"100%" }}>
                   Login
               </Button>
           </Paper>
       </Container>
   </center>
    </>)
}