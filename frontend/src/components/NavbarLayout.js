import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function NavbarLayout() {
    const storedUserJSONString = localStorage.getItem('user');
    const user = storedUserJSONString ? JSON.parse(storedUserJSONString) : null;
    return (
        <div>
            <Navbar user={user} />
            <div>
                <Outlet />
            </div>
        </div>
    )
}