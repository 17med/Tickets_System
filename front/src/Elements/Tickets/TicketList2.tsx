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
import { DataGrid } from '@mui/x-data-grid';
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
            <TableCell align="center"><Button style={{backgroundColor:"#333333"}} variant={"contained"}>more</Button></TableCell>



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
    if(props.data.data!==undefined){
    console.log(props.data.data)
    useEffect(() => {

    }, []);
    var cols=[];
    if(props.isadmin===false){
    cols=[
        {field:"id",  headerName: 'TicketID', width: 150,editable:false},
        {field:"projectname",  headerName: 'Project', width: 250},
        {field:"title",  headerName: 'Ticket title', width: 170},
        {field:"date_end",  headerName: 'Date end', width: 170},
        {field:"type",  headerName: 'Type', width: 170},
        {field:"state",  headerName: 'State', width: 170},
    ]}
    else{

    cols=[
            {field:"id",  headerName: 'TicketID', width: 350,editable:true},
            {field:"projectname",  headerName: 'Project', width: 250},
        {field:"username",  headerName: 'User', width: 170},

        {field:"title",  headerName: 'Ticket title', width: 170},
             {field:"date_end",  headerName: 'Date end', width: 170},
            {field:"type",  headerName: 'Type', width: 170},
            {field:"state",  headerName: 'State', width: 170},
        ]}
    var data=[];
    props.data.data.forEach((e:any)=>{
        data.push({id:e.id,projectname:e.projectname,username:e.username,title:e.title,date_end:e.date_end,type:e.type,state:<Chip label={e.state}></Chip>})
    })
    // @ts-ignore
    return (
        <><DataGrid rows={props.data.data}
                    columns={cols}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick />

            </>
    )
    }
}