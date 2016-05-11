import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithTag,
    Simulate
} from 'react-addons-test-utils';
import Vote from '../../src/components/Vote';
import {expect} from 'chai';

describe('Component / Vote', () => {
    it('renders a button', () => {
        const component = renderIntoDocument(
            <Vote
            key={0}
            entry={"Trainspotting"}
            vote={() => {}}
            voted={false}
            isDisabled={false}/>
        );
        const button = findRenderedDOMComponentWithTag(component, 'button');
        expect(button.textContent).to.equal('Trainspotting');
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;
        const component = renderIntoDocument(
            <Vote
            key={0}
            entry={"Trainspotting"}
            vote={vote}
            voted={false}
            isDisabled={false}/>
        );
        const button = findRenderedDOMComponentWithTag(component, 'button');
        Simulate.click(button);
        expect(votedWith).to.equal('Trainspotting');
    });

    it('disable button when user has voted', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;
        const component = renderIntoDocument(
            <Vote
            key={0}
            entry={"Trainspotting"}
            vote={vote}
            voted={true}
            isDisabled={true}/>
        );
        const button = findRenderedDOMComponentWithTag(component, 'button');
        Simulate.click(button);
        expect(votedWith).to.equal(undefined);
        expect(button.hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Vote
            key={0}
            entry={"Trainspotting"}
            vote={() => {}}
            voted={true}
            isDisabled={true}/>
        );
        const button = findRenderedDOMComponentWithTag(component, 'button');
        expect(button.textContent).to.contain('Voted');
    });
});
