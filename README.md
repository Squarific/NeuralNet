NeuralNet
=========

This javascript module is made for applications that want to use neural network and train them using a evolutionary approach instead of backpropagation.

How to use
==========

    var neuralNet = new NeuralNet(); //This creates a random network
    
The NeuralNet constructor accepts two objects, the first being a settings object the second an array that represents a network.
The following methods can be used:

    neuralNet.mutateNetwork(mutationRate, network);

If no mutationRate or network is provided it will use the network of the object the method was called on and the mutationRate in neuralNet.settings.mutationRate.

    neuralNet.randomNetwork(hiddenLayers, nodePerLayer, inputNodes, outputNodes);
    
Function will return a random network. This function also defaults to the settings object.

    neuralNet.runNetwork(inputNodes, network);
    
This function will return the calculated outputNodes, defaults to using the network of the neuralNet object it was called on.

Settings
========

The settings object defaults to:
    
{
	layers: 2, //Used for generating
	nodesPerLayer: 20, //Used for generating
    inputNodes: 2,
    outputNodes: 2
	mutationRate: 0.04 //Used for mutation
}

Network
=======

The internal network is an array of layer arrays:

    [[], ...]

The layer arrays contain node objects

    [{}, ...]
   
The node object contains a bias float and a weights array

    {bias: 1.00000, weights: []}
    
The weights is an array of floats, the key represents the previous node they are connected with

    [1.0000, 0.500, 0.750012168]
    
Everything togheter

    [[{bias: 1.00000, weights: [0.0005, ...]}, ...], ...]