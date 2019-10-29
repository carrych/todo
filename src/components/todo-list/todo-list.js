import React from "react";

import './todo-list.css';

import TodoListItem from '../todo-list-item/index';


const TodoList = ({dataItems, onDeleted, onDoneStatus, onImportantStatus}) => {

    console.log("dataItems:",dataItems);
    const elements = dataItems.map((el) => {

        const {id, ...elProps} = el;

        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    {...elProps}
                    onDeleted={() => onDeleted(id)}
                    onDoneStatus={() => onDoneStatus(id)}
                    onImportantStatus={() => onImportantStatus(id)}/>
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default TodoList;
