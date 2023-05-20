import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import styled from "styled-components";


const Card = styled.div<{isDragging:boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "#c1dbd5":  props.theme.cardColor};
  box-shadow: ${props=> props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)":"none"} ;
`;  

interface IDragabbleCardProps {
    todo : string;
    index : number;
}

function DragabbleCard({todo, index} : IDragabbleCardProps){
    return(
        <Draggable key = {todo} draggableId={todo} index={index} > 
        {/* 여기서 key와 draggableId는 같아야함 */}
            {(magic, snapshot) => 
            <Card  
                isDragging = {snapshot.isDragging}
                ref={magic.innerRef} 
                {...magic.draggableProps} 
                {...magic.dragHandleProps}>
                {todo}
            </Card>}
        </Draggable>

    )
}

export default React.memo(DragabbleCard)
/* React.memo

React.memo는 고차 컴포넌트(Higher Order Component)입니다.
컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, React.memo를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다. 즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다.

React.memo는 props 변화에만 영향을 줍니다. React.memo로 감싸진 함수 컴포넌트 구현에 useState, useReducer 또는 useContext 훅을 사용한다면, 여전히 state나 context가 변할 때 다시 렌더링됩니다.
이 메서드는 오직 성능 최적화를 위하여 사용됩니다. 렌더링을 “방지”하기 위하여 사용하지 마세요. 버그를 만들 수 있습니다.

DraggableCard에게 동일한 index와 동일한 todo prop을 받으면 리랜더링을 하지 않도록 하기 위함이다. */