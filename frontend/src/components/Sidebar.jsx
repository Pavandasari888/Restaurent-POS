import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
return (
<div className="sidebar">
    <nav className="sidebar-nav">

    {/* Dashboard Icon */}
    <NavLink to="/admin/dashboard" className="sidebar-icon" title="Dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M3 22V8h4v14zm7 0V2h4v20zm7 0v-8h4v8z" />
        </svg>
    </NavLink>

    {/* Tables Icon */}
    <NavLink to="/admin/tables" className="sidebar-icon" title="Tables">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2z" />
        </svg>
    </NavLink>
    {/* Orders Icon (Iconify style dashboard icon) */}
    <NavLink to="/admin/orders" className="sidebar-icon" title="Orders">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24">
        <path fill="currentColor" d="M180 936V576h240v360H180Zm0-400V336h240v200H180Zm360 400V696h240v240H540Zm0-280V336h240v280H540Z"/>
        </svg>
    </NavLink>

    </nav>
</div>
);
};

export default Sidebar;
