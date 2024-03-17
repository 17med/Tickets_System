import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Chip, LinearProgress, Tooltip} from "@mui/material"
import {useEffect, useState} from "react";
import { red } from '@mui/material/colors';
function l(x:string){
    if(x.length>8){
        const r=x.substring(0, 8)
        return r+".."
    }
    else{
        return x;
    }
}
//ts-ignore
function Elememnt(props){

    return (<>
        <TableRow>
            <TableCell><Tooltip title={props.id}>{l(props.id)}</Tooltip></TableCell>
            <TableCell align="center">{props.username}</TableCell>
            <TableCell align="center">{props.name}</TableCell>
            <TableCell align="center">{props.isadmin?<Chip label="True" color="success"/>:<Chip label="False" color="error"/>}</TableCell>



        </TableRow></>)
}
function Elist(props){

    const x=[];
    props.arrayE.forEach((e:any)=>{
        x.push(
            <Elememnt id={e.id} username={e.username} name={e.name} isadmin={e.isadmin}/>
        );
    })

    return x;
}
export default function  Tickets(props:any){
    useEffect(() => {
        
    }, []);
    // @ts-ignore
    return (
        <>

            <TableContainer>
                <Table sx={{minWidth: 650, maxWidth: "99%"}} style={{border: "0px solid", borderRadius: "100px"}}
                       aria-label="simple table">
                    <TableHead style={{backgroundColor: "#333333"}}>
                        <TableRow>
                            <TableCell style={{color: "white"}}>UserID</TableCell>
                            <TableCell style={{color: "white"}} align="center">Username</TableCell>


                            <TableCell style={{color: "white"}} align="center">Name</TableCell>
                            <TableCell align="center" style={{color: "white"}}>IsAdmin</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Elist arrayE={props.data}/>
                    </TableBody>
                </Table>
            </TableContainer></>
    )
}