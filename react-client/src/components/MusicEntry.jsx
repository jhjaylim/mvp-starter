import React from 'react';

const MusicEntry = (props) => {
  return (
  	<li>
  	  <div onClick={()=>{props.change(props.music)}}>Title: {props.music.title}</div>
  	  <div>Artist: {props.music.artist}</div>
  	  <button onClick={()=>{props.add(props.music)}}>Add to Library</button>
  	  
  	</li>
  );
}

export default MusicEntry;