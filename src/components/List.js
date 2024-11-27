import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function List({ todoData, setTodoData }) {
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

	// 드래그 가능한 개별 항목 정의 컴포넌트
	const SortableItem = ({data})  => {
		const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: data.id }); // 각 항목에 드래그 앤 드롭 기능 추가

		// 스타일
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef} // 드래그 가능한 DOM 노드
      style={style} 
      {...attributes} // 드래그 가능한 속성 추가
      {...listeners} // 드래그 및 드롭 이벤트 리스너 추가
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
  	);
	};

  return (
    <SortableContext
      items={todoData.map((data) => data.id)} // 정렬 가능한 ID 배열 전달
      strategy={verticalListSortingStrategy} // 수직 리스트 정렬
    >
      {todoData.map((data) => (
        <SortableItem 
          key={data.id}
          data={data}
        /> // 각 항목에 드래그 기능 추가
      ))}
    </SortableContext>
  );
};
