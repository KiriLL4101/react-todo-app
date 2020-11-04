import React from 'react';
import axios from 'axios';
import { Route, useHistory, useLocation, Switch } from 'react-router-dom'

import { List, AddList, Tasks } from './components'

import listSvg from './assets/img/list.svg'

export interface IColors {
  id: number,
  hex: string,
  name: string
}

export interface ITask {
  completed: boolean,
  id: number,
  text: string,
  listId: number
}
export interface IList {
  id: number,
  name: string,
  color: IColors,
  colorId: number,
  tasks: ITask[]
}

function App() {
  const [lists, setLists] = React.useState<IList[]>([])
  const [colors, setColors] = React.useState<IColors[]>([])
  const [activeItem, setActiveItem] = React.useState<IList>(null!)
  let history = useHistory();
  let location = useLocation();

  React.useEffect(() => {
    axios.get('/lists?_expand=color&_embed=tasks').then(({ data }) => setLists(data))
    axios.get('/colors').then(({ data }) => setColors(data))
  }, [])

  React.useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list!);
    }
  }, [lists, history.location.pathname]);

  const onAddList = (list: IList) => {
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

  const onCompleteTask = (listId: number, taskId: number, completed: boolean) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch('/tasks/' + taskId, {
        completed
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  };

  const onEditTask = (listId: number, taskObj: { id: number, text: string }) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch('/tasks/' + taskObj.id, {
        text: newTaskText
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  };

  const onRemoveTask = (listId: number, taskId: number) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      const newList = lists.map(list => {
        if (list.id === listId) {
          list.tasks = list.tasks.filter(task => task.id !== taskId);
        }
        return list;
      });
      setLists(newList);
      axios.delete('/tasks/' + taskId).catch(() => {
        alert('Не удалось удалить задачу');
      });
    }
  };

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
              }}
              activeItem={activeItem}
              isRemoveble
            />
          ) : 'Загрузка...'
        }
        <AddList onAdd={onAddList} colors={colors} />
      </section>
      <main className="todo__tasks">

        <Route exact path="/" history={history}>
          {
            lists && lists.map(list => (
              <Tasks key={list.id}
                list={list}
                onAddTask={onAddTask}
                onEditTitle={onEditListTitle}
                onRemoveTask={onRemoveTask}
                onCompleteTask={onCompleteTask}
                onEditTask={onEditTask}
                withoutEmpty
              />
            ))
          }
        </Route>
        <Route path="/lists/:id" history={history}>
          {lists && activeItem && (
            <Tasks list={activeItem}
              onAddTask={onAddTask}
              onEditTitle={onEditListTitle}
              onRemoveTask={onRemoveTask}
              onCompleteTask={onCompleteTask}
              onEditTask={onEditTask} />)
          }
        </Route>

      </main>
    </div>
  );
}

export default App;
