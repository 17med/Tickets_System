// Profile.js
// @ts-nocheck
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Package2} from "lucide-react";

const Profile = (props) => {
    return (
        <div style={{ display: 'flex', alignItems: 'left'}}>
            <Package2 className="h-7 w-7 mt-2" />
            <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-1.5 ml-3">
                    Dashboard
                </h4>

                {/* You can add additional user information here */}
            </div>
        </div>
    );
};

export default Profile;
