import chai from 'chai';
import { SpreadingActivationNetwork } from '../lib/spreada.js';

chai.expect();

const expect = chai.expect;

let lib;
describe('spreada-js - ES6 Spreading Activation Network algorithm library - tests:', () => {
    it('should exist', () => {
        let SAnet = new SpreadingActivationNetwork({'graph': {'isDirected': true, 'isWeighted': true}});
        SAnet.addNode('A');
        SAnet.addNode('B');
        SAnet.addEdge('A', 'B', 123);
        expect(SAnet.hasNode('A')).to.equal(true);
        expect(SAnet.hasNode('B')).to.equal(true);
        expect(SAnet.hasEdge('A', 'B')).to.equal(true);
        expect(SAnet.getWeight('A', 'B')).to.equal(123);
    });

    describe('configuration', () => {
        it('should properly read the configuration json', () => {
            const config = {
                'activationThreshold': 0.3,
                'decay': 0.9,
                'graph': {
                    'isWeighted': true,
                    'isDirected': true
                }
            };
            let SANconfig = new SpreadingActivationNetwork(config);
            expect(SANconfig.getActivationThreshold()).to.equal(0.3);
            expect(SANconfig.getDecay()).to.equal(0.9);
            expect(SANconfig.isDirected).to.equal(true);
            expect(SANconfig.isWeighted).to.equal(true);
        });
    });

    describe('spreadingActivation', () => {
        it('should spread activation to its neighbors', () => {
            let SAN = new SpreadingActivationNetwork();
            SAN.addNode('A');
            SAN.addNode('B');
            SAN.addNode('C');
            SAN.addEdge('A', 'B', 2);
            SAN.addEdge('C', 'B', 1);

            const solution = SAN.spreadingActivation({'A': 2, 'C': 1}, 1);
            expect(solution['B']).to.exist;
        });
    });
});