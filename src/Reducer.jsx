import {Map, List} from 'immutable';

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
            break;
        case 'VOTE':
            return vote(state, action.entry);
            break;
        default:
            return state;
    }
    return state;
}

function setState (state, newState) {
    return resetVote(state.merge(newState));
}

function resetVote(state) {
    const hasVoted = state.get('hasVoted');
    const currentPair = state.getIn(['vote', 'pair']);
    if (hasVoted && !currentPair.includes(hasVoted)) {
        return state.remove('hasVoted');
    }
    return state;
}

function vote (state, entry) {
    const currentPair = state.getIn(['vote', 'pair']);
    if (currentPair && currentPair.includes(entry)) {
        return state.set('hasVoted', entry);
    }
    return state;
}
