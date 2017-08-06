import React from 'react';

const Player = (props) => {
  return (
  	<div>
	  <iframe src={props.music.url} height='80px'></iframe>
	  <h3>{props.music.title}</h3>
	  <h4>{props.music.artist}</h4>
	</div>
  );
};

export default Player;