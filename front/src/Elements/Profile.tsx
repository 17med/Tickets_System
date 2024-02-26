// Profile.js
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Profile = (props) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '20px',marginTop:"10px" }}>
            <Avatar alt={props.name+"Avatar"}  style={{ marginRight: '10px' }} >{props.name[0]}</Avatar>
            <div>
                <Typography variant="h6" style={{ color: '#fff' }}>
                    {props.name}
                </Typography>
                {/* You can add additional user information here */}
            </div>
        </div>
    );
};

export default Profile;
