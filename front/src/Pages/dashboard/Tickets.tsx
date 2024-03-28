// @ts-nocheck
import TicketsList from "../../Elements/Tickets/TicketList.tsx"
import {IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useEffect, useState} from "react";
import AddTicket from "../../Elements/Tickets/AddTicket.tsx";
import axios from "axios";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label.tsx";
import { useSpring, animated } from 'react-spring';
export default  function Tickets({isadmin}:any){
    document.title= "Tickets";
    const animationProps = useSpring({
        opacity: 1,
        from: { opacity: 0 }, // Initial state, opacity is 0
        config: { duration: 500 } // Animation duration
    });
    const [open, setOpen] = useState(false);
    //@ts-ignore
    const [loading, setLoading] = useState(true);
    const [data,setdata]=useState([])
    const [refrech,setrefrech]=useState(false);
    useEffect(() => {
        async function getdata(){
            const x=await axios.get("/api/ticket/getall",{ withCredentials: true })
            setdata(x.data);
            console.log(x.data);
            setLoading(false);
        }
        getdata();
    }, [refrech]);
    return (
        <animated.div style={animationProps}>
            <br/>

            <Label htmlFor="h1" className={"font-bold text-3xl ml-2"}>Tickets</Label>
            <br/>
            <br/>
            <table style={{width: "97.5%", marginLeft: "10px"}}>
                <tr>

                    {isadmin ? <>
                            <AddTicket open={open} setopen={setOpen} setrefrech={() => {
                                setrefrech(!refrech)
                            }}/>
                            <td style={{width: "100%"}}>
                                <Input label="username" placeholder={"name or id"} fullWidth={true}/>
                            </td>
                            <td>
                                <IconButton size="large" aria-label="Example" onClick={() => {
                                    setOpen(true)
                                }}>
                                    <AddIcon/>
                                </IconButton>
                            </td>
                        </>
                        : <td style={{width: "100%"}}>
                            <Input label="username" style={{width: "99.5%"}}/>
                        </td>
                    }
                </tr>
            </table>
            <br/>
            <TicketsList isadmin={isadmin} data={data}/>
        </animated.div>
    )
}