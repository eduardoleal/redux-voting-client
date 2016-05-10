import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render () {
        return (
            <button key={this.props.entry}
                disabled={this.props.isDisabled}
                onClick={() => this.props.vote(this.props.entry)}>
                <h1>{this.props.entry}</h1>
                {this.props.voted ?
                    <div className="label">Voted</div> :
                    null}
            </button>
        );
    }
}

Vote.propTypes = {
    entry: React.PropTypes.string.isRequired,
    vote: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool
};
