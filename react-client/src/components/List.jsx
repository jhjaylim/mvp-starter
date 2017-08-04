import React from 'react';
import MusicEntry from './MusicEntry.jsx';

const List = (props) => {


	return (
		<div>
  		<ul>
  			{props.list.map((music)=>{
  				return <MusicEntry music={music} />
  			})}
			</ul>
		</div>

	);

}

export default List;