// @ts-nocheck
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Chip, LinearProgress, Tooltip} from "@mui/material"
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
    console.log("data");
    console.log(props);
    return (<>
        <TableRow>
            <TableCell><Tooltip title={props.id}>{l(props.id)}</Tooltip></TableCell>
            <TableCell align="center">{props.name}</TableCell>
            <TableCell align="center"><Tooltip title={props.dataCrt.toString()}>{props.dataCrt.toString().split("T")[0]}</Tooltip></TableCell>
            <TableCell align="center"><Button style={{backgroundColor:"#333333"}} variant={"contained"}>more</Button></TableCell>



        </TableRow></>)
}
function Elist(props){

    const x=[];
    console.log(props.arrayE);
    props.arrayE.forEach((e:any)=>{
        x.push(
            <Elememnt id={e.id}  name={e.name} dataCrt={e.dataCrt}/>
        );
    })

    return x;
}
export default function  Tickets(props:any){
    console.log("data"+props.data);
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
                            <TableCell style={{color: "white"}}>ProjectID</TableCell>
                            <TableCell style={{color: "white"}} align="center">Name</TableCell>


                            <TableCell style={{color: "white"}} align="center">Date creation</TableCell>
                            <TableCell align="center" style={{color: "white"}}></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Elist arrayE={props.data.data}/>
                    </TableBody>
                </Table>
            </TableContainer></>
    )
}