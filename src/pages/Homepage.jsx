/* eslint-disable react/no-unescaped-entities */
import PaginationSelector from "@/components/PaginationSelector";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContextProvider";
import { useTasks } from "@/context/TaskContextProvider";
import { ReloadIcon } from "@radix-ui/react-icons";

import { FaRegUserCircle } from "react-icons/fa";

const Homepage = () => {
  const { isAuthenticated, loggedInUser_Info, isloading } = useAuth();
  const { tasks, isLoadingTask, pagination_Info, setPagination_Info } = useTasks();

    const handlePageChange = (page) => {
      setPagination_Info(prev => ({ ...prev, page }));
    };

  if (isloading) {
    return (
      <div className="h-full flex justify-center items-center">
        <ReloadIcon className="w-20 h-20 animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? (
    <div className="h-full flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center">
        <span className="text-2xl font-medium text-indigo-800">
          Make Each Day Count!
        </span>

        {/* @TODO:-- create a setting page show that user info can be manuiplicated */}
        <span className="  flex items-center cursor-pointer gap-2 text-xl">
          <FaRegUserCircle />
          {loggedInUser_Info?.email}
        </span>
      </div>
      <div className=" min-h-[70%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
         {isLoadingTask ? (
          <div className="h-full flex justify-center items-center col-span-full">
            <ReloadIcon className="w-20 h-20 animate-spin" />
          </div>
        ) : (
          // ---if Tasks length is zero show a message for creating your first task
          tasks.map((task) => (
            <div key={task?._id}>
              <TaskCard key={task?._id} task={task} />
            </div>
          ))
        )}
      </div>
      <div className=" flex justify-center items-center">
        <PaginationSelector
          pagination_Info={pagination_Info}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center gap-10 md:h-screen h-[50%]">
      <div className="text-2xl font-semibold md:text-center flex flex-col gap-2">
        <span>Let's make your day productive!</span>
        <span>Click on the button to create your task.</span>
      </div>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="text-xl">
            Let's Start
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>To create a task you need to login first!</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Homepage;
