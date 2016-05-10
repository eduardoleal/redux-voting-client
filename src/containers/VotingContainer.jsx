import React from 'react';
import Winner from '../components/Winner';
import Vote from '../components/Vote';

export default React.createClass({
    hasWinner: function () {
        return !!!this.props.winner
    },
    getPair: function () {
        return this.props.pair || [];
    },
    isDisabled: function (entry) {
        return !!this.props.hasVoted;
    },
    hasVotedFor: function (entry) {
        return this.props.hasVoted === entry;
    },
    render: function () {
        return (
            <div className="voting">
                {this.hasWinner() ?
                    <Winner />:
                    this.getPair().map((entry, key) =>
                        <Vote
                            key={key}
                            entry={entry}
                            vote={() => this.hasWinner(entry)}
                            voted={this.hasVotedFor(entry)}
                            isDisabled={this.isDisabled(entry)}/>
                    )
                }
            </div>
        )
    }
});
