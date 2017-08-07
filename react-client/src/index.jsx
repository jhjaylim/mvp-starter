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
      },
      library: []
    };
    this.onSearchHandler = (event) => {
      
      this.search();
    };
    this.loadLibrary = () => {
      console.log('loading');
      $.ajax({
        url: '/library',
        type: 'GET',
        success: (data) => {
          console.log('success');
          console.log(Array.isArray(data));


          this.setState({
            library: data
          });
        },
        error: (err) =>{
          console.log(err);
        }
      });

    };
    this.addToLibrary = (music) => {
      console.log('Add to library!');
      $.ajax({
        url: '/library',
        type: 'POST',
        data: music,
        success: (data) => {
          console.log('success');
          this.loadLibrary();
        },
        error: (err) =>{
          console.log(err);
        }
      });
    };
    this.changeSong = (music) => {
      console.log("Change Song: ", music);
      this.setState({music: music});
    };
    this.removeFromLibrary = (music) => {
      console.log("Remove: ", music);
      $.ajax({
        url: '/delete',
        type: 'POST',
        data: music,
        success: (data) => {
          console.log('success');
          this.loadLibrary();
        },
        error: (err) =>{
          console.log(err);
        }
      });
    };

  }

  search(input) {

    var query = $('#input').val() || 'Hello' ;
    var token = 'BQAuwO3VoSyups4z-wZSGIOQK3cTC0naMPwfB7DERJ6CY74dw14I69nhMRIeI4yZWOdv2hKGSy_BdhShZjp4N4pcYKGu9efLIYjI1REm00SE6atFwLzicutF-cjC9s4lRKcWO9dqCxh5NGxDJI3srI2mm9lx&refresh_token=AQBJLDXKyFo21egzzKhSV3IzstdTJz9AV2ppTLDEj_A7Na_Ncomr7rbOHT3O26LYTxUkamikSSDhGo1zaxHKBpoQPjQRCo9T0kWdkrsCpLPyX4Am5y5frgVmHqhaI2-MPSw';
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
                url: baseUrl+item.uri,
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

  componentDidMount() {
    $.ajax({
      url: '/library',
      type: 'GET',
      success: (data) => {
        console.log('success');
        console.log(data);
        this.setState({
          library: data
        });
        console.log("Library: ", this.state.library);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div>
        <Search handler={this.onSearchHandler}/>
        <Player music={this.state.music} handler={this.addToLibrary}/>
        <List list={this.state.list} change={this.changeSong} add={this.addToLibrary}/>
        <Library list={this.state.library} load={this.loadLibrary} 
          handler={this.changeSong} remove={this.removeFromLibrary}/>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));