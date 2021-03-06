import React from 'react';
import Search from './Search';
import Gif from './Gif';

class App extends React.Component {

    constructor() {
        super();
    
        this.state = {
            loading: false,
            gif: {}
        };
      };

    handleSearch(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function(gif) {
            this.setState({
            loading: false,
            gif: gif,
            searchingText: searchingText
            });
        }.bind(this));
    }

    getGif(searchingText, callback) {
        var GIPHY_PUB_KEY = '8ecUye9y6KLyaCpayMuVPKD9ZagPWrN9'
        var GIPHY_API_URL = 'https://cors-anywhere.herokuapp.com/https://api.giphy.com'
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
               var data = JSON.parse(xhr.responseText).data;
                var gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);
            }
        };
        xhr.send();
      }
    
    
    render() {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };
        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch.bind(this)} />
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                 />
            </div>
        )
    }
}

export default App