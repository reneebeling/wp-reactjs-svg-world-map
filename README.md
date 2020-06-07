# WordPress Plugin to use ReactJS SVG-Maps

## Usage

### tbd

## Developement

### Requirements for changes

Install the module bundler Webpack v4+ , webpack-cli  ***globally***.
```
npm install -g webpack
npm install -g webpack-cli
```

### Installation
1. Clone the repository to the Plugins directory of your WordPress installation: ` / wp-content / plugins / ` .

2.  Install the dependencies :
```
  $ npm install
```
3. run webpack  :
```
  $ webpack
```
**and that's all!** :+1:  you will have a new directory at the root of your plugin: `dist` which contains the compiled javascript file.
now you can create your JSX components, and when you're ready, rerun ``` $ webpack```.

## Credits

This small plugin is mainly based on work of the following authors and projects:

[react-svg-map](https://github.com/VictorCazanave/react-svg-map) by [VICTOR CAZANAVE](https://victorcazanave.com/en/)

Country name translations from [country-list](https://github.com/umpirsky/country-list) by [Saša Stamenković](https://github.com/umpirsky).

World map based on a [svgMap](https://github.com/StephanWagner/svgMap) by [Stephan Wagner](https://stephanwagner.me/create-world-map-charts-with-svgmap#svgMapDemoGDP)
Other used resources: [wikipedia world map](https://upload.wikimedia.org/wikipedia/commons/b/bc/BlankMap-World-Compact.svg) and edited with [SVGOMG](http://jakearchibald.github.io/svgomg/) by [Jake Archibald](https://twitter.com/jaffathecake)

Addtional maps:
[svg-map](https://github.com/VictorCazanave/svg-maps) by [VICTOR CAZANAVE](https://victorcazanave.com/en/)

Starting with wp reactjs plugins:
[wp-plugin-reactjs](https://github.com/younes-dro/wp-plugin-reactjs) by [Younes DRO](https://dro.123.fr/)

This used world map is based on the work of [MapSVG](https://mapsvg.com).

As also stated by [VICTOR CAZANAVE](https://victorcazanave.com/en/), the original map is available [here](https://mapsvg.com/maps/world) under the [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) license.
