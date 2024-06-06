import './App.css';
import {useState} from "react";
import TodoHeader from "./components/TodoHeader.jsx";
import FilterTab from "./components/FilterTab.jsx";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";

// 로컬 스토리지에서 todos 배열을 가져오는 함수
const fetchTodos = () => {
  const todosJSON = localStorage.getItem('todos');
  return todosJSON ? JSON.parse(todosJSON) : [];
};

function App() {
  const [todos, setTodos] = useState(fetchTodos());
  const [filteredTodos, setFilterTodos] = useState(todos);

  const addTodo = (todo) => {
    const trimmedTodo = todo.trim();
    if (!trimmedTodo) return alert('내용을 입력해주세요.');
    if (todos.some(item => item.text === trimmedTodo)) return alert('중복된 내용입니다.');

    // 이전 todos 배열을 복사하여 새로운 배열을 만들고, 새로운 todo를 추가
    const newTodos = [{ text: trimmedTodo, checked: false }, ...todos];
    // 새로운 todos 배열을 로컬 스토리지에 저장
    localStorage.setItem('todos', JSON.stringify(newTodos));

    setTodos(newTodos);
    setFilterTodos(newTodos);
  };

  const checkTodo = (todo) => {
    // 해당 todo의 checked 상태를 토글
    const newTodos = todos.map(item => {
      return item === todo ? { ...item, checked: !item.checked } : item;
    });

    setTodos(newTodos);
    setFilterTodos(newTodos);
    // 새로운 배열을 로컬 스토리지에 저장
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const removeTodo = (todo) => {
    // item===todo를 제외한 모든 요소를 유지하는 새로운 배열 생성
    const newTodos = todos.filter(item => item !== todo);
    // 상태 업데이트
    setTodos(newTodos);
    setFilterTodos(newTodos);
    // 새로운 배열을 로컬 스토리지에 저장
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const editTodo = (index, newTodo) => {
    const trimmedTodo = newTodo.trim();
    if (!trimmedTodo) return alert('내용을 입력해주세요.');

    const newTodos = todos.map((item, idx) => {
      return idx === index ? {...item, text: newTodo, checked: false} : item;
    })
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
    setFilterTodos(newTodos);
  }

  return (
    <div className="container">
      <TodoHeader />
      <FilterTab todos={todos} setFilterTodos={setFilterTodos}/>
      <TodoInput onTodoAdd={addTodo}/>
      <TodoList
        todos={filteredTodos}
        onTodoCheck={checkTodo}
        onTodoRemove={removeTodo}
        onTodoEdit={editTodo}
      />
    </div>
  )
}

export default App
