import { Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  padding: 10px 0px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding:20px ;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
    toDos: string[];
    boardId:string;
}


function Board({toDos, boardId} : IBoardProps){
    return(
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic, snapshot)=>
                /* isDraggingOver: boolean
                현재 선택한 Draggable이 특정 Droppable위에 드래깅 되고 있는지 여부 확인

                draggingOverWith: ?DraggableId
                Droppable 위로 드래그하는 Draggable ID

                draggingFromThisWith: ?DraggableId
                현재 Droppable에서 벗어난 드래깅되고 있는 Draggable ID

                isUsingPlaceholder: boolean
                placeholder가 사용되고 있는지 여부 */

                <Area isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref = {magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((todo, index) => 
                    <DragabbleCard key = {todo} todo={todo} index={index}/>
                    )}
                {magic.placeholder}
                {/* Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용합니다.
                Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지하기 위해 필요합니다.
                Draggable 노드의 형제로 렌더링하는 것이 좋습니다. */}
                </Area>
                }
                
            </Droppable>   
        </Wrapper>

    )
}

export default Board;