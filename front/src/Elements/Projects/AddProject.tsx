// @ts-nocheck
import {Dialog, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {useRef, useState} from "react";
import axios from "axios";

export default function AddProject({open,setopen,setrefrech}){
    const setState=(x:string)=>{
        setshow(true);
        setstate(x);
        setTimeout(()=>{setshow(false)},5000)
    };
    const [state,setstate] = useState("");
    const [show,setshow] = useState(false);
    const [error1,seterror1] = useState(false);
    const [error2,seterror2] = useState(false);

    const [errortext,seterrortext]= useState("");
    const name=useRef(null);
    const description=useRef(null);


    const gettext=(e:any)=>{
        //@ts-ignore
        if(e.current.querySelector("input")==null){
            return e.current.querySelector("textarea").value;
        }
        else{
        return e.current.querySelector("input").value}
    }

    const verif=async ()=>{

        // @ts-ignore
        if(gettext(description)==="" || gettext(name).length<3){
            seterror1(true);

        }
        if(gettext(name)===""){
            seterror2(true);
        }


        if(  gettext(name)==="" || gettext(name).length<3 ||  gettext(description)===""){
            return ;
        }
        try{
            setState("loading");
            setopen(false);
            await axios.post("/api/project/add",{

                name:gettext(name),
                description:gettext(description)
            },{ withCredentials: true })
                    setState("Done");
            setrefrech();


        }
        catch (e:any) {
            seterrortext("")
            switch (e.response.status){
                case 401:seterrortext("Unauthorized");break;
                case 403:seterrortext("Forbidden");break;
                case 500:seterrortext("bad request");break;
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
        aria-labelledby="Create User"
        aria-describedby="Create User"
    >

        <DialogTitle id="Create User">
            {"Create Project"}
        </DialogTitle>
        <DialogContent>

            <table style={{width: "400px", height: "200px"}}>
                <tr>
                    <td>
                        <label>Project Name</label>
                    </td>
                    <td>
                        <TextField onChange={()=>{seterror1(false)}} error={error1} ref={name}  label="project name" fullWidth={true}/>
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: "top"}}>
                        <label>Description</label>
                    </td>
                    <td>
                    <TextField multiline
                                   rows={4} onChange={()=>{seterror2(false)}} error={error2} ref={description}  label="description" fullWidth={true}/>
                    </td>
                </tr>



            </table>
            <Button  style={{marginTop:"10px"}} variant="contained"  startIcon={<SaveIcon/>} color="success" onClick={()=>{verif()}} fullWidth={true}>save</Button>
            <Button style={{marginTop:"10px"}} variant="contained" onClick={()=>{setopen(false)}}   startIcon={<CloseIcon/>} color="error" fullWidth={true}>cancel</Button>

        </DialogContent></Dialog>
            </>)
}