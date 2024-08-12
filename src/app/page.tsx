"use client";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";


interface DraggableItem {
    id: string;
    content: string;
}
function handleDragging() {
    console.log("Dragging item:", 1);
}

export default function Home() {
    const [items, setItems] = useState<DraggableItem[]>([
        { id: "draggable-1", content: "My draggable1" },
        { id: "draggable-2", content: "My draggable2" },
        { id: "draggable-3", content: "My draggable3" },
    ]);

    const [schedule, setSchedule] = useState<DraggableItem[]>([]);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId === "droppable-1" && result.destination.droppableId === "droppable-2") {
            // 从组件库拖拽到课程表
            console.log("source", result.source);
            const [removed] = items.splice(result.source.index, 1);
            setSchedule([...schedule, removed]);
        } else if (result.source.droppableId === "droppable-2" && result.destination.droppableId === "droppable-2") {
            // 从课程表拖拽到其他位置
            const [removed] = schedule.splice(result.source.index, 1);
            schedule.splice(result.destination.index, 0, removed);
            setSchedule([...schedule]);
        }
    };

    return (
        <div className="h-full bg-gray-100 dark:bg-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 shadow-lg">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="p-4 border-r">
                        <h2 className="text-lg font-bold">组件库</h2>
                        <Droppable droppableId="droppable-1" isDropDisabled={true}>
                            {(provided, snapshot) => (

                                    <div
                                        className={`p-4 bg-white dark:bg-gray-700 shadow-lg rounded-md`}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {items.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <>
                                                        <div
                                                            className="p-2 my-2 mb-2 bg-yellow-600 shadow-md rounded-md"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <h4>{item.content}</h4>
                                                        </div>
                                                        {
                                                            snapshot.isDragging && (
                                                                <>
                                                                    <div className="p-2 my-2 mb-2 bg-yellow-600 shadow-md rounded-md">
                                                                        <h4>Clone WHEN Dragging.</h4>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                            )}

                        </Droppable>
                    </div>
                    <div className="md:col-span-4 bg-white dark:bg-gray-700 shadow-lg p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-4 text">Curriculum Schedule</h2>
                        <Droppable droppableId="droppable-2">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {schedule.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    className="p-2 my-2 mb-2 bg-yellow-600 shadow-md rounded-md"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                <h4>{item.content}</h4>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>

        </div>
    );
}
