
import { useState, useEffect } from "react";
import "./App.css";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function App() {
  const [stage1, setStage1] = useState([]);
  const [stage2, setStage2] = useState([]);
  const [stage3, setStage3] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const board = [
    { id: "stage1", stage: stage1, setStage: setStage1, heading: "TO-DO" },
    { id: "stage2", stage: stage2, setStage: setStage2, heading: "In Process" },
    { id: "stage3", stage: stage3, setStage: setStage3, heading: "Done" },
  ];

  const moveTask = (item, toParentId) => {
    const fromStage = board.find((b) => b.id === item.parentId);
    const toStage = board.find((b) => b.id === toParentId);

    // Remove item from current stage
    if (fromStage) {
      fromStage.setStage((prev) => prev.filter((task) => task.id !== item.id));
    }

    // Add item to new stage
    if (toStage) {
      toStage.setStage((prev) => [
        ...prev,
        { ...item, parentId: toParentId },
      ]);
    }
  };

  return (
    <div className="Board flex gap-4 min-w-full w-full min-h-full h-full ">
      {board.map(({ id, stage, setStage }, index) => (
        <Stage
          key={`stage-${index}`}
          id={id}
          stage={stage}
          setStage={setStage}
          addTask={(input, event) => {
            event.preventDefault();
            if (!input) return;

            setStage((prev) => [
              ...prev,
              {
                value: input,
                id: generateId(),
                parentId: id,
                history: [],
              },
            ]);
          }}
          moveTask={moveTask}
        >
          {stage.map(({ value, id, parentId, history }) => (
            <Item
              key={id}
              id={id}
              value={value}
              parentId={parentId}
              history={history}
            />
          ))}
        </Stage>
      ))}
    </div>
  );
}

export default App;

const Stage = ({ id, addTask, moveTask, children }) => {
  const onDropFn = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("draggedItem"));
    if (item.parentId !== id) {
      moveTask(item, id);
    }
  };

  return (
    <div
      onDrop={onDropFn}
      onDragOver={(e) => e.preventDefault()}
      className="Stage border rounded flex flex-col gap-4 text-lg font-semibold flex-1 overflow-auto items-center p-4"
    >
      <FormInput handleSubmit={addTask} />
      <div className="flex flex-col gap-2 overflow-auto flex-1 w-full">
        {children}
      </div>
    </div>
  );
};


const Item = ({ id, value, parentId, history }) => {
  const onDragStartFn = (e) => {
    e.dataTransfer.setData(
      "draggedItem",
      JSON.stringify({ id, value, parentId, history })
    );
  };

  return (
    <div
      draggable
      onDragStart={onDragStartFn}
      className="Item border rounded p-2 w-full truncate min-h-fit"
    >
      {value}
    </div>
  );
};


const FormInput = ({ handleSubmit }) => {
  const [input, setInput] = useState("");
  return (
    <form
      onSubmit={(event) => {
        handleSubmit(input, event);
        setInput("");
      }}
      className="w-full"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded overflow-hidden text-ellipsis"
      />
    </form>
  );
};
