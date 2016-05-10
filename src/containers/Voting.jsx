import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from '../components/Winner';
import Vote from '../components/Vote';

export default class Voting extends React.Component {
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
                <Winner winner={this.props.winner}/>:
                this.getPair().map((entry, key) =>
                <Vote
                key={key}
                entry={entry}
                vote={() => this.hasWinner(entry)}
                voted={this.hasVotedFor(entry)}
                isDisabled={this.isDisabled(entry)}/>)
            }
            </div>
        )
    }
}
