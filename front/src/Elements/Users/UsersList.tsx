// @ts-nocheck

import TableContainer from '@mui/material/TableContainer';
import {Chip, LinearProgress, Tooltip} from "@mui/material"
import {useEffect, useState} from "react";

import { useToast } from "@/components/ui/use-toast"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import axios from "axios";
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
        <ContextMenu className={"w-full"} style={{width:"100%"}}>
            <ContextMenuTrigger className={"w-full"} style={{width:"100%"}}>{element}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Soon nchalah</ContextMenuItem>
                <ContextMenuItem>Soon nchalah</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
function SetAdmin({element,admin,id,setrefrech}){
    const { toast } = useToast();
    console.log(element)

        const stf=async ()=> {
            try {
                const x = await axios.post("/api/user/state", {id: id}, {withCredentials: true})
                if (admin === true) {
                    toast({
                        titel:"success",

                        description:"User is now an admin"})
                }

        else
            {
                toast({
                    titel:"success",

                    description:"User is now a normal user"})

            }
                setrefrech()

        }
            catch (e) {

                toast({title:"Error",description:"An error has occured",
                    variant: "destructive"})



        }
    }
    return(
        <ContextMenu>
            <ContextMenuTrigger >{element}</ContextMenuTrigger>
            <ContextMenuContent>
                {admin===true?
                <ContextMenuItem onClick={stf}>Set Normal User</ContextMenuItem>
:
                    <ContextMenuItem onClick={stf}>Set Admin</ContextMenuItem>
                }
            </ContextMenuContent>
        </ContextMenu>
    );
}
//ts-ignore
function Elememnt(props){
    const id=props.id;
    console.log(props.isadmin)
    return (<>

    <TableRow className={"w-full"}>


            <TableCell><Tooltip title={props.id}>{l(props.id)}</Tooltip></TableCell>
            <TableCell align="center">{props.username}</TableCell>
            <TableCell align="center">{props.name}</TableCell>
            <TableCell align="center">{props.isadmin?<SetAdmin setrefrech={props.setrefrech} id={id} element={<Chip label="True" color="success"/>} i admin={true}/>:
                <SetAdmin id={id} setrefrech={props.setrefrech} element={<Chip label="False" color="error" />}   admin={false}/>}
            </TableCell>




    </TableRow>


        <br/>
            </>)
}
function Elist(props){

    const x=[];
    props.arrayE.forEach((e:any)=>{
        x.push(
            <Elememnt id={e.id} username={e.username} name={e.name} isadmin={e.isadmin} setrefrech={props.setrefrech}/>
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

                        <Elist arrayE={props.data} setrefrech={props.setrefrech}/>

                        </TableBody>
                </Table>
            </TableContainer></>
    )
}