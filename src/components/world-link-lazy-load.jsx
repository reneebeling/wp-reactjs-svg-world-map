import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
const WorldLinkMap = React.lazy(() => import('./world-link-map.jsx'));
import { lazyload } from 'react-lazyload'

@lazyload({
  height: 400,
  once: true,
  offset: 1000
})
export default class WorldLinkMapLazyLoad extends React.Component {
    render() {
        return (
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <WorldLinkMap />
                </Suspense>
            </div>
        );
    }
}