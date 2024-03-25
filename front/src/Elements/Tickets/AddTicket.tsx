// @ts-nocheck
import {Dialog, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert, Autocomplete, Select, MenuItem} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from "react";
import axios from "axios";

export default function AddProject({open,setopen,setrefrech}:any){
    useEffect(() => {
        const r=async ()=>{
            const x=await axios.get("https://localhost/api/ticket/getdatatoselect",{ withCredentials: true })
            setdata(x.data);
        }
        r();
    }, []);
    const setState=(x:string)=>{
        setshow(true);
        setstate(x);
        setTimeout(()=>{setshow(false)},5000)
    };
    const [state,setstate] = useState("");
    const [show,setshow] = useState(false);

    const [project,setproject]=useState({error:false,value:""});
    const [user,setuser]=useState({error:false,value:""});
    const [title,settitle]=useState({error:false,value:""});
    const [Type,setType]=useState("");
    const [date_end,setdate_end]=useState("");
    const [description,setdescription]=useState("");
    const [data,setdata]=useState([]);
    const [errortext,seterrortext]= useState("");




    const allempty=()=>{
        setproject({error:false,value:""});
        setuser({error:false,value:""});
        settitle({error:false,value:""});
        setType("");
        setdate_end("");
        setdescription("");
    }
    const verif=async ()=>{
        console.log(Type);

        console.log(project.value,user.value,title.value,Type,date_end,description);
        if(project.value===""){
            setproject({error:true,value:""});
            return;
        }
        if(user.value===""){
            setuser({error:true,value:""});
            return;
        }
        if(title.value===""){
            settitle({error:true,value:""});
            return;
        }
        var jl={"projectId":project.value,"userId":user.value,"title":title.value,"type":Type,"date_end":date_end,"description":description};
        if(jl.description===""){
            // @ts-ignore
            delete jl.description;
        }
        if(jl.date_end===""){
            // @ts-ignore
            delete jl.date_end;
        }




        try{
            setState("loading");
            allempty();
            setopen(false);

            await axios.post("https://localhost/api/ticket/add",jl,{ withCredentials: true })
                    setState("Done");
            setrefrech();


        }
        catch (e:any) {
            seterrortext("")
            switch (e.response.status){
                case 401:seterrortext("Unauthorized");break;
                case 403:seterrortext("Forbidden");break;
                case 400:seterrortext("bad request");break;
                case 500:seterrortext("server error");break;
                default:seterrortext(e.message);break;
            }

            setState("error");
        }


    }
    return (
        <>

        <Snackbar
            className={"snackbar-grow-left"}
            open={state==="loading" && show}

            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            message="Loading"

            />
            <Snackbar
                className={"snackbar-grow-left"}
                open={state==="error" && show}
                autoHideDuration={1000}

                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}


            >
                <Alert

                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >Error : {errortext}</Alert>
            </Snackbar>
            <Snackbar
                className={"snackbar-grow-left"}
                open={state==="Done" && show}


                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}


            >
                <Alert

                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >Done</Alert>
            </Snackbar>
            <Dialog
        open={open}
        onClose={()=>{}}
        aria-labelledby="Create Ticket"
        aria-describedby="Create Ticket"
    >

        <DialogTitle id="Create Ticket">
            {"Create Ticket"}
        </DialogTitle>
        <DialogContent>

            <table style={{width: "420px", height: "5s00px"}}>
                <tr>
                    <td>
                        <label>Project Name *</label>
                    </td>
                    <td>
                        <Autocomplete
                            onChange={(event, value)=>{
                                setproject({error:false,value:value.id});
                            }}
                            disablePortal
                            id="combo-box-demo"
                            // @ts-ignore
                            options={data.project}
                            sx={{width: 300}}
                            renderInput={(params) => <TextField error={project.error} {...params} label="Projectt"/>}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>User name*</label>
                    </td>
                    <td>
                        <Autocomplete
                            //@ts-ignore
                            onChange={(event, value)=>{
                                setuser({error:false,value:value.id});
                            }}
                            disablePortal
                            id="combo-box-demo"
                            //@ts-ignore
                            options={data.user}
                            sx={{width: 300}}
                            renderInput={(params) => <TextField  error={user.error} {...params} label="user"/>}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Title*</label>
                    </td>
                    <td>

                        <TextField
                            //@ts-ignore
                            onChange={(event:any, value:any)=>{
                            settitle({error:false,value:event.target.value});
                        }} label="Title" fullWidth={true} error={title.error}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Type*</label>
                    </td>
                    <td>
                        <Select fullWidth={true} defaultValue={"Bug"}
                                onChange={(event)=>{
                                    setType(event.target.value);}}
                        >
                            <MenuItem value={"Bug"} >Bug</MenuItem>
                            <MenuItem value={"Functionality"}>Functionality</MenuItem>
                            <MenuItem value={"Feature"}>Feature</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Date end</label>
                    </td>
                    <td>
                        <TextField
                            //@ts-ignore
                            onChange={(event:any)=>{
                            setdate_end(event.target.value);}} type={"date"} fullWidth={true}
                        />
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: "top"}}>
                        <label>Description</label>
                    </td>
                    <td>
                        <TextField multiline
                                   rows={4}
                            //@ts-ignore
                                   onChange={(event:any)=>{
                            setdescription(event.target.value);}}   label="description" fullWidth={true}/>
                    </td>
                </tr>


            </table>
            <Button style={{marginTop: "10px"}} variant="contained" startIcon={<SaveIcon/>} color="success"
                    onClick={() => {
                        verif()
                    }} fullWidth={true}>save</Button>
            <Button style={{marginTop: "10px"}} variant="contained" onClick={() => {
                setopen(false)
            }} startIcon={<CloseIcon/>} color="error" fullWidth={true}>cancel</Button>

        </DialogContent></Dialog>
        </>)
}