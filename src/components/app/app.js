import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';


export default class App extends Component {

    forId = 100;

    state = {
        data: [
            this.createItem('do something'),
            this.createItem('make something'),
            this.createItem('eat something')
        ],
        term: '',
        filter: 'all'// active,all,done
    };

    createItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.forId++
        };
    };

    addItem = (label) => {

        const newItem = this.createItem(label);

        this.setState(({data}) => {

            const newArr = [...data, newItem];

            return {
                data: newArr
            };
        });
    };

    deleteItem = (id) => {

        this.setState(({data}) => {

            const index = data.findIndex((el) => el.id === id);

            const newArr = [
                ...data.slice(0, index),
                ...data.slice(index + 1)
            ];

            return {
                data: newArr
            };
        });
    };

    statusProperty(arr, id, propName) {

        const index = arr.findIndex((el) => el.id === id);
        const oldItem = arr[index];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };

        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];

    }

    doneStatus = (id) => {
        this.setState(({data}) => {

            return {
                data: this.statusProperty(data, id, 'done')
            };

        });
    };

    importantStatus = (id) => {
        this.setState(({data}) => {

            return {
                data: this.statusProperty(data, id, 'important')
            };

        });
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        })
    }

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    render() {

        const {data, term, filter} = this.state;
        console.log(data);
        const ourItems =this.filter( this.search(data, term),filter);
        const doneCntr = data.filter((item) => item.done).length;
        const todoCntr = data.length - doneCntr;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCntr} done={doneCntr}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                    onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList
                    dataItems={ourItems}
                    onDeleted={this.deleteItem}
                    onDoneStatus={this.doneStatus}
                    onImportantStatus={this.importantStatus}/>
                <AddItem
                    onAddItem={this.addItem}
                />
            </div>
        );
    }
}

