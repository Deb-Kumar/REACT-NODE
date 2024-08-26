import { useNavigate } from "react-router-dom";
function Header() {
    let navigate  = useNavigate();

    let changeRoute = (e , path)=> {
        e.preventDefault();
        navigate(path);
    }

    return (
      <div className="header">
        <a href="" onClick={(e) => changeRoute(e, '/home')}>Home</a>
        <a href="" onClick={(e) => changeRoute(e, '/about')}>About</a>
        <a href="" onClick={(e) => changeRoute(e, '/user/list')}>Users</a>
      </div>
    );
  }
  
  export default Header;