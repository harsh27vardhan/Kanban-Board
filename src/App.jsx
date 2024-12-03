import { useState } from 'react'
import './App.css'

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function App() {
  const [stage1, setStage1] = useState([]);
  const [stage2, setStage2] = useState([]);
  const [stage3, setStage3] = useState([]);
  const board = [
    {
      id: "stage1",
      stage: stage1,
      setStage: setStage1
    },
    {
      id: "stage2",
      stage: stage2,
      setStage: setStage2
    },
    {
      id: "stage3",
      stage: stage3,
      setStage: setStage3
    }
  ];
  // Add Task
  // const addTask = (id, value, event) => {
  //   event.preventDefault();
  //   // console.log(e.target[0].value);
  //   console.log(value);
  //   if (id === "formstage1") {
  //     setStage1([...stage1, value]);
  //   }
  //   else if (id === "formstage2") {
  //     setStage2([...stage2, value]);
  //   }
  //   else if (id === "formstage3") {
  //     setStage3([...stage3, value]);
  //   }
  // }

  //Board
  return (
    <div className='Board flex gap-4 min-w-full w-full min-h-full h-full '>
      {board.map(({ id, stage, setStage }, index) => {
        return (<Stage id={id} key={"stage-" + index} addTask={(value, event) => {
          event.preventDefault();
          value === "" ? null : setStage([...stage, value]);
        }}>
          {stage.map((task, index) => (<Item key={"1" + index} value={task} />))}
        </Stage>)
      })}

      {/* <Stage id={"stage1"} addTask={addTask}>
        {stage1.map((task, index) => (<Item key={"1" + index} value={task} />))}
      </Stage>
      <Stage id={"stage2"} addTask={addTask}>
        {stage2.map((task, index) => (<Item key={"2" + index} value={task} />))}
      </Stage>
      <Stage id={"stage3"} addTask={addTask}>
        {stage3.map((task, index) => (<Item key={"3" + index} value={task} />))}
      </Stage> */}
    </div>
  )
}

export default App

const Stage = ({ id, addTask, children }) => {
  return (
    <div className="Stage border rounded flex flex-col gap-4 text-lg font-semibold flex-1 overflow-auto items-center p-4">
      <FormInput handleSubmit={addTask} className="text-center w-[100%] p-2" />
      {children}
    </div>
  )
}

const Item = ({ value }) => {
  return (
    <div className="Item border rounded p-2 w-full text-ellipsis overflow-hidden h-min">
      {value}
    </div>
  )
}

const FormInput = ({ handleSubmit }) => {
  const [input, setInput] = useState("");
  return (
    <form onSubmit={event => {
      handleSubmit(input, event);
      setInput("");
    }} className="w-full">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full p-2 border rounded overflow-hidden text-ellipsis"
      />
    </form>
  )
}