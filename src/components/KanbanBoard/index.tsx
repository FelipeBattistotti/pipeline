'use client'

import React, { useState } from 'react';
import Board from 'react-trello';

const KanbanBoard = () => {
  const [data, setData] = useState({
    lanes: [
      {
        id: 'lane1',
        title: 'To do',
        cards: [
          {
            id: 'card1',
            title: 'Task 1',
            description: 'This is the first task',
            label: '5 mins',
          },
          {
            id: 'card2',
            title: 'Task 2',
            description: 'This is the second task',
            label: '10 mins',
          },
        ],
      },
      {
        id: 'lane2',
        title: 'In progress',
        cards: [
          {
            id: 'card3',
            title: 'Task 3',
            description: 'This is the third task',
            label: '15 mins',
          },
        ],
      },
      {
        id: 'lane3',
        title: 'Done',
        cards: [
          {
            id: 'card4',
            title: 'Task 4',
            description: 'This is the fourth task',
            label: '20 mins',
          },
        ],
      },
    ],
  });

  const handleDragEnd = (cardId: string, sourceLaneId: string, targetLaneId: string) => {
    const sourceLaneIndex = data.lanes.findIndex((lane) => lane.id === sourceLaneId);
    const targetLaneIndex = data.lanes.findIndex((lane) => lane.id === targetLaneId);
    const cardIndex = data.lanes[sourceLaneIndex].cards.findIndex((card) => card.id === cardId);

    const card = data.lanes[sourceLaneIndex].cards[cardIndex];
    const newSourceLane = {
      ...data.lanes[sourceLaneIndex],
      cards: [...data.lanes[sourceLaneIndex].cards.slice(0, cardIndex), ...data.lanes[sourceLaneIndex].cards.slice(cardIndex + 1)],
    };
    const newTargetLane = {
      ...data.lanes[targetLaneIndex],
      cards: [...data.lanes[targetLaneIndex].cards, card],
    };

    setData({
      ...data,
      lanes: [
        ...data.lanes.slice(0, sourceLaneIndex),
        newSourceLane,
        ...data.lanes.slice(sourceLaneIndex + 1, targetLaneIndex),
        newTargetLane,
        ...data.lanes.slice(targetLaneIndex + 1),
      ],
    });
  };

  return <Board data={data} draggable handleDragEnd={handleDragEnd} />;
};

export default KanbanBoard;