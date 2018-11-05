import React, { Component } from "react";
import "./App.css";

const Todo = ({ todo, index, completeTodo, removeTodo }) => (
  <div
    className="todo"
    onClick={() => completeTodo(index)}
    style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
  >
    {todo.text}
    <button
      type="button"
      className="removeTodo"
      onClick={() => removeTodo(index)}
    >
      x
    </button>
  </div>
);

class TodoForm extends Component {
  state = { value: "" };

  updateValue = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.value) return;
    this.props.addTodo(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    const { value } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={this.updateValue}
        />
      </form>
    );
  }
}

class App extends Component {
  state = {
    todos: [
      {
        text: "Learn about React",
        isCompleted: false
      },
      {
        text: "Meet friend for lunch",
        isCompleted: false
      },
      {
        text: "Build really cool todo app",
        isCompleted: false
      }
    ]
  };

  addTodo = text => {
    const newTodos = [...this.state.todos, { text }];
    this.setState({ todos: newTodos });
  };

  completeTodo = index => {
    const newTodos = [...this.state.todos];
    newTodos[index].isCompleted = true;
    this.setState({ todos: newTodos });
  };

  removeTodo = index => {
    const newTodos = [...this.state.todos];
    this.state.todos.splice(index, 1);
    this.setState({ todos: newTodos });
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-2">
                <div className="card">
                  <div className="card-content">
                    {todos.map((todo, index) => (
                      <Todo
                        key={index}
                        index={index}
                        todo={todo}
                        completeTodo={this.completeTodo}
                        removeTodo={this.removeTodo}
                      />
                    ))}
                  </div>
                  <div className="card-footer">
                    <TodoForm addTodo={this.addTodo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
