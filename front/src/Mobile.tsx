import {
    Card,
    CardContent,
    CardDescription,

    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
export default function Mobile() {
    return (<div className={"flex justify-center items-center h-screen"}>

        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Your device isn't supported.</CardTitle>
                <CardDescription>The mobile isn't supported at the moment. If you have any inquiries, please contact the admins</CardDescription>
            </CardHeader>
            <CardContent>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className={"w-full"}>Contact The Admins</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Admins</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem><Button variant="link" onClick={()=>{window.open("https://github.com/17med")}}>Ahmed</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button variant={"link"} onClick={()=>{window.open("https://github.com/arfaouikarim")}}> Karim</Button></DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                </CardContent>
        </Card>
    </div>)
}