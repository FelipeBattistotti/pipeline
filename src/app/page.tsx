import Pipeline from '@/components/Pipeline'
import KanbanBoard from '@/components/KanbanBoard'

import Kanban from 'react-easy-kanban'

const data = {
  tasks: {
    task1: { id: 'task1', content: 'Task 1' },
    task2: { id: 'task2', content: 'Task 2' },
    task3: { id: 'task3', content: 'Task 3' },
    task4: { id: 'task4', content: 'Task 4' }
  },
  columns: {
    column1: {
      id: 'column1',
      title: 'To do',
      taskIds: ['task1', 'task3', 'task4']
    },
    column2: {
      id: 'column2',
      title: 'Doing',
      taskIds: ['task2']
    },
    column3: {
      id: 'column3',
      title: 'Done',
      taskIds: []
    }
  },
  columnsOrder: ['column1', 'column2', 'column3']
}

export default function Home() {
  return (
    <main>
      {/* <Pipeline /> */}
      {/* <KanbanBoard /> */}
      <Kanban
        columns={data.columns}
        tasks={data.tasks}
        columnsOrder={data.columnsOrder}
        // columnHeaderStyle={{ backgroundColor: '#2196f3', color: 'white' }}
        // columnContentStyle={{ backgroundColor: '#EEEEEE' }}
        // taskContentStyle={{ backgroundColor: 'white' }}
      />
    </main>
  )
}