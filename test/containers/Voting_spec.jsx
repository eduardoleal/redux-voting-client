import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {
    renderIntoDocument,
    scryRenderedComponentsWithType,
    findRenderedComponentWithType,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
import {Voting} from '../../src/containers/Voting';
import Vote from '../../src/components/Vote';
import Winner from '../../src/components/Winner';

describe('Container / Voting', () => {
    it('renders vote buttons', () => {
        const pair = ['Trainspotting', '28 Days Later'];
        const component = renderIntoDocument(
            <Voting pair={pair} />
        );
        const vote = scryRenderedComponentsWithType(component, Vote);
        expect(vote.length).to.equal(pair.length);
    });

    it('renders winner', () => {
        const pair = ['Trainspotting', '28 Days Later'];
        const component = renderIntoDocument(
            <Voting pair={pair} winner={pair[0]}/>
        );
        const winner = findRenderedComponentWithType(component, Winner);
    });

    it('renders just the winner when there is one', () => {
        const pair = ['Trainspotting', '28 Days Later'];
        const component = renderIntoDocument(
            <Voting pair={pair} winner={pair[0]}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = findRenderedComponentWithType(component, Winner);
        expect(winner).to.be.ok;
        expect(ReactDOM.findDOMNode(winner.refs.winner).textContent).to.contain('Trainspotting');
    });


    it('renders as a pure component', () => {
        const pair = ['Trainspotting', '28 Days Later'];
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');

        pair[0] = 'Sunshine';
        component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');
    });


    it('does update DOM when prop changes', () => {
        const pair = List.of('Trainspotting', '28 Days Later');
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');

        const newPair = pair.set(0, 'Sunshine');
        component = ReactDOM.render(
            <Voting pair={newPair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Sunshine');
    });
});
