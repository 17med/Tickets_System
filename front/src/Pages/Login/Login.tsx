// @ts-nocheck
import {TextField, Container, Typography, Paper, CircularProgress} from '@mui/material';
import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import { Navigate } from "react-router-dom";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { ReloadIcon } from "@radix-ui/react-icons"
async function login(name,password,refrech,toast,setLoading){

    try{
        console.log(name+" "+password)
        setLoading(true);
    const x=await axios.post("/api/user/login",{
        "username":name,
        "password":password
    },{ withCredentials: true })


        refrech();
    }

    catch (e) {
        switch (e.response.status) {
            case 401:refrech();break;
            case 400:toast({
                variant: "destructive",
                title: "Error",
                description: "Username or Password is incorrect."});break;
            default:toast({
                variant: "destructive",
                title: "Error",
                description: "Error in login, please try again later."});break;
        }
        /*
        console.log(e.request.timeout)
        if(e.response.status){
            refrech();
        }
        else{
        if(e.request.timeout!==0){
        toast({
            variant: "destructive",
            title: "Error",
        description: "Error in login, please try again later."})
    }
        else{
            toast({
                variant: "destructive",
                title: "Error",
                description: "Username or Password is incorrect."})
        }
        }
        */}
    setLoading(false);


}


//@ts-ignore


export default function Login(props:any){
    const { toast } = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [rtc,setrtc]=useState(false)


    const handleLogin = () => {

        console.log('Username:', username);
        console.log('Password:', password);
    };
    return(<>


   <center class={"content-center justify-items-center justify-center mt-7"} >
       <Card style={{width:"20%"}}>
           <CardHeader>
               <CardTitle style={{fontSize:'23px'}}>Login</CardTitle>
           </CardHeader>
           <CardContent>
               <p style={{textAlign: "left"}}>Username</p>
               <Input
                   disabled={loading}
                   label="Username"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={username}
                    disable={true}
                   placeholder={"username"}
                   style={{marginTop: '5px'}}
                   onChange={(e) => setUsername(e.target.value)}
               />


               <p style={{textAlign: "left",marginTop:"20px"}}>Password</p>
               <Input
                   placeholder={"password"}
                   style={{ marginTop: '5px' }}
                   disabled={loading}
                   label="Password"
                   type="password"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={password}
                   onChange={(e) => {setPassword(e.target.value);}}
               />
               {loading===false?
               <Button onClick={()=>{login(username,password,props.refrechpage,toast,setLoading)}}
                       style={{ marginTop: '20px',width:"100%" }}>
                   Login
               </Button>:
                   <Button disabled  style={{ marginTop: '20px',width:"100%" }}>
                       <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                       Please wait
                   </Button>}
           </CardContent>

       </Card>
       {/*
       <Container component="main" style={{width:"400px"}} >
           <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <Typography variant="h5">Login</Typography>
               <Input
                   label="Username"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={username}

                   placeholder={"username"}
                   style={{ marginTop: '30px' }}
                   onChange={(e) => setUsername(e.target.value)}
               />
               <Input
                   placeholder={"password"}
                   style={{ marginTop: '20px' }}

                   label="Password"
                   type="password"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
               />
               <Button onClick={()=>{login(username,password,props.refrechpage)}}
                        style={{ marginTop: '20px',width:"100%" }}>
                   Login
               </Button>
           </Paper>
       </Container>
       */}
   </center>
    </>)
}