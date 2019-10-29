import React, {Component} from "react";

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    onSearchChange = (event) => {

        const term = event.target.value;
        const {onSearchChange} = this.props;

        this.setState({term});
        onSearchChange(term);
    };


    render() {
        // const {term} = this.state;
        return (
            <input type="text"
                   className="form-control search-input"
                   onChange={this.onSearchChange}
                   placeholder="search"
                   value={this.state.term}/>
        );
    }
};
//
// export default SearchPanel;
