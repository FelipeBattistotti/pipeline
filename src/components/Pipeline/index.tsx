'use client'

import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';

import './react-grid-layout.css';
import './react-resizable.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

type CardType = {
  id: string;
  content: string;
};

type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

type ColumnProps = {
  column: ColumnType;
  moveCardToColumn: (cardId: string, sourceColumnId: string, destinationColumnId: string, position: number) => void;
};

type CardProps = {
  card: CardType;
  sourceColumnId: string;
  position: number;
};

const initialColumns: ColumnType[] = [
  {
    id: 'col1',
    title: 'To Do',
    cards: [
      { id: 'card1', content: 'Tarefa 1' },
      { id: 'card2', content: 'Tarefa 2' },
      { id: 'card3', content: 'Tarefa 3' },
      { id: 'card4', content: 'Tarefa 4' },
      { id: 'card5', content: 'Tarefa 5' },
    ],
  },
  {
    id: 'col2',
    title: 'In Progress',
    cards: [],
  },
  {
    id: 'col3',
    title: 'Done',
    cards: [],
  },
];

const Pipeline: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);

  const moveCardToColumn = (cardId: string, sourceColumnId: string, destinationColumnId: string, position: number) => {
    setColumns(prevColumns => {
      const sourceColumn = prevColumns.find(column => column.id === sourceColumnId);
      const destinationColumn = prevColumns.find(column => column.id === destinationColumnId);
      if (!sourceColumn || !destinationColumn) return prevColumns;

      const cardIndex = sourceColumn.cards.findIndex(c => c.id === cardId);
      if (cardIndex === -1) return prevColumns;

      const cardToMove = sourceColumn.cards[cardIndex];
      const newCard = { ...cardToMove };
      destinationColumn.cards.splice(position, 0, newCard);
      sourceColumn.cards.splice(cardIndex, 1);

      return [...prevColumns];
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 3 }}
        rowHeight={150}
        containerPadding={[32, 32]}
      >
        {columns.map((column, index) => (
          <div key={column.id} data-grid={{ w: 1, h: 3, x: index, y: 0, static: true }}>
            <Column column={column} moveCardToColumn={moveCardToColumn} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </DndProvider>
  );
};

const Column: React.FC<ColumnProps> = ({ column, moveCardToColumn }) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item: { id: string; type: string; sourceColumnId: string }, monitor) => {
      const position = monitor.getClientOffset()?.y;
      moveCardToColumn(item.id, item.sourceColumnId, column.id, position || 0);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`flex flex-col p-4 space-y-4 bg-gray-200 rounded-lg`}>
      <h2 className="text-xl font-bold">{column.title}</h2>
      <div className="flex flex-col space-y-2">
        {column.cards.map((card, index) => (
          <Card key={card.id} card={card} sourceColumnId={column.id} position={index} />
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ card, sourceColumnId, position }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, type: 'CARD', sourceColumnId },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 bg-white rounded shadow ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ cursor: 'move' }}
    >
      {card.content}
    </div>
  );
};

export default Pipeline;