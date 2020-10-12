import React from 'react';
import List from './components/List'
import AddList from './components/AddList'

import listSvg from './assets/img/list.svg'

import DB from './assets/db.json'

export interface list {
  id: number,
  name: string,
  color: string,
  colorId?: number
}

function App() {
  const [lists, setLists] = React.useState<list[]>(DB.lists.map(item => {
    return {
      ...item,
      color: DB.colors.filter(v => v.id === item.colorId)[0].name
    }
  }))

  const onAddList = (list: list) => {
    setLists(prev => [...prev, list])
  }

  const onRemoveItem = (listId: number) => {
    if (!window.confirm('Выдействительно хотите удалить ?')) {
      console.log(listId)
    }
  }

  return (
    <div className="todo">
      <section className="todo__sidebar">
        <List items={[
          {
            icon: listSvg,
            name: 'Все задачи',
            active: false
          }
        ]} />
        <List items={lists}
          isRemoveble
          onRemove={onRemoveItem}
        />
        <AddList onAdd={onAddList} colors={DB.colors} />
      </section>
      <main className="todo__tasks">

      </main>
    </div>
  );
}

export default App;
