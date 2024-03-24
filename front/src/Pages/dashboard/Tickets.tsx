// @ts-nocheck
import TicketsList from "../../Elements/Tickets/TicketList.tsx"
import {IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useEffect, useState} from "react";
import AddTicket from "../../Elements/Tickets/AddTicket.tsx";
import axios from "axios";
export default  function Tickets({isadmin}:any){
    const [open, setOpen] = useState(false);
    //@ts-ignore
    const [loading, setLoading] = useState(true);
    const [data,setdata]=useState([])
    const [refrech,setrefrech]=useState(false);
    useEffect(() => {
        async function getdata(){
            const x=await axios.get("http://localhost/api/ticket/getall",{ withCredentials: true })
            setdata(x.data);
            console.log(x.data);
            setLoading(false);
        }
        getdata();
    }, [refrech]);
    return (
        <>
        <br/>
    <table style={{width:"97.5%",marginLeft:"10px"}}>
        <tr>

            {isadmin ?<>
                <AddTicket open={open} setopen={setOpen} setrefrech={()=>{setrefrech(!refrech)}}/>
                <td style={{width: "100%"}}>
                    <TextField label="username" fullWidth={true}/>
                </td>
                <td>
                    <IconButton size="large" aria-label="Example" onClick={()=>{setOpen(true)}}>
                        <AddIcon/>
                    </IconButton>
                </td></>
                : <td style={{width: "100%"}}>
                    <TextField label="username" style={{width: "99.5%"}}/>
                </td>
            }
        </tr>
    </table>
            <br/>
            <TicketsList isadmin={isadmin} data={data}/>
        </>
    )
}