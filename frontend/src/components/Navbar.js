import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useEffect } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    
    const storedUserJSONString = localStorage.getItem('user');
    const user = storedUserJSONString ? JSON.parse(storedUserJSONString) : null;

    useEffect(() => {
        if(user === null){
          navigate('/');
        }
      }, [])

    const logOut = () => {
        navigate('/');
        localStorage.removeItem('user');
    }

    return ( 
        <div className="navbar">
            <div className="navbarText">
            <Link to="/AdminDashboard" className="linkTitle" style={{textDecoration: "none"}}>
                <h1>Airsoft App</h1>
            </Link>
                
            </div>
            <div className='logOut'>
                <Link to={`/MyProfile/${user && user._id}`} className="link" style={{textDecoration: "none"}}>Profil</Link>
                <Button variant="contained" color="success" style={{height: '40px'}} onClick={logOut}>Odjavi se</Button>
            </div>
        </div>
    );
}
