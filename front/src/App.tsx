import {useEffect, useState} from 'react';
import {Routes, Route, useNavigate,Navigate} from 'react-router-dom';

import Login from './Pages/Login/Login.tsx';
import Dashboard from './Pages/dashboard/Dashboard.tsx';
import Projects from './Pages/dashboard/Projects.tsx';
import Users from "./Pages/dashboard/Users.tsx";
import Tickets from "./Pages/dashboard/Tickets.tsx"
import NavBar from "./Elements/Navbar.tsx";
import {AppBar, CircularProgress, createTheme, Drawer, ThemeProvider} from "@mui/material";
import styled from "styled-components";
import axios, {AxiosResponse} from "axios";
import { Toaster } from "@/components/ui/toaster"
import Bar from "@/Elements/Bar.tsx";
import ProjectId from "@/Pages/dashboard/ProjectId.tsx";
const theme=createTheme({
    palette: {
        primary: {
            main: '#333333',
            light: '#333333',
            dark: '#333333',

        },
        secondary: {
            main: '#ffffff',

        },
    },
});
const drawerWidth = 270;

const Container = styled.div`
    display: flex;
    height: 100vh;
    
    background-color:white;
`;

const StyledAppBar = styled(AppBar)`
    width: ${drawerWidth}px;
    flex-shrink: 0;
`;

const StyledDrawer = styled(Drawer)`
    width: ${drawerWidth}px;
    flex-shrink: 0;
`;

const Content = styled.div`
    flex-grow: 1;
    padding: 20px;
`;
async function getdata(setloading:any,setstate:any,setname:any,setisadmin:any,nav:any){
    console.log(import.meta.env.BASE_URL);
    const  x:AxiosResponse=await axios.get("/api/user/islogin",{ withCredentials: true })

    if(x.data.msg===true){
        setstate(false)
        setname(x.data.name);
        setisadmin(x.data.msg2);

        nav(window.location.pathname)

    }
    else{

        console.log("islogin mel app "+x.data.msg);
    }
    setloading(false);
}



function App() {
    const nav=useNavigate();
    const [islogin,setlogin]=useState(!false);
    const [loading,setloading]=useState(true);
    const [isadmin,setisadmin]=useState(false);
    const [name,setname]=useState("ss");
    const [refrech,setrefrech]=useState(false)
    const refrechpage=()=>{setrefrech(!refrech)}
    const actLogoutx = async () => {

       const x:AxiosResponse= await axios.get("/api/user/logout", { withCredentials: true });
        console.log(x)
       if(x.status===200){
       logout();}
    }



    const logout=()=>{setlogin(!false);setloading(false);setrefrech(!refrech);}
    useEffect(() => {
getdata(setloading,setlogin,setname,setisadmin,nav);
    }, [refrech]);
    return (
        <div className={""}>
            <Toaster />
            <ThemeProvider theme={theme}>
            {loading?<div style={{
                    height:"90vh",

                    alignItems:"center",
                    justifyContent:"center",
                    display:"flex"
                }}><CircularProgress  size={120} thickness={5}/></div>:
                <>{islogin===true?
                    <Routes>
                        <Route path={"/login"} element={<Login refrechpage={refrechpage}/>}/>
                        <Route path="*" element={<Navigate to={"/login"}/>} />
                    </Routes>


                    :
            <Container>
                <StyledAppBar>

                </StyledAppBar>
                <StyledDrawer variant="permanent">
                    <NavBar refrechpage={logout} nav={nav} isadmin={isadmin} hidden={islogin} name={name} />
                </StyledDrawer>


                <Content>


                        <Routes>
                        <Route path={"/dashboard"} element={<><Bar logout={actLogoutx}/><br/><br/><Dashboard name={name} /></>} />


                            <Route path={"/dashboard/project"} element={<><Bar logout={actLogoutx}/><br/><Projects isadmin={isadmin} /></>}/>
                            <Route path={"/dashboard/project/:id"} element={<><Bar logout={actLogoutx}/><br/><ProjectId isadmin={isadmin} /></>}/>
                            <Route path={"/dashboard/tickets"} element={<><Bar logout={actLogoutx}/><br/><Tickets isadmin={isadmin}/></>}/>
                            {isadmin==true?<Route path={"/dashboard/users"} element={<><Bar logout={actLogoutx}/><br/><Users/></>}/>:<></>}


                            <Route path="*" element={<Navigate to={"/dashboard"}/>} />
                        </Routes>

                </Content>
            </Container>}</>}


            </ThemeProvider> </div>
    );
}

export default App;
