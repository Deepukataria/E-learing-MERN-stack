import { MdDashboard, MdLogout } from "react-icons/md";
import "./Account.css";
import { UserData } from "../../Context/UserContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name: {user.name}</strong>
            </p>
            <p>
              <strong>E-mail: {user.email}</strong>
            </p>
            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="common-btn"
            >
              <MdDashboard />
              Dashboard
            </button>
            <br />
            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="common-btn"
              >
                <MdDashboard />
                Admin Dashboard
              </button>
            )}
            <br />
            <button onClick={logoutHandler} className="common-btn">
              <MdLogout />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
