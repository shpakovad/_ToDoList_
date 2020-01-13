import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }
    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("our-state", stateAsString);
    };
    restoreState = () => {
        // объявляем наш стейт стартовый
        let state = {
            tasks: [],
            filterValue: "All"
        };
        // считываем сохранённую ранее строку из localStorage
        let stateAsString = localStorage.getItem("our-state");
        // а вдруг ещё не было ни одного сохранения?? тогда будет null.
        // если не null, тогда превращаем строку в объект
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        // устанавливаем стейт (либо пустой, либо восстановленный) в стейт
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id + 1;
                }
            })
        });
    };
    nextTaskId = 0;
    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        // инкрементим (увеличим) id следующей таски, чтобы при следюущем добавлении, он был на 1 больше
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState( {
            tasks: newTasks
        }, () => { this.saveState(); });

    };

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        }, () => { this.saveState(); });
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            }
            else {
                return {...t, ...obj};
            }
        });

        this.setState({
            tasks: newTasks
        }, () => { this.saveState(); });
    };
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    };
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };
    deleteTask=(id) => {
        let newTasks=this.state.tasks.filter((item) => {
            return item.id !== id
        });
        this.setState({
            tasks:newTasks
        });
    };
    onIsDeleteTodo=(e) => {
        this.setState({tasks:e.target.value})
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />
                    <TodoListTasks changeStatus={this.changeStatus }
                                   changeTitle={this.changeTitle }
                                   deleteTask={this.deleteTask}
                                   onIsDeleteTodo={this.onIsDeleteTodo}
                                   tasks={this.state.tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.isDone === false;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.isDone === true;
                        }
                    })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

