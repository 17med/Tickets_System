// @ts-nocheck
import {Dialog, DialogContent, DialogTitle, TextField, Snackbar, Alert} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {useRef, useState} from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea"
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Save, X} from "lucide-react";
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


        return e.current.value
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
                    <div style={{width: "400px", height: "270px"}}>
                        <div className="grid w-full mt-2 max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Username</Label>

                            <Input onChange={() => {
                                seterror1(false)
                            }} error={error1} ref={name} label="project name" fullWidth={true}/>
                        </div>
                        <div className="grid w-full mt-2 max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Username</Label>
                            <Textarea multiline
                                       rows={4} onChange={() => {
                                seterror2(false)
                            }} error={error2} ref={description} label="description" fullWidth={true}/>
                        </div>

                            <Button className={"w-full"} style={{marginTop: "10px"}}  startIcon={<SaveIcon/>}
                                    color="success" onClick={() => {
                                verif()
                            }} fullWidth={true}><Save className="mr-2 h-4 w-4" />save</Button>
                            <Button className={"w-full"} style={{marginTop: "10px"}} variant={"destructive"} onClick={() => {
                                setopen(false)
                            }} startIcon={<CloseIcon/>} color="error" fullWidth={true}><X className="mr-2 h-4 w-4" />cancel</Button>

                    </div>
                    </DialogContent></Dialog>
        </>
)
}