import React from 'react';

const Search = (props) => {

	return (
    <div id="search">
			<form>
			  Search: 
			  <input type="text" name="search" />
			  <input type="submit" value="Submit" />
			</form>
		</div>

	);

};

export default Search;