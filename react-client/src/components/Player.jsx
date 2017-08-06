import React from 'react';

const Player = (props) => {
  return (
  	<div>
	  Player
	  {console.log(props)};
	  <iframe src={props.music.url}></iframe>

	</div>
  );
};

export default Player;