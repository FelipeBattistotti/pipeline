// import Pipeline from '@/components/Pipeline'
// import KanbanBoard from '@/components/KanbanBoard'

// pages/App.tsx

'use client'

import React, { useState, useEffect } from 'react'
import Board from 'react-ui-kanban'
// import './App.css'

const data = {
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
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "2 Gallons of milk at the Deli store"
        },
        {
          "id": "Plan2",
          "title": "Dispose Garbage",
          "label": "10 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Sort out recyclable and waste as needed"
        },
        {
          "id": "Plan3",
          "title": "Write Blog",
          "label": "30 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Can AI make memes?"
        },
        {
          "id": "Plan4",
          "title": "Pay Rent",
          "label": "5 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
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
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
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
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Use Headspace app"
        },
        {
          "id": "Completed2",
          "title": "Maintain Daily Journal",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
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
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
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
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
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
          "id": "Archived1",
          "title": "Go Trekking",
          "label": "300 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
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
          "id": "Archived1",
          "title": "Go Trekking",
          "label": "300 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Completed 10km on cycle"
        }
      ]
    }
  ]
}

interface CardEvent {
  type: string;
  laneId: string;
  card?: any; // Você deve especificar uma interface adequada para o "card"
  cardId?: string;
}

const handleDragStart = (cardId: string, laneId: string) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId: string, sourceLaneId: string, targetLaneId: string) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}

const Home: React.FC = () => {
  const [boardData, setBoardData] = useState<any>({ lanes: [] }) // Atualize o tipo conforme necessário
  const [eventBus, setEventBus] = useState<any>() // Atualize o tipo conforme necessário

  useEffect(() => {
    const getBoard = async () => {
      const response = await new Promise((resolve) => {
        resolve(data)
      })
      setBoardData(response)
    }
    getBoard()
  }, [])

  const completeCard = () => {
    eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    } as CardEvent)
    eventBus.publish({
      type: 'REMOVE_CARD',
      laneId: 'PLANNED',
      cardId: 'Milk',
    } as CardEvent)
  }

  const addCard = () => {
    eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {
        id: 'Ec2Error',
        title: 'EC2 Instance Down',
        label: '30 mins',
        description: 'Main EC2 instance down',
      },
    } as CardEvent)
  }

  const shouldReceiveNewData = (nextData: any) => { // Atualize o tipo conforme necessário
    console.log('New card has been added')
    console.log(nextData)
  }

  const handleCardAdd = (card: any, laneId: string) => { // Atualize o tipo conforme necessário para "card"
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }

  const onCardMoveAcrossLanes = (fromLaneId: any, toLaneId: any, cardId: any, addedIndex: any) => {
    console.log(`onCardMoveAcrossLanes: ${fromLaneId}, ${toLaneId}, ${cardId}, ${addedIndex}`)
  }

  return (
    <div className="App">
      <div className="App-header">
        <h3>React Trello Demo</h3>
      </div>
      <div className="App-intro">
        <button onClick={completeCard} style={{ margin: 5 }}>
          Complete Buy Milk
        </button>
        <button onClick={addCard} style={{ margin: 5 }}>
          Add Blocked
        </button>
        <Board
          editable
          onCardAdd={handleCardAdd}
          data={boardData}
          draggable
          onDataChange={shouldReceiveNewData}
          eventBusHandle={setEventBus}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          onCardMoveAcrossLanes={onCardMoveAcrossLanes}
        />
      </div>
    </div>
  )
}

export default Home