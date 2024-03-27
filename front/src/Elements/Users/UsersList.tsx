// @ts-nocheck

import TableContainer from '@mui/material/TableContainer';
import {Chip, LinearProgress, Tooltip} from "@mui/material"
import {useEffect, useState} from "react";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
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
function l(x:string){
    if(x.length>8){
        const r=x.substring(0, 8)
        return r+".."
    }
    else{
        return x;
    }
}
function MenuL({element}){
    return(
        <ContextMenu className={"w-full"}>
            <ContextMenuTrigger>{element}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Soon nchalah</ContextMenuItem>
                <ContextMenuItem>Soon nchalah</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
//ts-ignore
function Elememnt(props){

    return (<>
    <TableRow>


            <TableCell><Tooltip title={props.id}>{l(props.id)}</Tooltip></TableCell>
            <TableCell align="center"><MenuL element={props.username}/></TableCell>
            <TableCell align="center"><MenuL element={props.name}/></TableCell>
            <TableCell align="center">{props.isadmin?<Chip label="True" color="success"/>:<Chip label="False" color="error"/>}</TableCell>





    </TableRow>
            </>)
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
                    <TableHeader style={{backgroundColor: "#333333"}}>
                        <TableRow>
                            <TableHead style={{color: "white"}} >UserID</TableHead>
                            <TableHead align="center" style={{color: "white"}} className={"text-center"}>Username</TableHead>


                            <TableHead  align="center" style={{color: "white"}} className={"text-center"}>Name</TableHead>
                            <TableHead align="center" style={{color: "white"}} className={"text-center"}>IsAdmin</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        <Elist arrayE={props.data}/>

                        </TableBody>
                </Table>
            </TableContainer></>
    )
}