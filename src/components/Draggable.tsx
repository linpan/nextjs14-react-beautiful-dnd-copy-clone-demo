'use client';

import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

function uuid() {
    return Math.random().toString(16).slice(2);
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const copy = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];


    destClone.splice(droppableDestination.index, 0, {...item, id: uuid()});
    return destClone;
};

const move = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return {
        [droppableSource.droppableId]: sourceClone,
        [droppableDestination.droppableId]: destClone,
    };
};


const ITEMS = [
    {id: uuid(), content: 'Headline'},
    {id: uuid(), content: 'Copy'},
    {id: uuid(), content: 'Image'},
    {id: uuid(), content: 'Slideshow'},
    {id: uuid(), content: 'Quote'},
];

const DragAndDrop: React.FC = () => {
    const [lists, setLists] = useState<{ [key: string]: any[] }>({[uuid()]: []});

    const onDragEnd = (result: any) => {
        const {source, destination} = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            setLists((prev) => ({
                ...prev,
                [destination.droppableId]: reorder(prev[source.droppableId], source.index, destination.index),
            }));
        } else if (source.droppableId === 'ITEMS') {
            alert('Cannot move items from the items list');
            setLists((prev) => ({
                ...prev,
                [destination.droppableId]: copy(ITEMS, prev[destination.droppableId], source, destination),
            }));
        } else {
            setLists((prev) => ({
                ...prev,
                ...move(prev[source.droppableId], prev[destination.droppableId], source, destination),
            }));
        }
    };

    const addList = () => {
        setLists((prev) => ({...prev, [uuid()]: []}));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 shadow-lg">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="p-4 border-r">
                        <Droppable droppableId="ITEMS" isDropDisabled={true}>
                            {(provided) => (
                                <div ref={provided.innerRef}>
                                    {ITEMS.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    <div className="md:col-span-4 bg-white dark:bg-gray-700 shadow-lg p-4 rounded-md">
                        {Object.keys(lists).map((listId) => (
                            <Droppable key={listId} droppableId={listId}>
                                {(provided) => (
                                    <div ref={provided.innerRef}>
                                        {lists[listId].map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                    >
                                                        {item.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>

                </DragDropContext>
            </div>

        </div>

    );
};

export default DragAndDrop;
