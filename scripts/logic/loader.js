
var loader = {};

loader.shaderNames = ['Drag', 'Splash', 'Ray', 'LightShift', 'ColorShift'];
loader.imageNames = ['oils.jpg', 'lights.jpg', 'canvas.jpg' ];
loader.shaderArray = [];
loader.imageArray = [];
loader.currentImageName = loader.imageNames[0];
loader.presets = {};

loader.init = function ()
{
	for (var i = 0; i < loader.shaderNames.length; ++i) {
		PIXI.loader.add('shader' + i,'shaders/' + loader.shaderNames[i] + '.frag');
	}

	for (var i = 0; i < loader.imageNames.length; ++i) {
		PIXI.loader.add('background' + i,'images/' + loader.imageNames[i]);
		loader.imageArray.push('images/' + loader.imageNames[i]);
	}

	PIXI.loader.add('presets', 'json/presets.json');

	PIXI.loader.once('complete', loader.complete);
	PIXI.loader.load();
};

loader.complete = function (self, resources)
{
	for (var i = 0; i < loader.shaderNames.length; ++i) {
		loader.shaderArray.push(resources['shader' + i].data);
	}
	loader.presets = resources.presets.data;
	init();
};

loader.getBackground = function ()
{
	return loader.imageArray[loader.imageNames.indexOf(loader.currentImageName)];
};

loader.init();