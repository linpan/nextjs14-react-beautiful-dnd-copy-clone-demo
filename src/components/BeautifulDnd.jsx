import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const initialTasks = [
    {
        id: 1,
        title: "Task 1",
    },
    {
        id: 2,
        title: "Task 2",
    },
    {
        id: 3,
        title: "Task 3",
    },
];

function BeautifulDnd() {
    const [tasks, setTasks] = useState(initialTasks);
    const onDragEnd = (result) => {

    };

    return (
            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="ITEMS" isDropDisabled={true} transition={{ duration: 0 }}>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={"Kiosk"}
                        >
                            {tasks.map((task, index) => (
                                <Draggable
                                    key={task.id}
                                    draggableId={task.id.toString()}
                                    index={index}

                                >
                                    {(provided,snapshot) => (
                                        <React.Fragment>
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={"Item"}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    transform: snapshot.isDragging
                                                        ? provided.draggableProps.style?.transform
                                                        : 'translate(0px, 0px)',
                                                }}
                                            >
                                                {task.title}
                                            </div>
                                            {snapshot.isDragging &&
                                                <div  className={"Item"} style={{ transform: 'none !important' }}>
                                                    {task.title}ddd
                                                </div>}
                                        </React.Fragment>

                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
    );
}

export default BeautifulDnd;