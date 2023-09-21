'use client'

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type ItemType = {
  id: string;
  content: string;
};

type ColumnType = {
  id: string;
  title: string;
  items: ItemType[];
};

type ColumnsType = {
  [key: string]: ColumnType;
};

const initialColumns: ColumnsType = {
  column1: {
    id: 'column1',
    title: 'To Do',
    items: [
      { id: 'item1', content: 'Tarefa 1' },
      { id: 'item2', content: 'Tarefa 2' },
    ],
  },
  column2: {
    id: 'column2',
    title: 'Done',
    items: [],
  },
};

const Pipeline = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newItems = Array.from(startColumn.items);
      const [movedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, movedItem);

      const newColumn = { ...startColumn, items: newItems };

      setColumns(prev => ({ ...prev, [newColumn.id]: newColumn }));
    } else {
      const startItems = Array.from(startColumn.items);
      const [movedItem] = startItems.splice(source.index, 1);
      const finishItems = Array.from(finishColumn.items);
      finishItems.splice(destination.index, 0, movedItem);

      setColumns(prev => ({
        ...prev,
        [source.droppableId]: { ...startColumn, items: startItems },
        [destination.droppableId]: { ...finishColumn, items: finishItems },
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex">
        {Object.values(columns).map(column => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className="flex-1 p-4 space-y-4 bg-gray-200"
                {...provided.droppableProps}
              >
                <h2 className="text-xl font-bold">{column.title}</h2>
                {column.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 mb-2 bg-white rounded shadow"
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
  );
};

export default Pipeline;