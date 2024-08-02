import { Link } from "react-router-dom";
import "../../App.css";

const Nav = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  console.log("----user-----", JSON.stringify(user));

  return (
    <div>

        {/* <li><Link to="/profile"> Profile</Link></li> */}
        {!user ? (
          <ul className="nav-ul">
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login"> Login</Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-ul">
            <li>
              <Link to="/dashBord">DashBord</Link>
            </li>
            <li>
              <Link to="/logout"> Logout</Link>
            </li>
            <li>
              <Link to="/addquiz">Add quiz</Link>
            </li>
          </ul>
        )}
    </div>
  );
};

export default Nav;
