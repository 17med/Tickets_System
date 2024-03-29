import {useEffect, useState} from "react";
import Tickets from "@/Elements/Tickets/TicketList2";
import { useSpring, animated } from 'react-spring';
import { Separator } from "@/components/ui/separator"

function isValidObjectId(str?:string):boolean{
    // Regex pattern for MongoDB ObjectID
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    if(str!==undefined)
    return objectIdPattern.test(str);
    else return false;
}
interface ProjectIdProps {
    isadmin: boolean;
}
import {useParams } from 'react-router-dom';
/*
import { Icon } from 'lucide-react/core';
import { Error } from 'lucide-react/alerts';
*/
import { Frown } from 'lucide-react';
import axios from "axios";
import {Button} from "@/components/ui/button.tsx";
function A404(){
    return (<div className="flex flex-col  justify-center items-center h-screen -mt-10">
        <Frown className="mb-4 size-20" style={{fontSize:"1000px"}}/>
        <div className="text-2xl font-bold text-gray-800">404 - Page Not Found</div>
    </div>);
}
function Project(props: any) {
    return(<div className={"ml-3"}>
        <div className="text-4xl font-bold text-gray-800">Project Info</div>
        <br/>
        <br/>
        <div className="grid grid-cols-2 gap-4 max-w-[800px] pl-4">
            <div className=" p-4 text-left">
                <div className="text-2xl  text-gray-800"><b>Project Name:</b> {props.info.name}</div>
            </div>
            <div className=" p-4 text-left">
                <div className="text-2xl  text-gray-800"><b>Project Creation Date:</b> {props.info.dataCrt.substr(0,16).replace("T"," ")}</div>
            </div>
        </div>
        <br/>
        <div className=" p-4 text-left ml-4">
            <div className="text-2xl  text-gray-800">
                <b>Description:</b> {props.info.description}</div>
        </div>
        <br/>
        <br/>
        <div className="text-4xl font-bold text-gray-800">Tickets
        </div>
        <br/>
        <br/>
        <Tickets data={props.tickets} isadmin={props.isadmin}/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="align-bottom mt-16">
        <Separator className="font-bold" />
        <br/>
        <Button variant={"destructive"} className={"w-full"}>Delete</Button>
            <br/><Separator className="font-bold" />
        </div>
    </div>)
}


export default function ProjectId(props: ProjectIdProps) {
    const animationProps = useSpring({
        opacity: 1,
        from: { opacity: 0 }, // Initial state, opacity is 0
        config: { duration: 500 } // Animation duration
    });
    const animationProps2 = useSpring({
        from: { transform: 'translate(0px, 0px) rotate(0deg)' },
        to: async next => {
            while (true) {
                await next({ transform: 'translate(2px, 2px) rotate(2deg)' });
                await next({ transform: 'translate(-2px, -2px) rotate(-2deg)' });
                await next({ transform: 'translate(0px, 0px) rotate(0deg)' });
            }
        },
    });
    const {id} = useParams();
    var [isvalid, setvalid] = useState(true);
    const [data, setdata] = useState<any>(null);

    const search = async () => {
        try {
            const x = await axios.get("/api/project/" + id, {withCredentials: true})
            setdata(x.data);

        } catch (e) {

        }
    }
    useEffect(() => {
        if (isValidObjectId(id) === true) {
            search();
        }
        else{
            setvalid(false);
        }
    }, []);
return(<>
    {isvalid===true?
        <>
        {data!==null?
            <animated.div style={animationProps}>
            <Project tickets={data.tickets} isadmin={props.isadmin} info={data.info}/></animated.div>:<></>}</>:



        <animated.div style={animationProps2}><A404/></animated.div>
        }
</>)
}