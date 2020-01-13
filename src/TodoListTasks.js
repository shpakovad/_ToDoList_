import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let tasksElements = this.props.tasks.map( task => <TodoListTask task={task} key={task.id}
                                                                        changeStatus={this.props.changeStatus}
                                                                        changeTitle={this.props.changeTitle}
                                                                        deleteTask={this.props.deleteTask}
                                                                        onIsDeleteTodo={this.props.onIsDeleteTodo}
                                                                        />);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

