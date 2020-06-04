import React from 'react';
import ReactDOM from 'react-dom';
import WorldLinkMapLazyLoad from './src/components/world-link-lazy-load.jsx';

const rootElmementId = 'reactjs_svg_map';

if (process.env.NODE_ENV !== 'production') {
   console.log('Development mode is activated.');
   console.log('Root element "%s" will be created.', rootElmementId);  
   const rootElmement = document.createElement('div');
   rootElmement.setAttribute("id", rootElmementId);
   document.body.appendChild(rootElmement);
}

if ( document.getElementById(rootElmementId) ) {
    ReactDOM.render(<WorldLinkMapLazyLoad />, document.getElementById(rootElmementId));
    window.onbeforeunload = function () {window.scrollTo(0, 0);}
}
else
{
    console.log('Root element "%s" does not exist.', rootElmementId);  
}