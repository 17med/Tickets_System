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
const drawerWidth = 240;

const Container = styled.div`
    display: flex;
    height: 100vh;
    
    background-color: #f4f4f4;
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
    console.log("islogin mel app "+x.data.msg);
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
    const [refrech,setrefrech]=useState(0)
    const refrechpage=()=>{setrefrech(refrech+1)}
    const logout=()=>{setlogin(!false);setloading(false);setrefrech(0);}
    useEffect(() => {
getdata(setloading,setlogin,setname,setisadmin,nav);
    }, [refrech]);
    return (
        <>
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
                    <NavBar refrechpage={logout} nav={nav} admin={isadmin} hidden={islogin} name={name} />
                </StyledDrawer>

                <Content>


                        <Routes>
                        <Route path={"/dashboard"} element={<Dashboard name={name} />} />


                            <Route path={"/dashboard/project"} element={<Projects isadmin={isadmin} />}/>
                            <Route path={"/dashboard/tickets"} element={<Tickets isadmin={isadmin}/>}/>
                            {isadmin==true?<Route path={"/dashboard/users"} element={<Users/>}/>:<></>}


                            <Route path="*" element={<Navigate to={"/dashboard"}/>} />
                        </Routes>

                </Content>
            </Container>}</>}


            </ThemeProvider> </>
    );
}

export default App;
