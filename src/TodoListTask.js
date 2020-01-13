import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };

    state = {
        editMode: false
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode= () => {
        this.setState({editMode: false});
    };


    render = () => {

        let containerCssClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";

        return (
                <div className={containerCssClass}>
                    <input className='checkbox' type="checkbox" checked={this.props.task.isDone}
                           onChange={this.onIsDoneChanged}/>
                    { this.state.editMode
                        ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.props.task.title} />
                        : <span className='text-style' onClick={this.activateEditMode}> {this.props.task.title}</span>
                    }
                    <button className='btn-delete' onChange={this.props.onIsDeleteTodo}
                        onClick={()=>{this.props.deleteTask(this.props.task.id)}}> X </button>
                </div>
        );
    }
}

export default TodoListTask;

