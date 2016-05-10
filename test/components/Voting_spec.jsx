import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedComponentsWithType,
    Simulate
} from 'react-addons-test-utils';
import VotingContainer from '../../src/containers/VotingContainer';
import Vote from '../../src/components/Vote';
import {expect} from 'chai';

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <VotingContainer pair={["Trainspotting", "28 Days Later"]} />
        );
        console.log(component);
        const buttons = scryRenderedComponentsWithType(component, Vote);
        console.log(buttons);
        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Trainspotting');
        expect(buttons[1].textContent).to.equal('28 Days Later');
    });

    // it('invokes callback when a button is clicked', () => {
    //         let votedWith;
    //         const vote = (entry) => votedWith = entry;
    //         const component = renderIntoDocument(
    //             <Voting
    //             pair={["Trainspotting", "28 Days Later"]}
    //             vote={vote}/>
    //         );
    //         const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    //         console.log(votedWith);
    //         Simulate.click(buttons[0]);
    //         console.log(votedWith);
    //         expect(votedWith).to.equal('Trainspotting');
    // });
});
