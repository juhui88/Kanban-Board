import React from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoState } from "./atom";
import DragabbleCard from "./Components/DragabbleCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;


function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      // 1) Delete item on source.index
      toDosCopy.splice(source.index, 1);
      // 2) Put back the item on the destination.index
      toDosCopy.splice(destination?.index, 0, draggableId); 
      // 아무것도 지우지 않고 = 0 (1 넣으면 하나 지워지고 넣어짐)
      return toDosCopy;
    });
  }
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic)=>
              <Board ref = {magic.innerRef} {...magic.droppableProps}>
                {toDos.map((todo, index) => 
                <DragabbleCard key = {todo} todo={todo} index={index}/>
                )}
                {magic.placeholder}
                {/* Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용합니다.
                Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지하기 위해 필요합니다.
                Draggable 노드의 형제로 렌더링하는 것이 좋습니다. */}
              </Board>
              }
              
            </Droppable>
          </Boards>
        </Wrapper>
        
      </DragDropContext>
    </div>
);
}

export default App;
