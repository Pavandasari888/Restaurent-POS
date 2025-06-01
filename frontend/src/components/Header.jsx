import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
const navigate = useNavigate();

return (
<div className="header">
    <div
    className="header-logo"
    onClick={() => navigate("/")}
    title="Home"
    style={{ cursor: "pointer" }}
    >
    <span role="img" aria-label="home" style={{ fontSize: '22px',position: 'relative', top: '-2px' }}>
        🏠
    </span>
    </div>

    <input type="text" className="search-input" placeholder="Search here..." />
</div>
);
};

export default Header;
