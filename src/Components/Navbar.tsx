import { useNavigate } from "react-router-dom";

const Navbar = (props: { userName: string; userId: string }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("blogify");
    navigate("/");
  };
  return (
    <div className="w-screen bg-[#5e503f99] flex justify-between px-7 items-center h-[5vh] fixed top-0">
      <p>Welcome {props.userName},</p>
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
