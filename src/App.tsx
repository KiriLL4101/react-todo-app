import React from 'react';
import axios from 'axios';

import { List, AddList, Tasks } from './components'

import listSvg from './assets/img/list.svg'

export interface colors {
  id: number,
  hex: string,
  name: string
}
export interface list {
  id: number,
  name: string,
  color: colors,
  colorId?: number
}

function App() {
  const [lists, setLists] = React.useState<list[]>([])
  const [colors, setColors] = React.useState<colors[]>([])

  React.useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => setLists(data))
    axios.get('http://localhost:3001/colors').then(({ data }) => setColors(data))
  }, [])

  const onAddList = (list: list) => {
    setLists(prev => [...prev, list])
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
          onRemove={(id: number) => {
            setLists(lists.filter(v => v.id !== id))
          }}
          isRemoveble
        />
        <AddList onAdd={onAddList} colors={colors} />
      </section>
      <main className="todo__tasks">
        {!!lists.length && <Tasks task={lists[1]} />}
      </main>
    </div>
  );
}

export default App;
