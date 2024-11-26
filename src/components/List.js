import React from 'react'

export default function List({todoData, setTodoData}) {


	const handleCompleteChange = (id) => {
		let newTodoData = todoData.map(data => {
			if(data.id === id) {
				data.completed = !data.completed; // 현재 completed 상태에서 반대로 되기
			}
			return data;
		})
		setTodoData(newTodoData);
	}


	const handleClick = (id) => {
		let newTodoData = todoData.filter(data => data.id !== id);
		console.log('newTodoData', newTodoData);
	
		setTodoData(newTodoData)
	};

	return (
		<div>
			{todoData.map(data => (
				<div key={data.id}>
					<div className='flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded'>
						<div className='items-center'>
							<input 
							className='mr-2.5'
							type="checkbox" 
							onChange={() => handleCompleteChange(data.id)} // 어떤 id가 클릭이 됐는지 알려줌
							defaultChecked={data.completed}
							/>
							<span className={data.completed ? 'line-through' : undefined}>{data.title}</span>
						</div>
						<div className='items-center'>
							<button className='px-4 py-2 float-right' onClick={() => handleClick(data.id)}>X</button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
