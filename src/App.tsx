import React from 'react';
import List from './components/List/List'
import AddList from './components/AddList'

import listSvg from './assets/img/list.svg'

import DB from './assets/db.json'

function App() {
  return (
    <div className="todo">
      <section className="todo__sidebar">
        <List items={[
          {
            icon: listSvg,
            label: 'Все задачи',
            active: false
          }
        ]} />
        <List items={[
          {
            color: 'green',
            label: 'Покупки',
            active: false
          },
          {
            color: 'blue',
            label: 'Фронтенд',
            active: true
          },
          {
            color: 'pink',
            label: 'Книги',
            active: false
          }
        ]}
          isRemoveble />
        <AddList colors={DB.colors} />
      </section>
      <main className="todo__tasks">

      </main>
    </div>
  );
}

export default App;
