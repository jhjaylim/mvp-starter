import React from 'react';

const LibraryEntry = (props) => {
  return (
  	<li>
  	  <div onClick={()=>{props.change(props.music)}}>Title: {props.music.title}</div>
  	  <div>Artist: {props.music.artist}</div>
  	  <div><a href={props.music.fullUrl} target="_blank">Listen to Full Track Here</a></div>
  	  <button onClick={()=>{props.remove(props.music)}}>Remove</button>
  	</li>
  );
}

export default LibraryEntry;