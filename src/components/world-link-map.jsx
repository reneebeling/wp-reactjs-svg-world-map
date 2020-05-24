import React from 'react';
import World from '../world-map-robinson';
import { SVGMap } from "react-svg-map";
import VizSensor from "react-visibility-sensor";
import { getLocationId, getLocationName } from '../utils';
import '../../node_modules/react-svg-map/src/svg-map.scss';
import './style/world-map.scss';

class WorldLinkMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pointedLocation: null,
			tooltipStyle: {
				display: 'none'
			},
            defaultfilter : "en",
            VizSensorActive: true,
            links : {}
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
        this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
        this.getLocationClassName = this.getLocationClassName.bind(this);
        this.GetCountryLinksAndNames = this.GetCountryLinksAndNames.bind(this);
	}

	handleLocationMouseOver(event) {
		// const pointedLocation = getLocationName(event);
        // this.setState({ pointedLocation });
        const clickedLocationId = getLocationId(event);
        if( typeof(this.state.links[clickedLocationId]) !== "undefined"){
            const pointedLocation = this.state.links[clickedLocationId].name;
            this.setState({ pointedLocation });
        }
	}

	handleLocationMouseOut() {
		this.setState({ pointedLocation: null, tooltipStyle: { display: 'none' } });
	}

	handleLocationClick(event) {
		const clickedLocationId = getLocationId(event);
		window.open(this.state.links[clickedLocationId].url, '_blank');
	}
    
    // show tool tip, if country is set active / url exists
	handleLocationMouseMove(event) {
        const locationId = getLocationId(event);
        if(typeof(this.state.links[locationId]) !== 'undefined'){
            const tooltipStyle = {
                display: 'block',
                top: event.clientY + 10,
                left: event.clientX - 100
            };
            this.setState({ tooltipStyle });
        }
	}
    
    // set styles for active countries
    getLocationClassName(location, index) {
        if( typeof(this.state.links[location.id]) !== "undefined"){
            return `svg-map__location active-map-link`;
        }
        return `svg-map__location`;
	}
    
    
    GetCountryLinksAndNames(isVisible) {
        console.log("VizSensor active: " + this.state.VizSensorActive)
        if(isVisible){
            console.log('SVG MAP is now %s get country links and names from Wordpress', isVisible ? 'visible' : 'hidden');
            // in  case, someone wants to change the language => to do: two starting chars of lang as filter 
            if(typeof(document.documentElement.lang) !== "undefined" && document.documentElement.lang.startsWith("de")){
                this.state.defaultfilter = "de";
            }
            fetch("/wp-json/react-svg-map/data/v1/country-names-and-links?filter=" + this.state.defaultfilter)
            .then(response => response.json())
            .then(countryJSON => {
                console.log(countryJSON);
                this.setState({links: countryJSON});
                this.setState({VizSensorActive: false});
            });
        }
    }

	render() {
		return (
            <VizSensor 
                active={this.state.VizSensorActive}
                onChange={this.GetCountryLinksAndNames}
                partialVisibility = {true}
                offset={{ top: 200 }}
            >
                <div id="svg-map-frame">
                    <SVGMap
                        map={World}
                        type="link"
                        onLocationMouseOver={this.handleLocationMouseOver}
                        onLocationMouseOut={this.handleLocationMouseOut} 
                        onLocationMouseMove={this.handleLocationMouseMove}
                        onLocationClick={this.handleLocationClick} 
                        locationClassName={this.getLocationClassName} 
                        />
                        <div className="world_map_tooltip" style={this.state.tooltipStyle}>
                                {this.state.pointedLocation}
                        </div>
                </div>
            </VizSensor>
		);
	}
}

export default WorldLinkMap;
