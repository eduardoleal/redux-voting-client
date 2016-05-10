import React from 'react';

export default class Vote extends React.Component {
    render () {
        return (
            <button key={this.props.entry}
                disabled={this.props.isDisabled}
                onClick={this.props.vote(this.props.entry)}>
                <h1>{this.props.entry}</h1>
                {this.props.voted ?
                    <div className="label">Voted</div> :
                    null}
            </button>
        );
    }
}
