"use client";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import BeautifulDnd from "@/components/BeautifulDnd";


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

            <h1>BeautifulDnd Demo</h1>
            <BeautifulDnd/>
        </div>
    );
}
