import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "./Task";

const List = React.memo(({ todoData, setTodoData, handleClick }) => {
	// 드래그 가능한 개별 항목 정의 컴포넌트
	const SortableItem = ({data})  => {
		const { attributes, listeners, setNodeRef, transform, transition, isDragging 
    } = useSortable({ id: data.id }); // 각 항목에 드래그 앤 드롭 기능 추가

		// 스타일
		const style = {
			transform: CSS.Transform.toString(transform),
			transition,
		};

		return (
			<div
			ref={setNodeRef} // 드래그 가능한 DOM 노드 
      {...attributes} // 드래그 가능한 속성 추가
      {...listeners} // 드래그 및 드롭 이벤트 리스너 추가 
			style={style}
			>
				<Task 
						key={data.id}
						id={data.id}
						title={data.title}
						handleClick={handleClick}
						data={data}
						todoData={todoData}
						setTodoData={setTodoData}
						isDragging={isDragging}
					/>
			</div>
		)
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
});


export default List
