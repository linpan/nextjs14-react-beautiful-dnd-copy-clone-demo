"use client"
import React from 'react';
import {DragDropContext, Draggable} from 'react-beautiful-dnd';


const Spacex: React.FC = () => {
    const onDragEnd = (result: any) => {
        // 处理拖拽结束逻辑
    };

    return (
      <div className="flex">
          <DragDropContext onDragEnd={onDragEnd}>
              <div className="p-4 border-r">
                  <h2 className="text-lg font-bold">组件库</h2>
                  <Draggable draggableId="draggable-1" index={0}>
                      {(provided, snapshot) => (
                          <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                          >
                              <h4>My draggable1</h4>
                          </div>
                      )}
                  </Draggable>;
                  <Draggable draggableId="draggable-1" index={0}>
                      {(provided, snapshot) => (
                          <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                          >
                              <h4>My draggable2</h4>
                          </div>
                      )}
                  </Draggable>;
                  <Draggable draggableId="draggable-1" index={0}>
                      {(provided, snapshot) => (
                          <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                          >
                              <h4>My draggable3</h4>
                          </div>
                      )}
                  </Draggable>;
              </div>
          </DragDropContext>
      </div>
    );
};

export default Spacex;