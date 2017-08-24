import { Graph } from 'grapha'; 

export default class SpreadingActivationNetwork extends Graph {
    
    // Constructor
    // optional configuration json:
    // example
    // {
    //     'activationThreshold': 1,
    //     'decay': 1,
    //     'graph': {
    //         'isDirected': true,
    //         'isWeighted': true
    //     }
    // }
    constructor(conf) {
        // if we have graph settings, apply them
        let config = conf || {};
        if('graph' in config)
            super(conf.graph);
        else
            super();
        const defaultConf = {
            'activationThreshold': 0.1,
            'decay': 1
        };
        // set default configuration values or use the values provided by the config
        Object.keys(defaultConf).forEach(k => {
            this['_' + k] = k in config ? conf[k] : defaultConf[k];
        });
    }

    // Applies activation spreading on the graph
    // initialNodes: object with each initial active node and its initial activation
    // rounds: how many rounds of spreading activation should be applied
    // returns the list of activated nodes and their final activations
    spreadingActivation(initialNodes, rounds) {
        let active = initialNodes;

        const spread = () => {
            let activated = {};
            Object.keys(active)
                .filter(n => active[n] > this.getActivationThreshold())
                .forEach(n => {
                // for each child node of the active node
                this.nodesConnectedTo(n).forEach(c => {
                    // give activation to the child
                    if(!(c in activated))
                        activated[c] = 0;
                    activated[c] += (active[n] * this.getWeight(n, c)) * this.getDecay(); 
                });
            });
            active = activated;
        };
        Array(rounds).fill().forEach(() => spread());
        return active;
    }

    // Returns the activation threshold that each node must reach to be considered active
    getActivationThreshold() {
        return this._activationThreshold;
    }

    // Returns the decay value used in the spreading activation phase
    getDecay() {
        return this._decay;
    }
    
}