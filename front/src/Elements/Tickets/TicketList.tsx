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
import {Button} from "@/components/ui/button";
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

    // @ts-ignore

    return (<>
        <TableRow>
            <TableCell><Tooltip title={props.id}>{l(props.id)}</Tooltip></TableCell>
            <TableCell align="center">{props.project}</TableCell>
            <TableCell align="center">{props.title}</TableCell>
            {props.username!==undefined?<TableCell align="center"><Tooltip title={"65dc85b81182ba891b9999f8"}>{props.username}</Tooltip></TableCell>
:<></>}
            <TableCell align="center"><Tooltip title={props.date_end.toString().replace("T"," ").replace("Z","")}>{props.date_end.toString().split("T")[0]}</Tooltip></TableCell>
            <TableCell align="center">{props.type}</TableCell>
            <TableCell align="center"><Chip label={props.state}></Chip></TableCell>
            <TableCell align="center"><Button style={{backgroundColor:"#333333"}} >more</Button></TableCell>



        </TableRow></>)
}
function Elist(props){

    const x=[];
    console.log("props",props.arrayE);
    if(props.arrayE!==undefined){
    props.arrayE.forEach((e:any)=>{
        x.push(
            <Elememnt id={e.id} project={e.projectname}  username={e.username}  title={e.title} date_end={e.date_end} type={e.type} state={e.state}/>
        );
    })}

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
                    <TableHeader style={{backgroundColor: "#333333"}}>
                        <TableRow>
                            <TableHead style={{color: "white"}}>TicketID</TableHead>
                            <TableHead style={{color: "white"}} align="center"  className={"text-center"}>Project</TableHead>
                            <TableHead style={{color: "white"}} align="center"  className={"text-center"}>Title</TableHead>
                            {props.isadmin===true?
                            <TableHead style={{color: "white"}} align="center"  className={"text-center"}>User</TableHead>
                            :<></>}
                            <TableHead style={{color: "white"}} align="center"  className={"text-center"}>Date end</TableHead>
                            <TableHead style={{color: "white"}} align="center"  className={"text-center"}>type</TableHead>
                            <TableHead align="center" style={{color: "white"}}  className={"text-center"}>state</TableHead>
                            <TableHead align="center" style={{color: "white"}}  className={"text-center"}></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Elist   arrayE={props.data.data}/>
                    </TableBody>
                </Table>
            </TableContainer></>
    )
}