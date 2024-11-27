import React, {useState, useCallback} from "react"; // react 라이브러리에서 react를 가져오고 Component-> useState 라는 클래스도 가져옴.
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import { closestCorners, DndContext } from '@dnd-kit/core';
import { arrayMove } from "@dnd-kit/sortable";


export default function App() {
	console.log("app component")

	const getTodoDataPos = id => todoData.findIndex((item) => item.id === id)

	const handleDragEnd = event => {
		const {active, over} = event

		if(active.id === over.id) return;
		setTodoData(todoData => {
			const originalPos = getTodoDataPos(active.id);
			const newPos = getTodoDataPos(over.id);

			return arrayMove(todoData, originalPos, newPos);
		})
	}

	const [todoData, setTodoData] = useState([
		{ //test dyd
				id: "1",
				title: "공부하기",
				completed: true
			},
			{
				id: "2",
				title: "청소하기",
				completed: false
			}
	]);
	const [value, setValue] = useState("");

	// 삭제
	const handleClick = useCallback((id) => {
		const newTodoData = todoData.filter((data) => data.id !== id);
		setTodoData(newTodoData);}
	,[todoData]);
	

	const handleSubmit = (e) => {
		e.preventDefault(); // 이벤트 발생시 페이지 리로드를 막아준다.
		
		let newTodo = {
			id: Date.now(), // 유니크한 값
			title: value,
			completed: false,
		};

		// this.setState({ todoData: [...todoData, newTodo ], value: ""}); //전개 연산자를 이용해서, 원래 state의 todoData에, newTodo를 추가해준다.
		setTodoData(prev => [...prev, newTodo]);
		setValue("");
	}

	const handleRemoveClick = () => {
		setTodoData([]);
	}


	return(
		<div className="flex items-center justify-center w-screen h-screen bg-blue-200">
			<div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
				<div className="flex justify-between mb-3 ">
					<h1>TODO LIST</h1>
					<button onClick={handleRemoveClick}> DELETE ALL</button>
				</div>
				<DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
					<List handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}/>	
				</DndContext>
				<Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
			
			</div>
		</div>
	)

}