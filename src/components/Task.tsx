import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdDone } from "react-icons/md";
import { Tasks } from "../models/Tasks";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

type Props = {
  taskData: Tasks;
  allTasks: Tasks[];
  setAllTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
};

const Task = ({ taskData, allTasks, setAllTasks }: Props) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(taskData.task);

  const handleEdit = () => {
    isDone
      ? alert("Task cannot be edited after completion")
      : setCanEdit(!canEdit);
  };

  const handleChanges = (id:number) => {
    setAllTasks(
      allTasks.map((data) =>
        (data.id === id ? {...data, task:editTask} : data)
      )
    );
    setCanEdit(!canEdit);
  };

  const handleDelete = (id: number) =>
    setAllTasks(allTasks.filter((data) => data.id !== id));

  const handleDone = () => {
    canEdit ? alert("Save changes first") : setIsDone(!isDone);
  };

  return (
    <>
      <div
        className={`h-14 md:h-16 rounded-md px-2 w-80 md:w-96 flex-grow lg:flex-grow-0 flex items-center justify-between text-md md:text-xl ${
          isDone ? "bg-yellow-800" : "bg-yellow-600"
        }`}
      >
        {canEdit ? (
          
            <input
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="rounded-md w-48 outline-none pl-2 py-1 font-semibold text-lg"
            />
        ) : (
          <p
            className={`font-semibold ${
              isDone ? "text-[#c4c1c1] line-through" : ""
            }`}
          >
            {taskData.task}
          </p>
        )}
        <div className="flex gap-3">
          {canEdit ? (
            <IoMdAdd
              onClick={() => handleChanges(taskData.id)}
              className=" cursor-pointer"
            />
          ) : (
            <AiFillEdit onClick={handleEdit} className="cursor-pointer" />
          )}
          <MdDelete
            onClick={() =>
              canEdit
                ? alert("Task cannot be deleted while editing")
                : handleDelete(taskData.id)
            }
            className=" cursor-pointer"
          />
          <MdDone onClick={handleDone} className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Task;
