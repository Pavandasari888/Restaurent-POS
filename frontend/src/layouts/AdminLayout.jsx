import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
const location = useLocation();
const hideHeader = location.pathname.startsWith("/admin/menu");

return (
<div className="admin-layout">
    <Sidebar />
    <div className="main-content">
    {!hideHeader && <Header />}
    <div className="page-content">{children}</div>
    </div>
</div>
);
};

export default AdminLayout;
