import { Outlet } from "react-router-dom";
import NavigationSideBar from "../components/NavigationSideBar";

const BasicLayout = () => {
  return (
    <div className=" w-full h-full flex  bg-indigo-200">
      <div className=" md:w-1/4 lg:w-1/6 bg-slate-900 shadow-lg text-white border-r-2 rounded-r-lg md:rounded-none border-neutral-400  min-h-screen">
        <NavigationSideBar />
      </div>
      <div className=" md:w-3/4 lg:w-5/6 px-2 py-3 md:p-5 flex-1 text_color">
        <Outlet />
      </div>
    </div>
  );
};

export default BasicLayout;
