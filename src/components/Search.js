import React from 'react';

class Search extends React.Component {

    constructor() {
        super();
    
        this.state = {
            loading: false,
            searchingText: '',
            gif: {}
        };
      };

    handleChange(event) {
        var searchingText = event.target.value;
        this.setState({searchingText: searchingText});

        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    }
    
    handleKeyUp(event) {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    }

    render() {
        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };

    return <input
             type="text"
             onChange={this.handleChange.bind(this)}
             onKeyUp={this.handleKeyUp.bind(this)}
             placeholder="Tutaj wpisz wyszukiwaną frazę"
             style={styles}
             value={this.state.searchTerm}
            />
  }
};

export default Search