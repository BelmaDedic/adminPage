import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import UsernameDialog from "./UsernameDialog";
import PasswordDialog from "./PasswordDialog";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const { id } = useParams();

    const storedUserJSONString = localStorage.getItem('user');
    const storageUser = storedUserJSONString ? JSON.parse(storedUserJSONString) : null;

    useEffect(() => {
        if (storageUser === null) {
            navigate('/');
        } else {
            fetchUser()
        }
    }, [])


    const fetchUser = async () => {
        const user = await fetch('http://localhost:3000/user/' + id);
        const fetchedUser = await user.json();
        setUser(fetchedUser);
    };

    return (
        <div className="profile">
            <div className="myData" style={{ textAlign: 'center' }}>
                <PersonIcon style={{ fontSize: 250 }} />
                <Typography variant="h5" gutterBottom component="div" textAlign={"center"} sx={{ cursor: "default", marginBottom: '3%' }}>
                    Dobro došli, {user && user.username}!
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2%', marginBottom: '4%' }}>
                    <UsernameDialog user={user} fetchUser={fetchUser} />
                    <PasswordDialog user={user} fetchUser={fetchUser} />
                </div>
            </div>
        </div>
    );
}