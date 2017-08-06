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
    var token = 'BQAY_2UMqCW45L2Yvzn0VmLxg_vLPzZPGVfoK-p1wmb9giQ5nmZLGgXw7Ptg1C9hdkR735TQhf-HARsyuyjlf5FlcHPSrQhBk9xb0jVGZU1cmqmdZ-WxYRYX8NzcbGNR5xiylxUpAT5DhOh86RfqnfYYkhGZ&refresh_token=AQAkgwT6JdWRU-hu6SvjYiHAXt8tx0jV73sCLfwTCj8fR2HeKTWIq_Xju7Goku_c7OJPM-s0Nek5JG7CQpIZozFNp-4WZ_Ld24W6QRMqqXeOwk6bcWouRPc0UJF9GDw5EsY';
    var searchUrl = `https://api.spotify.com/v1/search?type=track&query=${query}&access_token=${token}`;
    console.log(query);
    var baseUrl = 'https://open.spotify.com/embed?uri=';
    $.ajax({
      url: searchUrl, 
      type: 'GET',
      success: (data) => {
        
        // artist, title
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