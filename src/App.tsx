import React from 'react';
import axios from 'axios';
import { Route, useHistory } from 'react-router-dom'

import { List, AddList, Tasks } from './components'

import listSvg from './assets/img/list.svg'

export interface colors {
  id: number,
  hex: string,
  name: string
}

export interface ITask {
  complited: boolean,
  id: number,
  text: string,
  listId: number
}
export interface list {
  id: number,
  name: string,
  color: colors,
  colorId?: number,
  tasks?: ITask[]
}

function App() {
  const [lists, setLists] = React.useState<list[]>([])
  const [colors, setColors] = React.useState<colors[]>([])
  const [activeItem, setActiveItem] = React.useState<list>(null!)
  let history = useHistory();

  React.useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => setLists(data))
    axios.get('http://localhost:3001/colors').then(({ data }) => setColors(data))
  }, [])

  // TODO
  // React.useEffect(() => {
  //   const listId = history.location.pathname.split('lists/')[1];
  //   if (lists) {
  //     const list = lists.find(list => list.id === Number(listId));
  //     console.log(list)
  //     setActiveItem(list!);
  //   }
  // }, [lists, history.location.pathname]);

  const onAddList = (list: list) => {
    setLists(prev => [...prev, list])
  }

  const onAddTask = (listId: number, task: any) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks!, task]
      }
      return item
    })
    setLists(newList)
  }

  const onEditListTitle = (id: number, title: string) => {
    setLists(
      lists.map(v => {
        if (v.id === id) {
          v.name = title
        }
        return v
      })
    )
  }

  // const onCompleteTask = (listId, taskId, completed) => {
  //   const newList = lists.map(list => {
  //     if (list.id === listId) {
  //       list.tasks = list.tasks.map(task => {
  //         if (task.id === taskId) {
  //           task.completed = completed;
  //         }
  //         return task;
  //       });
  //     }
  //     return list;
  //   });
  //   setLists(newList);
  //   axios
  //     .patch('http://localhost:3001/tasks/' + taskId, {
  //       completed
  //     })
  //     .catch(() => {
  //       alert('Не удалось обновить задачу');
  //     });
  // };

  return (
    <div className="todo">
      <section className="todo__sidebar">
        <List items={[
          {
            icon: listSvg,
            name: 'Все задачи',
            active: true
          }
        ]}
          onClickItem={() => {
            history.push(`/`)
          }} />
        {
          lists ? (
            <List items={lists}
              onRemove={(id: number) => {
                setLists(lists.filter(v => v.id !== id))
              }}
              onClickItem={(item: any) => {
                history.push(`/lists/${item.id}`)
                setActiveItem(item)
              }}
              activeItem={activeItem}
              isRemoveble
            />
          ) : 'Загрузка...'
        }
        <AddList onAdd={onAddList} colors={colors} />
      </section>
      <main className="todo__tasks">
        <Route exact path="/">
          {
            lists && lists.map(list => (
              <Tasks key={list.id}
                list={list}
                onAddTask={onAddTask}
                onEditTitle={onEditListTitle}
                withoutEmpty
              />
            ))
          }
        </Route>
        <Route path="/lists/:id">
          {lists && activeItem && (
            <Tasks list={activeItem}
              onAddTask={onAddTask}
              onEditTitle={onEditListTitle} />)
          }
        </Route>
      </main>
    </div>
  );
}

export default App;
