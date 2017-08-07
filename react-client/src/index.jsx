import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import List from './components/List.jsx';
import Player from './components/Player.jsx';
import Library from './components/Library.jsx';
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
    this.onSearchHandler = (event) => {
      
      this.search();
    };
    this.loadLibrary = ( event ) => {
      console.log('loading');
      $.ajax({
        url: '/library',
        type: 'GET',
        success: (data) => {
          console.log('success');
          console.log(data);
        },
        error: (err) =>{
          console.log(err);
        }
      });



    };
    this.addToLibrary = (music) => {
      console.log('addToLibrary!!!');
      console.log(music);
      $.ajax({
        url: '/library',
        type: 'POST',
        data: music,
        success: (data) => {
          console.log('success');
        },
        error: (err) =>{
          console.log(err);
        }


      });

    };
    this.changeSong = (music) => {
      this.setState({music: music});
    };

  }

  search(input) {

    var query = $('#input').val() || 'Hello' ;
    var token = 'BQDYBxt85h5FVPrWadmmglUgiZbhYZWgbIuOifUUuZbnPMhcKX3OppLSxL-0jd--uQNL-OAKEcVf-k_0ooCr6dl7bUDp80KV5_gAjYJLphj0E_52n4avKcAeT2Lj4dchOUZvqLCeOe7oHXnxY9IeveYrSYf-&refresh_token=AQDSALB98LQmqLvBr7hvh3dLMEpJKST--VHDTP5cs1hYkwcokO9NJKP0604HK-dWzE38HwAKKnZ75osa9cm8FFumMCXMPFvsWHQiASLvfiM3kTgGj-XrgLMcL9YRvuNo5Cs';
    var searchUrl = `https://api.spotify.com/v1/search?type=track&query=${query}&access_token=${token}`;
    var baseUrl = 'https://open.spotify.com/embed?uri=';
    $.ajax({
      url: searchUrl, 
      type: 'GET',
      success: (data) => {
        console.log(data.tracks.items);
        data.tracks.items = data.tracks.items.slice(0, 10);

        this.setState(
          {
            list: data.tracks.items
            .map((item)=>{
              return {
                url: baseUrl+item.uri + '&autoplay=true',
                artist: item.artists[0].name,
                title: item.name,
                fullUrl: item.external_urls.spotify
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
        <Search handler={this.onSearchHandler}/>
       
        <Player music={this.state.music} handler={this.addToLibrary}/>

        <List list={this.state.list} handler={this.changeSong} add={this.addToLibrary} />

        <Library list={this.state.library} load={this.loadLibrary}/>



      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));