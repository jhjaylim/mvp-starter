import React from 'react';

const LibraryEntry = (props) => {
  return (
  	<li>
  	  <div><a href={props.music.fullUrl} target="_blank">Title: {props.music.title}</a></div>
  	  <div>Artist: {props.music.artist}</div>
  	</li>
  );
}

export default LibraryEntry;