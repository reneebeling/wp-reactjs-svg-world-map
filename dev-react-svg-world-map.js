import React from 'react';
import ReactDOM from 'react-dom';
import WorldLinkMapLazyLoad from './src/components/world-link-lazy-load.jsx';

if (process.env.NODE_ENV !== 'production') {
   console.log('Development mode is activated.');
   ReactDOM.render(
        React.createElement('div', {id: 'shopping-list'},
        React.createElement("h1", null, "React Map DevMode")),
   );
}

if ( document.getElementById('reactjs_svg_map') ) {
    ReactDOM.render(<WorldLinkMapLazyLoad />, document.getElementById('reactjs_svg_map'));
    window.onbeforeunload = function () {window.scrollTo(0, 0);}
}