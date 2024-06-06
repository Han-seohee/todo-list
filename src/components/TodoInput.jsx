import {useState} from "react";

function TodoInput ({onTodoAdd}) {
  const [inputText, setInputText] = useState('');

  const handleInput = (event) => {
    const value = event.target.value;
    setInputText(value);
  }

  const handleClick = () => {
    onTodoAdd(inputText);
    setInputText('');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="add_input_wrap">
      <div>
        <input
        type="text"
        value={inputText}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        placeholder="오늘의 할 일을 추가해 보세요."
        maxLength="50"
      />
        <span>{inputText.length}/50</span>
      </div>
      <button onClick={handleClick}>
        <img src="data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.75 7.75H2.75M7.75 2.75V12.75' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A" alt="추가"/>
      </button>
    </div>
  )
}

export default TodoInput;