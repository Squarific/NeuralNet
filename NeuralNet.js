function NeuralNet (settings, network) {
	this.settings = this.normalizeSettings(settings, this.defaultSettings);
	this.network = JSON.parse(JSON.stringify(network || this.randomNetwork()));
}

NeuralNet.prototype.defaultSettings = {
	hiddenLayers: 2,
	nodesPerLayer: 20,
	inputNodes: 2,
	outputNodes: 2,
	mutationRate: 0.04
};

NeuralNet.prototype.normalizeSettings = function normalizeSettings (target, defaults) {
	target = target || {};
	var normalized = JSON.parse(JSON.stringify(target));
	for (var k in defaults) {
		if (typeof defaults[k] === "object" && !(defaults[k] instanceof Array)) {
			normalized[k] = this.normalizeDefaults(target[k] || {}, defaults[k]);
		} else {
			normalized[k] = target[k] || defaults[k];
		}
	}
	return normalized;
};

NeuralNet.prototype.mutateNetwork = function mutateNetwork (mutationRate, network) {
	mutationRate = mutationRate || this.settings.mutationRate;
	var copyNetwork = this.copyNetwork(network || this.network);
	var layerCount = copyNetwork.length;
	for (var layer = 0; layer < layerCount; layer++) {
		for (var node = 0; node < copyNetwork[layer].length; node++) {
			copyNetwork[layer][node].bias += (Math.random() * 2 - 1) * mutationRate;
			for (var weight = 0; weight < copyNetwork[layer][node].weights.length; weight++) {
				copyNetwork[layer][node].weights[weight] += (Math.random() * 2 - 1) * mutationRate;
			}
		}
	}
	if (!network) {
		this.network = copyNetwork;
	}
	return copyNetwork;
};

NeuralNet.prototype.randomNetwork = function randomNetwork (layers, nodesPerLayer, inputNodes, outputNodes) {
	layers = (layers || this.settings.hiddenLayers) + 1;
	nodesPerLayer = nodesPerLayer || this.settings.nodesPerLayer;
	inputNodes = inputNodes || this.settings.inputNodes;
	outputNodes = outputNodes || this.settings.outputNodes;
	var network = [],
		previousNodeCount;
	for (var layer = 0; layer < layers; layer++) {
		if (layer === 0) previousNodeCount = inputNodes;
		if (layer === layers - 1) nodesPerLayer = outputNodes;
		network[layer] = this.randomLayer(nodesPerLayer, previousNodeCount);
		previousNodeCount = nodesPerLayer;
	}
	return network;
};

NeuralNet.prototype.randomLayer = function randomeLayer (nodes, previousNodeCount) {
	var layer = [];
	for (var node = 0; node < nodes; node++) {
		layer[node] = this.randomNode(previousNodeCount);
	}
	return layer;
};

NeuralNet.prototype.randomNode = function randomNode (previousNodeCount) {
	var node = {
		bias: Math.random() * 2 - 1,
		weights: []
	};
	for (var weight = 0; weight < previousNodeCount; weight++) {
		node.weights[weight] = Math.random() * 2 - 1;
	}
	return node;
};

NeuralNet.prototype.copyNetwork = function copyNetwork (network) {
	return JSON.parse(JSON.stringify(network || this.network));
};

NeuralNet.prototype.runNetwork = function runNetwork (inputNodes, network) {
	network = network || this.network;
	var layerCount = this.network.length;
	for (var layer = 0; layer < layerCount; layer++) {
		inputNodes = this.runLayer(inputNodes, network[layer]);
	}
	return inputNodes;
};
	
NeuralNet.prototype.runLayer = function runLayer (inputNodes, layer) {
	var outputs = [],
		nodeCount = layer.length;
	for (var node = 0; node < nodeCount; node++) {
		outputs[node] = this.outputFromNode(inputNodes, layer[node]);
	}
	return outputs;
};
	
NeuralNet.prototype.outputFromNode = function outputFromNode (inputNodes, node) {
	var sum = node.bias,
		weightCount = node.weights.length;
	for (var weight = 0; weight < weightCount; weight++) {
		sum += node.weights[weight] * inputNodes[weight];
	}
	return 1 / (1 + Math.exp(-sum));
};

var module;
if (module && module.exports) {
	module.exports = NeuralNet;
}