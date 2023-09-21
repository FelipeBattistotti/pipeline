'use client'

import React, { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag, useDrop } from 'react-dnd'

import './react-grid-layout.css'
import './react-resizable.css'

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
  moveCardToColumn: (cardId: string, sourceColumnId: string, destinationColumnId: string) => void;
}

type CardProps = {
  card: CardType;
  sourceColumnId: string;
}

const initialColumns: ColumnType[] = [
  {
    id: 'col1',
    title: 'To Do',
    cards: [
      { id: 'card1', content: 'Tarefa 1' },
      { id: 'card2', content: 'Tarefa 2' },
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

  const moveCardToColumn = (cardId: string, sourceColumnId: string, destinationColumnId: string) => {
    setColumns(prevColumns => {
      const sourceColumn = prevColumns.find(column => column.id === sourceColumnId);
      const destinationColumn = prevColumns.find(column => column.id === destinationColumnId);
      if (!sourceColumn || !destinationColumn) return prevColumns;

      const card = sourceColumn.cards.find(c => c.id === cardId);
      if (!card) return prevColumns;

      sourceColumn.cards = sourceColumn.cards.filter(c => c.id !== cardId);
      destinationColumn.cards = [...destinationColumn.cards, card];

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
          <div
            key={column.id}
            data-grid={{ w: 1, h: 3, x: index, y: 0, static: true }}
          >
            <Column
              column={column}
              moveCardToColumn={moveCardToColumn}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </DndProvider>
  );
};

const Column: React.FC<ColumnProps> = ({ column, moveCardToColumn }) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item: { id: string, type: string, sourceColumnId: string }) => {
      moveCardToColumn(item.id, item.sourceColumnId, column.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`flex flex-col p-4 space-y-4 bg-gray-200 rounded-lg`}>
      <h2 className="text-xl font-bold">{column.title}</h2>
      <div className="flex flex-col space-y-2">
        {column.cards.map(card => (
          <Card key={card.id} card={card} sourceColumnId={column.id} />
        ))}
      </div>
    </div>
  );
}

const Card: React.FC<CardProps> = ({ card, sourceColumnId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, type: 'CARD', sourceColumnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 bg-white rounded shadow ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {card.content}
    </div>
  );
}

export default Pipeline