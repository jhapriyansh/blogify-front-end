import { Link, useNavigate } from "react-router-dom";

const Navbar = (props: { userName: string; userId: string }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("blogify");
    navigate("/");
  };
  return (
    <div className="w-screen bg-[#5e503f99] flex justify-between px-7 items-center h-[5vh] fixed top-0 z-50">
      <p
        className="text-white text-xl cursor-pointer"
        onClick={() => {
          navigate("/profile");
        }}
      >
        Welcome {props.userName},
      </p>

      <div className="flex justify-evenly items-center w-[50%]">
        <Link to="/feed">Feed</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <button
        onClick={() => {
          handleLogout();
        }}
      >
        <i className="fa-solid text-red-500 fa-power-off">&nbsp;Logout</i>
      </button>
    </div>
  );
};

export default Navbar;
