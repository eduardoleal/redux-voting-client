import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as ActionCreators from '../ActionCreators';
import Winner from '../components/Winner';
import Vote from '../components/Vote';

export class Voting extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    hasWinner () {
        return !!this.props.winner
    }
    getPair () {
        return this.props.pair || [];
    }
    isDisabled (entry) {
        return !!this.props.hasVoted;
    }
    hasVotedFor (entry) {
        return this.props.hasVoted === entry;
    }
    render () {
        return (
            <div className="voting">
            {this.hasWinner() ?
                <Winner
                    winner={this.props.winner}/>:
                this.getPair().map((entry, key) =>
                    <Vote
                        key={key}
                        entry={entry}
                        vote={this.props.vote}
                        voted={this.hasVotedFor(entry)}
                        isDisabled={this.isDisabled(entry)}/>
                )
            }
            </div>
        )
    }
}

export const VotingContainer = connect(state => {
    return {
        pair: state.getIn(['vote', 'pair']),
        winner: state.get('winner'),
        hasVoted: state.get('hasVoted')
    }
}, ActionCreators)(Voting);
