//@ts-ignore

import {CircleUser} from "lucide-react";

import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import {toast} from "@/components/ui/use-toast.ts";
export  default function Bar(props:any) {

    return (<div className="w-full flex-1 ">
        <div className="float-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5"/>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>{
                        toast({"title":"soon nchalah"})
                    }}>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{
                        toast({"title":"soon nchalah"})
                    }}>Support</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>{
                        props.logout();
                    }}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>)
}