import React from 'react';
import '../src/App.css';

class TodoListFooter extends React.Component {

    state = {
        isHidden: true
    };

    onAllFilterClick = () => { this.props.changeFilter("All"); };
    onCompletedFilterClick = () => { this.props.changeFilter("Completed"); };
    onActiveFilterClick = () => { this.props.changeFilter("Active"); };
    onShowFiltersClick = () => { this.setState({isHidden: true}) };
    onHideFiltersClick = () => { this.setState({isHidden: false}) };

    render = (props) => {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "btn-footer";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "btn-footer";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "btn-footer";

        return (
            <div className="todoList-footer">
                { !this.state.isHidden && <div>
                     <button onClick={ this.onAllFilterClick } className={classForAll}>All</button>
                     <button onClick={ this.onCompletedFilterClick } className={classForCompleted}>Completed</button>
                     <button onClick={ this.onActiveFilterClick } className={classForActive}>Active</button>
                  </div>
                }
                { !this.state.isHidden && <span className='visibility' onClick={ this.onShowFiltersClick }>Hide Buttons</span> }
                { this.state.isHidden && <span className='visibility' onClick={ this.onHideFiltersClick }>Show Buttons</span> }
            </div>
        );
    }
}

export default TodoListFooter;

