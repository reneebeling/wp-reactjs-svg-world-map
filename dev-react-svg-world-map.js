import React from 'react';
import ReactDOM from 'react-dom';
import WorldLinkMap from './src/components/world-link-map.jsx';

if (process.env.NODE_ENV !== 'production') {
   console.log('Development mode is activated.');
   ReactDOM.render(
        React.createElement('div', {id: 'shopping-list'},
        React.createElement("h1", null, "React Map DevMode")),
   );
}

ReactDOM.render(<WorldLinkMap />, document.getElementById('reactjs_svg_map'));