/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { stringToBoolean } from "@/constant";
// eslint-disable-next-line no-unused-vars
import { useAuth } from "@/context/AuthContextProvider";
import {
  createSubTask,
  deleteSubTodo,
  getAllTasks,
  updateSubTodo,
} from "@/api/taskApi";
// eslint-disable-next-line no-unused-vars
import { useTasks } from "@/context/TaskContextProvider";
import { useToast } from "./ui/use-toast";

const SubTodoCard = ({ taskName, task_id, subTodo }) => {
  const { toast } = useToast();

  const { loggedInUser_Info } = useAuth();
  const { setTasks } = useTasks();
  const [formData, setFormData] = useState({
    content: subTodo?.content || "",
    completed: String(subTodo?.completed) || "false",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (e?.nativeEvent?.submitter?.id === "create_updatetask") {
      const completed = stringToBoolean(formData?.completed);

      if (subTodo) {
        response = await updateSubTodo(
          task_id,
          subTodo?._id,
          formData?.content,
          completed,
          loggedInUser_Info?.auth_id
        );
        toast({
          color: "bg-teal-700",
          description: "SubTodo Updated successfully !",
        });
      } else {
        response = await createSubTask(
          task_id,
          formData?.content,
          completed,
          loggedInUser_Info?.auth_id
        );
        toast({
          color: "bg-green-700",
          description: "SubTodo Created successfully !",
        });
      }
    } else if (e?.nativeEvent?.submitter?.id === "delete_subtask") {
      response = await deleteSubTodo(
        task_id,
        subTodo?._id,
        loggedInUser_Info?.auth_id
      );
      toast({
        variant: "destructive",
        description: "SubTodo Delete successfully !",
      });
    }

    if (response?._id || response === "Deleted successfully!") {
      const updatedTasks = await getAllTasks(loggedInUser_Info?.auth_id, 1);
      setTasks(updatedTasks?.tasks);
    }
  };

  const handleStatusChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      completed: value,
    }));
  };

  const text_alignment = subTodo ? "text-left" : "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={` block mt-4 ${text_alignment} text-ellipsis  whitespace-nowrap overflow-x-hidden hover:bg-transparent h-full w-full rounded-lg border bg-transparent  border-gray-700 p-4 hover:border-pink-600`}
        >
          {subTodo ? subTodo?.content : " Divide Your Task, Create SubTasks"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[455px]">
        <DialogHeader>
          <DialogTitle>Task : {taskName}</DialogTitle>
          <DialogDescription>
            {subTodo
              ? "Make Change in your subtask and complete it."
              : "Create a subTask to divide your work as per the priority"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Write Your SubTask Content here."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <RadioGroup
                value={formData.completed}
                onValueChange={handleStatusChange}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="r1" />
                  <Label htmlFor="r1">Not Completed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="r2" />
                  <Label htmlFor="r2">Completed</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter className={"flex justify-between items-center"}>
            {subTodo && (
              <DialogClose>
                <Button id="delete_subtask" type="submit" variant="destructive">
                  Delete
                </Button>
              </DialogClose>
            )}
            <DialogClose>
              <Button id="create_updatetask" type="submit">
                {subTodo ? "Update" : "Create"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubTodoCard;
