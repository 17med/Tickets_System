import TicketsList from "../../Elements/Tickets/TicketList.tsx"
import {IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default  function Tickets(){
    return (
        <>
        <br/>
    <table style={{width:"100%",marginLeft:"10px"}}>
        <tr>
            <td style={{width:"95%"}}>
                <TextField label="username" fullWidth={true}/>
            </td>
            <td>
                <IconButton size="large"  aria-label="Example">
                    <AddIcon/>
                </IconButton>
            </td>
        </tr>
    </table>
    <br/>
    <TicketsList/>
        </>
            )
}