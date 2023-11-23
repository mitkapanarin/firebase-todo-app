import React from "react";
import InputField from "./InputField";

const TaskForm = ({
  title,
  deadline,
  status,
  label,
  description,
  handleInput,
}: {
  title: string;
  deadline: string;
  status: string;
  label: string;
  description: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form
      className="w-80"
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <InputField
        label="Task Name"
        onChange={handleInput}
        name="text"
        placeholder="Enter Task Name"
        required
        type="text"
        value={title}
      />
      <InputField
        label="Task deadline"
        onChange={handleInput}
        name="deadline"
        placeholder="Enter Task deadline"
        required
        type="date"
        value={deadline}
      />
      <InputField
        label="Status"
        onChange={handleInput}
        name="status"
        placeholder="Enter Task deadline"
        required
        type="text"
        value="incomplete"
      />
      <InputField
        label="Label"
        onChange={handleInput}
        name="label"
        placeholder="Label"
        required
        type="text"
        value={label}
      />
    </form>
  );
};

export default TaskForm;
