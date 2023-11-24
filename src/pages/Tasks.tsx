import {
  useGetAllTasksQuery,
  useDeleteOneTaskMutation,
  useCreateOneTaskMutation,
} from "../store/API/taskAPI";
import TaskModal from "../components/Modal/TaskModal";
import { toast } from "react-toastify";
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
} from "@/components/ui/table";
import ConfirmModal from "@/components/Modal/ConfirmModal";

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
    return <div className="text-black">Loading please wait....</div>;
  }
  if (isError) {
    return <div className="">Error, please try again</div>;
  }
  return (
    <div className="row">
      {/* <TaskModal
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
      </TaskModal> */}

      <TaskModal
        title="Create Task"
        button={<button>jsdchjkbsd</button>}
        onConfirm={onSubmit}
      />

      {/* {data?.map((task) => {
        return <Task key={task.id} {...task} deleteTask={deleteTask} />;
      })} */}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((task) => {
            console.log(task);
            return (
              <TableRow
                style={{
                  backgroundColor: "black",
                }}
                key={task.id}
              >
                <TableCell className="font-medium ">{task.status}</TableCell>
                <TableCell>{task.deadline}</TableCell>
                <TableCell className="text-right">{task.title}</TableCell>
                <TableCell className="text-right">{task.description}</TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <ConfirmModal deleteFn={() => deleteTask(task?.id)} />
                  {/* <button onClick={() => deleteTask(task?.id)} className="btn">
                    Delete
                  </button> */}
                  <button className="btn">Edit</button>
                </TableCell>
              </TableRow>
            );
          })}
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
