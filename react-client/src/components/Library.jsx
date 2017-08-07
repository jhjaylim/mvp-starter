import React from 'react';
import LibraryEntry from './LibraryEntry.jsx';

const Library = (props) => {
	return (
		<div>
			<h1 onClick={props.load}>Library</h1>
  		<ul>
  			{props.list.map((music)=>{
  				return (<LibraryEntry music={music} change={props.handler} remove={props.remove} />)
  			})}
			</ul>
		</div>
	);
}

export default Library;

