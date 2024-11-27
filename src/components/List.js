import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core'; // 드래그 앤 드롭 컨텍스트와 충돌 감지 전략
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'; // 정렬 관련 유틸리티
import { CSS } from '@dnd-kit/utilities'; // 스타일 변환을 위한 유틸리티
import { arrayMove } from '@dnd-kit/sortable'; // 배열 요소 순서 변경 유틸리티

// 개별 드래그 가능한 아이템 컴포넌트
function SortableItem({ id, data, handleCompleteChange, handleClick }) {
  // useSortable 훅을 사용하여 드래그 가능한 속성들을 가져옴
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  // 드래그 시 애니메이션 및 위치 변환을 적용하기 위한 스타일
  const style = {
    transform: CSS.Transform.toString(transform), // 드래그 중 위치 변화
    transition, // 드래그 애니메이션
  };

  return (
    <div
      ref={setNodeRef} // 드래그 가능한 영역의 레퍼런스 설정
      style={style} // 드래그 시 적용할 스타일
      {...attributes} // 기본 드래그 속성
      {...listeners} // 드래그 이벤트 리스너
      className={`${isDragging ? "bg-gray-300" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
    >
			
      <div className="items-center">
        {/* 체크박스로 완료 상태를 토글 */}
        <input
          className="mr-2.5"
          type="checkbox"
					onPointerDown={(e) => e.stopPropagation()}
          onChange={() => handleCompleteChange(data.id)}
          defaultChecked={data.completed}
        />
        {/* 완료된 항목은 취소선 스타일 적용 */}
        <span className={data.completed ? 'line-through' : undefined}>{data.title}</span>
      </div>
      <div className="items-center">
        {/* 삭제 버튼 */}
        <button 
				className="px-4 py-2 float-right" 
				onPointerDown={(e) => e.stopPropagation()}
				onClick={() => {handleClick(data.id);}}>
          X
        </button>
      </div>
    </div>
  );
}

export default function List({ todoData, setTodoData }) {
  // 드래그가 끝났을 때 실행되는 함수
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // 드래그가 시작된 항목과 드래그가 끝난 위치의 항목이 다를 경우에만 실행
    if (active.id !== over.id) {
      setTodoData((items) => {
        // active.id와 over.id를 이용해 기존 배열의 인덱스를 찾음
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // arrayMove를 사용해 항목의 순서를 변경
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter} // 가장 가까운 드롭 영역을 감지
      onDragEnd={handleDragEnd} // 드래그가 끝났을 때 호출
    >
      <SortableContext
        items={todoData.map((item) => item.id)} // 드래그 가능한 아이템의 id 배열
        strategy={verticalListSortingStrategy} // 수직 리스트를 위한 정렬 전략
      >
        {/* todoData 배열의 각 항목을 SortableItem으로 렌더링 */}
        {todoData.map((data) => (
          <SortableItem
            key={data.id} // 고유 id 설정
            id={data.id} // useSortable에 전달할 id
            data={data} // 현재 아이템 데이터
            // 완료 상태를 변경하는 함수
            handleCompleteChange={(id) => {
              const newTodoData = todoData.map((item) => {
                if (item.id === id) item.completed = !item.completed;
                return item;
              });
              setTodoData(newTodoData);
            }}
            // 아이템을 삭제하는 함수
            handleClick={(id) => {
              const newTodoData = todoData.filter((item) => item.id !== id);
              setTodoData(newTodoData);
            }}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
