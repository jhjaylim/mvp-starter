import React from 'react';

const MusicEntry = (props) => {
  return (
  	<li>
  	  <div onClick={()=>{props.handler(props.music)}}>Title: {props.music.title}</div>
  	  <div>Artist: {props.music.artist}</div>
  	  <div onClick={()=>{props.add(props.music)}}>Add to Library!</div>
  	</li>
  );
}

export default MusicEntry;