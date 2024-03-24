import {useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

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

    const  x:AxiosResponse=await axios.get("http://localhost:10000/api/user/islogin",{ withCredentials: true })
    console.log("islogin mel app "+x.data.msg);
    if(x.data.msg===true){
        setstate(false)
        setname(x.data.name);
        setisadmin(x.data.msg2);
        nav("/dashboard")

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


                        <Login refrechpage={refrechpage}/>


                    :
            <Container>
                <StyledAppBar>

                </StyledAppBar>
                <StyledDrawer variant="permanent">
                    <NavBar refrechpage={logout} nav={nav} admin={isadmin} hidden={islogin} name={name} />
                </StyledDrawer>

                <Content>


                        <Routes>
                        <Route path={"/dashboard"} >
                            <Route index element={<Dashboard name={name} />}/>
                            <Route path={"project"} element={<Projects isadmin={isadmin} />}/>
                            <Route path={"tickets"} element={<Tickets isadmin={isadmin}/>}/>
                            {isadmin==true?<Route path={"users"} element={<Users/>}/>:<></>}
                        </Route>
                            <Route path="*" element={<h1>404</h1>} />
                        </Routes>
                    
                </Content>
            </Container>}</>}

            {/*<><BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <TransitionGroup>
                                <CSSTransition
                                    {...transitionSettings}
                                >
                                    <Home />
                                </CSSTransition>
                            </TransitionGroup>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <TransitionGroup>
                                <CSSTransition
                                    {...transitionSettings}
                                >
                                    <Dashboard />
                                </CSSTransition>
                            </TransitionGroup>
                        }
                    />
                    <Route
                        path="/dashboard/projects"
                        element={
                            <TransitionGroup>
                                <CSSTransition
                                    {...transitionSettings}
                                >
                                    <Projects />
                                </CSSTransition>
                            </TransitionGroup>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>*/}
            </ThemeProvider> </>
    );
}

export default App;
