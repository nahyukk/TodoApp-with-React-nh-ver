import React from 'react'

const Task = ({
	todoData, setTodoData, isDragging, data
}) => {
	// 체크박스 부분
	const handleCompleteChange = (id) => {
    const newTodoData = todoData.map((data) =>
      data.id === id ? { ...data, completed: !data.completed } : data
    );
    setTodoData(newTodoData);
  };

	// 삭제
  const handleClick = (id) => {
    const newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

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
      <button
        className="px-4 py-2 float-right"
				onPointerDown={(e) => e.stopPropagation()}
        onClick={() => handleClick(data.id)}
      >
        X
      </button>
    </div>
	)
}

export default Task
