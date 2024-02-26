import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Chip} from "@mui/material"
//ts-ignore
function Elements(props:any){
    const x=[];
    for(var i=0;i<props.list.length;i++){
        x.push(
            <TableRow>
                <TableCell>
                    {props.list[i].name}
                </TableCell>
                <TableCell align="center">
                    {props.list[i].state}
                </TableCell>

                <TableCell align="center">

                    <Chip
                        sx={{

                            '& .MuiChip-label': {
                                display: 'block',
                                whiteSpace: 'normal',
                            },
                        }}
                        size="small"
                        label={props.list[i].type}
                        />
                </TableCell>
                <TableCell align="center">
                    {props.list[i].Project}
                </TableCell>
                <TableCell align="center">
                    {props.list[i].User}
                </TableCell>
                <TableCell align="center">
                    {props.list[i].startdt}
                </TableCell>
                <TableCell align="right">
                    {props.list[i].enddt}
                </TableCell>
            </TableRow>
        )
    }
    return x;
}
export default function  Tickets(props:any){
    // @ts-ignore
    return (
        <TableContainer >
            <Table sx={{ minWidth: 650,maxWidth:"99%" }} style={{border:"0px solid",borderRadius:"100px"}} aria-label="simple table">
                <TableHead style={{backgroundColor:"#1e1e1e"}}>
                    <TableRow>
                        <TableCell style={{color:"white"}}>TicketID</TableCell>
                        <TableCell style={{color:"white"}} align="center">State</TableCell>

                        <TableCell style={{color:"white"}} align="center">Type</TableCell>
                        <TableCell style={{color:"white"}} align="center">Project</TableCell>
                        <TableCell align="center" style={{color:"white"}}>User</TableCell>
                        <TableCell align="center" style={{color:"white"}}>Start Date&nbsp;</TableCell>
                        <TableCell align="right" style={{color:"white"}}>End Date&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Elements list={[{
                        name:"ahmed",
                        state:"mezlt",
                        type:"ss",

                        Project:"mm",
                        "User":"ll",
                        startdt:"2023-04-05",
                        enddt:"2023-04-25"



                    },{
                        name:"ahmed",
                        state:"mezlt",
                        type:"sssslksks",
                        Project:"mm",
                        "User":"ll",
                        startdt:"2023-04-05",
                        enddt:"2023-04-25"



                    },{
                        name:"ahmed",
                        state:"mezlt",
                        type:"ss",
                        Project:"mm",
                        "User":"ll",
                        startdt:"2023-04-05",
                        enddt:"2023-04-25"



                    }]}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}