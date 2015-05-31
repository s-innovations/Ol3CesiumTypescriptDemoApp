# Ol3CesiumTypescriptDemoApp
A demonstration project for creating a webapp with grunt tools in visual studio, using ol3 cesium and requirejs

https://vimeo.com/129351085


## Visual Studio Extensions
Using these cool extensions you will get up and running with grunt tools in no time.

https://visualstudiogallery.msdn.microsoft.com/65748cdb-4087-497e-a394-2e3449c8e61e?SRC=VSIDE
https://visualstudiogallery.msdn.microsoft.com/dcbc5325-79ef-4b72-960e-0a51ee33a0ff?SRC=VSIDE

## Build Project
1. Clone this repository
2. Right click package.json and from the context menu run NPM Install packages
3. Right click bower.json and from the context menu run Bower Install packages
4. From the Task Runner Explorer (> View > Other Windows > Task Runner Explorer - if it is not visible) refresh it and run local
5. Setup IIS or some other host to serve content in /artifacts/local  where the website was generated.
6. Optional, if you intent to check in the repository to git again inside VS you might run into an issue that some npm packages creates to deep paths, even though these are not commeitted. I use this tool to flatten the dependencies. https://www.npmjs.com/package/flatten-packages

## Next steps

I am planning on showing how you can create build targets for deployment that combine all modules into one single js file with requirejs.

## RequireJS
Check out /src/main.ts for how this application was set up to use ol3,cesium and ol3cesiim for a maps and greensock/TweenMax animation library (this is actually not trivial to setup, so take a look at bundles and also TweenMax.d.ts in typings/TweenMax)

## SVG Menus
The main reason I created this demo was to play with SVG Circle menus on top of maps to get a feeling about how it would be to interact with.
http://sarasoueidan.com/tools/circulus/#examples
