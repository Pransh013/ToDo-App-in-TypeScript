import React, { useState } from "react";
import Task from "./components/Task";
import { Tasks } from "./models/Tasks";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [allTasks, setAllTasks] = useState<Tasks[]>([]);

  const handleAddTask = () => {
    if (task) {
      setAllTasks([...allTasks, { id: Date.now(), task: task, isDone: false }]);
      setTask("");
    } else {
      alert("Enter some task first");
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-col gap-10 items-center py-4">
      <p className="text-4xl text-white border-b-2 pb-1 border-white">
        SnapTask
      </p>
      <div className="w-11/12 md:w-3/5 xl:w-1/3 bg-white flex items-center py-1 px-2 gap-2 rounded-lg">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          className="flex-grow outline-none pl-2 text-lg"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-black text-white border-2 border-black w-11 h-11 rounded-full hover:text-black hover:bg-white duration-200"
          onClick={handleAddTask}
        >
          ADD
        </button>
      </div>
      <div className="flex flex-wrap gap-10 px-6 py-4 sm:px-10 justify-center items-center overflow-y-scroll cws">
        {allTasks.map((data) => (
          <Task
            taskData={data}
            key={data.id}
            allTasks={allTasks}
            setAllTasks={setAllTasks}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
