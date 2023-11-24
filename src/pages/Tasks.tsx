import {
  useGetAllTasksQuery,
  useDeleteOneTaskMutation,
  useCreateOneTaskMutation,
} from "../store/API/taskAPI";
import Task from "../components/Tasks/Task";
import { toast } from "react-toastify";
import TaskModal from "../components/Modal/TaskModal";
import React from "react";
import TaskForm from "../components/Form/TaskForm";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NewTaskType } from "../types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const Tasks = () => {
  const userID = useSelector((state: RootState) => state.user.uid);
  const initialState: NewTaskType = {
    deadline: "",
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
  const [deleteOneTask] = useDeleteOneTaskMutation();
  const [createOneTask] = useCreateOneTaskMutation();
  const deleteTask = async (id: string) => {
    toast.promise(deleteOneTask({ id }).unwrap(), {
      pending: "Deleting task...",
      success: "Task deleted successfully",
      error: "Error deleting task",
    });
  };

  const onSubmit = () => {
    toast
      .promise(createOneTask(newTask).unwrap(), {
        pending: "Creating task...",
        success: "Task created successfully",
        error: "Error creating task",
      })
      .then(() => setNewTask(initialState));
  };

  if (isLoading || isFetching) {
    return <div className="">Loading please wait....</div>;
  }
  if (isError) {
    return <div className="">Error, please try again</div>;
  }
  return (
    <div className="row">
      <TaskModal
        button={
          <div className="flex justify-center">
            <button className="btn btn-primary bg-blue-700 p-2 rounded-full mt-5 mx-auto">
              Create Task
            </button>
          </div>
        }
        title="Create Task"
        onCancel={() => console.log("cancel")}
        onClose={() => console.log("close")}
        onConfirm={onSubmit}
      >
        <TaskForm {...newTask} handleInput={handleInput} />
      </TaskModal>

      {/* {data?.map((task) => {
        return <Task key={task.id} {...task} deleteTask={deleteTask} />;
      })} */}
      <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell className="text-right">{task.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
};

export default Tasks;
