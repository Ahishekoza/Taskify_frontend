import {
  getMonthlyTaskCompletionCount,
  getYearlyTasksCont,
} from "@/api/taskApi";

import { useAuth } from "@/context/AuthContextProvider";
import { useEffect, useState } from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MonthlyTaskCounts from "@/components/MonthlyTaskCounts";
import YearlyTaskCount from "@/components/YearlyTaskCount";


const TaskOverViewPage = () => {
  const { loggedInUser_Info } = useAuth();
  
  const [monthlyTaskCounts, setMonthlyTaskCounts] = useState({
    completed: 0,
    nonCompleted: 0,
  });

  const [yearlyTaskCounts, setYearlyTaskCounts] = useState([]);

  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // Monthly task counts
  useEffect(() => {
    const fetch = async () => {
      const result = await getMonthlyTaskCompletionCount(
        year,
        month,
        loggedInUser_Info?.auth_id
      );
      setMonthlyTaskCounts(result);
    };

    fetch();
  }, [year, month, loggedInUser_Info?.auth_id]);

  // Yearly task counts
  useEffect(() => {
    const fetchTaskCounts = async () => {
      try {
        const response = await getYearlyTasksCont(
          year,
          loggedInUser_Info?.auth_id
        );
        setYearlyTaskCounts(response);
      } catch (error) {
        console.error("Error fetching task counts:", error);
      }
    };

    fetchTaskCounts();
  }, [year, loggedInUser_Info?.auth_id]);

  

  //   Bar takes two arguments data and options
  return (
    <div className="flex flex-col gap-4 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <MonthlyTaskCounts taskCounts={monthlyTaskCounts} year={year} month={month}/>
      <YearlyTaskCount taskCounts={yearlyTaskCounts} year={year}/>
    </div>
  );
};

export default TaskOverViewPage;

