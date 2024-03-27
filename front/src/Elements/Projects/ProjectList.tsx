// @ts-nocheck
import TableContainer from '@mui/material/TableContainer';

import { Chip, LinearProgress, Tooltip} from "@mui/material"
import {useEffect, useState} from "react";
import { red } from '@mui/material/colors';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button.tsx";

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
            <TableCell align="center"><Button  >more</Button></TableCell>



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
                    <TableHeader style={{backgroundColor: "#333333"}}>
                        <TableRow>
                            <TableHead style={{color: "white"}} >ProjectID</TableHead>
                            <TableHead style={{color: "white"}} align="center" className={"text-center"}>Name</TableHead>


                            <TableHead style={{color: "white"}} align="center" className={"text-center"}>Date creation</TableHead>
                            <TableHead align="center" style={{color: "white"}} className={"text-center"}></TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Elist arrayE={props.data.data}/>
                    </TableBody>
                </Table>
            </TableContainer></>
    )
}