import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import List from './components/List.jsx';
import Player from './components/Player.jsx';
import Credentials from '../../server/credentials.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      music: {
        url: 'https://open.spotify.com/embed?uri=spotify:album:7mgdTKTCdfnLoa1HXHvLYM',
        artist: undefined,
        title: undefined
      }
    };
    this.onClickHandler = (event) => {
      console.log(event);
      this.search();

    }

  }

  search(input) {

    var query = $('#input').val();
    var token = 'BQCmtIr5oqlax_AuukSod_gLbjOBSCnFqMqC5b2ZrofT8KQViNkiYCEAgEcj2JY7M7WbCksRmSb1NIp5wRpTUIccoJlT669PdVtwflT6EdXQYmtwamwgNYEXJKsoNVE1I59Sry4IAJ5L81-2YBYNPpclxkX8&refresh_token=AQC-b02kZ6pw-GRu8yUv5RpgiEw3H9X43CNJvXAJ4xH53-07S0IGe_q7ChJV7sAB8lmak_BPB3j_V1HgrMg11jct2brOm2IZOly2_llgyV_cy1c3L5hrm3BdfI_bU4ZNMT0';
    var searchUrl = `https://api.spotify.com/v1/search?type=track&query=${query}&access_token=${token}`;
    console.log(query);
    var baseUrl = 'https://open.spotify.com/embed?uri=';
    $.ajax({
      url: searchUrl, 
      type: 'GET',
      success: (data) => {
        console.log(data.tracks.items);
        this.setState(
          {
            list: data.tracks.items
            .map((item)=>{
              return {
                url: baseUrl+item.uri + '&autoplay=true',
                artist: item.artists[0].name,
                title: item.name
              };
            })
          }
        );
        this.setState(
          {
            music: this.state.list[0]
          });
        console.log(this.state.list);
      },
      error: (err) => {
        console.log('err', err);
      }
    });






  }

  // componentDidMount() {
  //   // $.ajax({
  //   //   url: '/items', 
  //   //   success: (data) => {
  //   //     this.setState({
  //   //       items: data
  //   //     })
  //   //   },
  //   //   error: (err) => {
  //   //     console.log('err', err);
  //   //   }
  //   // });
  // }

  render() {
    return (
      <div>
        <Search handler={this.onClickHandler}/>
       
        <Player music={this.state.music} />

        <List list={this.state.list} />

      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));