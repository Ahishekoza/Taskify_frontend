import { MdOutlineSpaceDashboard } from "react-icons/md";
import {
  IoHomeOutline,
  IoCreateOutline,
  IoAnalyticsOutline,
} from "react-icons/io5";
import { CiLogout, CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContextProvider";

const NavigationSideBar = () => {
  const { isAuthenticated, Logout } = useAuth();
  const navigate = useNavigate();

  const handleUserLogout = () => {
    Logout();
    navigate("/");
  };

  return (
    <div>
      {/* Navigation For BigScreens*/}
      <div className="hidden sm:block ">
        <Link to={"/"} className="text-2xl py-10 px-4 flex items-center gap-2 ">
          <MdOutlineSpaceDashboard />
          <span className=" tracking-wider">Taskify</span>
        </Link>

        <div className="px-7   flex flex-col gap-6">
          <Link to={"/"} className="text-xl flex items-center gap-2">
            <IoHomeOutline />
            <span>Home</span>
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to={"/create_task"}
                className="text-xl flex items-center gap-2"
              >
                <IoCreateOutline />
                <span>Create Task</span>
              </Link>
              <Link
                to={"/task_overview"}
                className="text-xl flex items-center gap-2"
              >
                <IoAnalyticsOutline />
                <span>Overview</span>
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <div className="text-xl flex items-center gap-2">
              <CiLogout />
              <button onClick={handleUserLogout}>Logout</button>
            </div>
          ) : (
            <Link to={"/login"} className="text-xl flex items-center gap-2">
              <CiLogin />
              <button>Login</button>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation For MobileScreens */}
      <div className="block sm:hidden">
        <div className=" flex flex-col gap-6 px-2 py-10 text-3xl items-center h-screen rounded-r-lg shadow-lg">
          <Link to={"/"}>
            <MdOutlineSpaceDashboard />
          </Link>
          <Link to={"/"}>
            <IoHomeOutline />
          </Link>
          {isAuthenticated && (
            <>
              <Link to={"/create_task"}>
                <IoCreateOutline />
              </Link>
              <Link to={"/task_overview"}>
                <IoAnalyticsOutline />
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <button onClick={handleUserLogout}>
              <CiLogout />
            </button>
          ) : (
            <Link to={'/login'}>
              <CiLogin />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationSideBar;
