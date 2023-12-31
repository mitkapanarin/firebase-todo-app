import {
  useGetAllTasksQuery,
  useDeleteOneTaskMutation,
  useCreateOneTaskMutation,
  useEditOneTaskMutation,
} from "../store/API/taskAPI";
import { themeSwitch, ThemeTypesEnum } from "../store/Slices/systemSlice";
import TaskModal from "../components/Modal/TaskModal";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NewTaskType, UpdateTaskType } from "../types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import TaskMenu from "@/components/Menu/TaskMenu";
import dayjs from "dayjs";
// import StatusPopover from "@/components/Modal/StatusPopover";

const Tasks = () => {
  const userID = useSelector((state: RootState) => state.user.uid);
  const initialState: NewTaskType = {
    deadline: new Date(),
    description: "",
    label: "",
    status: "",
    title: "",
    userOwner: userID,
  };
  const [newTask, setNewTask] = React.useState<NewTaskType>(initialState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  const { data, isError, isFetching, isLoading } = useGetAllTasksQuery({
    userID,
  });

  const handleDateChange = (date: Date) => {
    setNewTask({
      ...newTask,
      deadline: date,
    });
  };

  const handleStatusChange = (value: string) => {
    setNewTask({
      ...newTask,
      status: value, // Update the 'status' property with the provided value
    });
  };
  
  const [deleteOneTask] = useDeleteOneTaskMutation();
  const [createOneTask] = useCreateOneTaskMutation();
  const [editOneTask] = useEditOneTaskMutation();
  const deleteTask = async (id: string) => {
    toast.promise(deleteOneTask({ id }).unwrap(), {
      pending: "Deleting task...",
      success: "Task deleted successfully",
      error: "Error deleting task",
    });
  };

  const onSubmit = async () => {
    toast
      .promise(createOneTask(newTask).unwrap(), {
        pending: "Creating task...",
        success: "Task created successfully",
        error: "Error creating task",
      })
      .then(() => setNewTask(initialState));
  };

  const onEdit = async (data: UpdateTaskType) => {
    toast.promise(editOneTask(data).unwrap(), {
      pending: "Editing task...",
      success: "Task edited successfully",
      error: "Error editing task",
    });
  };
  const mode: string = useSelector((x: RootState) => x.system.mode);

  const isDarkMode = mode === ThemeTypesEnum.DARK;

  useEffect(() => {
    document.documentElement.classList.toggle(ThemeTypesEnum.DARK, isDarkMode);
  }, [isDarkMode]);

  if (isLoading || isFetching) {
    return <div className={isDarkMode ? 'text-white' : 'text-black'}>Loading please wait....</div>;
  }
  if (isError) {
    return <div className="">Error, please try again</div>;
  }

  console.log("task deadline", data);
  return (
    <div className="my-6">
      <TaskModal
        createTaskFn={onSubmit}
        newTask={newTask}
        handleInput={handleInput}
        handleDateChange={handleDateChange}
        handleStatusChange={handleStatusChange}
      />
      <Table className="border mt-4">
        <TableCaption>A list of your Todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead className="w-[120px]">Deadline</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="text-left">description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((task) => {
            return (
              <TableRow key={task?.id}>
                <TableCell className="font-medium">{task?.title}</TableCell>
                <TableCell>
                  {task?.deadline
                    ? // @ts-ignore
                      dayjs(task?.deadline?.seconds * 1000).format(
                        "dddd, MMMM D, YYYY",
                      )
                    : "No Deadline"}
                </TableCell>
                <TableCell>
                  {task?.status}
                  {/* <StatusPopover/>a */}
                  </TableCell>
                <TableCell className="flex  items-center gap-3">
                  <Button variant="outline" size="sm">
                    {task?.label ? task?.label : "No label"}
                  </Button>
                  {task?.description}
                </TableCell>
                <TableCell>
                  <TaskMenu
                    onDelete={() => deleteTask(task?.id)}
                    taskData={task}
                    onEdit={onEdit}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tasks;
