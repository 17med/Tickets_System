import axios, {AxiosResponse} from "axios";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

async function getdata(setloading,setgo,val,func){

    const  x:AxiosResponse=await axios.get("http://localhost/api/user/islogin",{ withCredentials: true })
    console.log(x.data);
    if(x.data.msg===val){
        setgo(true);


    }
    else{
        console.log(func)
        if(func!==undefined){
            func(x.data.msg2,x.data.name);


        }

    }
    setloading(false);
}
export default function Verificator(props){
    const [go,setgo]=useState(false)

    useEffect(() => {
        getdata(props.setLoading,setgo,props.val,props.func);
    }, []);
    return (
        <>
        {go?<Navigate to={props.to}/>:<></>}
        </>
    )
}