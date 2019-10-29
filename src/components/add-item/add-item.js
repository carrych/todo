import React, {Component} from 'react';

import './add-item.css';

export default class AddItem extends Component {

    state = {
        label: ''
    };

    onLabelChange = (event) => {

        this.setState({
            label: event.target.value
        });

    };

    onSubmit = (event) => {
        event.preventDefault();
        const {onAddItem} = this.props;
        onAddItem(this.state.label);

        this.setState({
            label: ''
        });
    };

    cleare=()=>{
        this.setState({
            label: ''
        });
    };

    render() {

        // const {label} = this.state;
        const {onAddItem} = this.props;

        return (

            <form className='item-add-form d-flex'
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className='form-control'
                       onChange={this.onLabelChange}
                       placeholder='New item to do'
                       value={this.state.label}/>
                <button type='button'
                        className='btn btn-outline-secondary'
                        onClick={() => {onAddItem(this.state.label); this.cleare()}}>Add Item
                </button>

            </form>
        )
    }
};
