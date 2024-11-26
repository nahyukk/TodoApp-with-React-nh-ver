import React from 'react'

export default function List({todoData, setTodoData}) {
	


	const btnStyle = {
		color: "#fff",
		border: "none",
		padding: "5px 9px",
		borderRadius: "50%",
		cursor: "pointer",
		float: "right"
	}


	const handleCompleteChange = (id) => {
		let newTodoData = todoData.map(data => {
			if(data.id === id) {
				data.completed = !data.completed; // 현재 completed 상태에서 반대로 되기
			}
			return data;
		})
		setTodoData(newTodoData);
	}

	const getStyle = (completed) => {
		return {
			padding: "10px",
			borderBottom: "1px #ccc dotted",
			textDecoration: completed ? "line-through" : "none",
		}
	}

	const handleClick = (id) => {
		let newTodoData = todoData.filter(data => data.id !== id);
		console.log('newTodoData', newTodoData);
	
		setTodoData(newTodoData)
	};

	return (
		<div>
			{todoData.map(data => (
				<div style={getStyle(data.completed)} key={data.id}>
					<input 
					type="checkbox" 
					onChange={() => handleCompleteChange(data.id)} // 어떤 id가 클릭이 됐는지 알려줌
					defaultChecked={false}
					/>
						{data.title}
					<button style={btnStyle} onClick={() => handleClick(data.id)}>X</button>
				</div>
			))}
		</div>
	)
}
