import React from 'react';
import List from './components/List/List'
import listSvg from './assets/img/list.svg'

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
        ]} />
      </section>
      <main className="todo__tasks">

      </main>
    </div>
  );
}

export default App;
