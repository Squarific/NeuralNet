NeuralNet
=========

This javascript module is made for applications that want to use neural network and train them using a evolutionary approach instead of backpropagation.

How to use
==========

    var neuralNet = new NeuralNet([settings, network]); //This creates a random network
    
The NeuralNet constructor accepts two objects, the first being a settings object the second an array that represents a network. If no network object is given it will default to a random network.

Methods
=======

    neuralNet.mutateNetwork([settings, network]);

Mutates the network by applying the following formula to all weights and biasses in the network:  `weight += (Math.random() * 2 - 1) * mutationRate`

If a settings and network object is passed it will use that instead of the neuralNet the function is called on.



    neuralNet.randomNetwork([hiddenLayers, nodePerLayer, inputNodes, outputNodes]);

This function returns a random network with the given settings, if not provided uses the ones of the network it was called on.



    neuralNet.runNetwork(inputNodes[, network]);
    
This function will return the calculated outputNodes, defaults to using the network of the neuralNet object it was called on.

Example output: [0.1948, 0.3849]

The outputNode values will always be in the range [0, 1] as the activation function is `1 / (1 + Math.exp(-sum))`


Settings
========

The settings object defaults to:

    {
        hiddenLayers: 2,            // The amount of hidden layers the network should have
        nodesPerLayer: 20,          // The amount of nodes for each hidden layer
        inputNodes: 2,              // The amount of input nodes the network will have
        outputNodes: 2              // The amount of output nodes
        mutationRate: 0.04          // The weights and bias will on average change this much
                                    // weight += (Math.random() * 2 - 1) * mutationRate
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
