import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import List from './components/List.jsx';
import Player from './components/Player.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      list: ['music1','music2','music3'],
      music: 'music'
    }
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
        <Search />
        <Player music={this.state.music} />
        <List list={this.state.list} />

      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));