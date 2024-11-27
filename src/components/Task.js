import React, { useState } from 'react'

const Task = React.memo(({
	id, title, todoData, setTodoData, isDragging, data, handleClick
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);

	// 체크박스 부분
	const handleCompleteChange = (id) => {
    const newTodoData = todoData.map((data) =>
      data.id === id ? { ...data, completed: !data.completed } : data
    );
    setTodoData(newTodoData);
		localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

	
	const handleEditChange = (event) => {
		setEditedTitle(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		let newTodoData = todoData.map((data) => {
			if (data.id === id) {
				return { ...data, title: editedTitle };
			}
			return data
		})
		setTodoData(newTodoData)
		localStorage.setItem('todoData', JSON.stringify(newTodoData));
		setIsEditing(false)
	}



	if(isEditing) {
		return(
			<div
				className="bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded"> 
				<div className="items-center">
					<form onSubmit={handleSubmit}>
						<input
							value={editedTitle}
							onPointerDown={(e) => e.stopPropagation()}
							onChange={handleEditChange}
							className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
						/>
					</form>
				</div>
				<div>
					<button 
						onPointerDown={(e) => e.stopPropagation()}
						onClick={handleSubmit}
						className="px-4 py-2"
						type='submit'
					>save</button>
					<button
						className="px-4 py-2 float-right"
						onPointerDown={(e) => e.stopPropagation()}
						onClick={() => setIsEditing(false)}>
						X
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div
				className= {`${isDragging ? "bg-gray-300" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
			> 
				<div className="items-center">
					<input
						className="mr-2.5"
						type="checkbox"
						onPointerDown={(e) => e.stopPropagation()}
						onChange={() => handleCompleteChange(data.id)}
						checked={data.completed}
					/>
					<span className={data.completed ? "line-through" : undefined}>
						{data.title}
					</span>
				</div>
				<div>
					<button
						className="px-4 py-2"
						onPointerDown={(e) => e.stopPropagation()}
						onClick={() => setIsEditing(true)}
					>edit</button>
					<button
						className="px-4 py-2 float-right"
						onPointerDown={(e) => e.stopPropagation()}
						onClick={() => handleClick(data.id)}>
						X
					</button>
				</div>
			</div>
		)
	}
});

export default Task
