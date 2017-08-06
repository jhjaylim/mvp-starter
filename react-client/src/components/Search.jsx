import React from 'react';
import $ from 'jquery';
import Credentials from '../../../server/credentials.js';




var Search = (props) => {



  return (
	    <div id="search">
	    	Search:

			  <input id='input' type="text" />
				<button onClick={props.handler}>Search</button>
			
			</div>
  );
};


export default Search;