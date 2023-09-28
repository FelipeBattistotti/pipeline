'use client'

import React, { useState } from 'react';
// import Board from 'react-trello';
import Board from 'react-ui-kanban'

const KanbanBoard = () => {
  const [data, setData] = useState({
    "lanes": [
      {
        "id": "PLANNED",
        "title": "Planned Tasks",
        "label": "20/70",
        "style": {"width": 280},
        "cards": [
          {
            "id": "Milk",
            "title": "Buy milk",
            "label": "15 mins",
            "description": "2 Gallons of milk at the Deli store"
          },
          {
            "id": "Plan2",
            "title": "Dispose Garbage",
            "label": "10 mins",
            "description": "Sort out recyclable and waste as needed"
          },
          {
            "id": "Plan3",
            "title": "Write Blog",
            "label": "30 mins",
            "description": "Can AI make memes?"
          },
          {
            "id": "Plan4",
            "title": "Pay Rent",
            "label": "5 mins",
            "description": "Transfer to bank account"
          }
        ]
      },
      {
        "id": "WIP",
        "title": "Work In Progress",
        "label": "10/20",
        "style": {"width": 280},
        "cards": [
          {
            "id": "Wip1",
            "title": "Clean House",
            "label": "30 mins",
            "description": "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses"
          }
        ]
      },
      {
        "id": "BLOCKED",
        "title": "Blocked",
        "label": "0/0",
        "style": {"width": 280},
        "cards": []
      },
      {
        "id": "COMPLETED",
        "title": "Completed",
        "style": {"width": 280},
        "label": "2/5",
        "cards": [
          {
            "id": "Completed1",
            "title": "Practice Meditation",
            "label": "15 mins",
            "description": "Use Headspace app"
          },
          {
            "id": "Completed2",
            "title": "Maintain Daily Journal",
            "label": "15 mins",
            "description": "Use Spreadsheet for now"
          }
        ]
      },
      {
        "id": "REPEAT",
        "title": "Repeat",
        "style": {"width": 280},
        "label": "1/1",
        "cards": [
          {
            "id": "Repeat1",
            "title": "Morning Jog",
            "label": "30 mins",
            "description": "Track using fitbit"
          }
        ]
      },
      {
        "id": "ARCHIVED",
        "title": "Archived",
        "style": {"width": 280},
        "label": "1/1",
        "cards": [
          {
            "id": "Archived1",
            "title": "Go Trekking",
            "label": "300 mins",
            "description": "Completed 10km on cycle"
          }
        ]
      },
      {
        "id": "ARCHIVED2",
        "title": "Archived2",
        "style": {"width": 280},
        "label": "1/1",
        "cards": [
          {
            "id": "Archived2",
            "title": "Go Jogging",
            "label": "300 mins",
            "description": "Completed 10km on cycle"
          }
        ]
      },
      {
        "id": "ARCHIVED3",
        "title": "Archived3",
        "style": {"width": 280},
        "label": "1/1",
        "cards": [
          {
            "id": "Archived3",
            "title": "Go Cycling",
            "label": "300 mins",
            "description": "Completed 10km on cycle"
          }
        ]
      }
    ]
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

  // return <Board data={data} draggable handleDragEnd={handleDragEnd} />;
  return <Board data={data} />
};

export default KanbanBoard;