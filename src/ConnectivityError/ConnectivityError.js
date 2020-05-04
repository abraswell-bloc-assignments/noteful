import React, {Component} from 'react'


class ConnectivityError extends Component {
    constructor(props) {
        super(props)
        this.state={
            hasError: false
        }
    }

    static getStateFromError(error) {
        return {hasError: true}
    }

    render() {
        if(this.state.hasError) {
            return (
                <div>
                    <h2>This is embarrassing...</h2>
                    <h3>Something went wrong!</h3>
                    <div className='error'>{this.props.message}</div>
                </div>
            )
        }
        return this.props.children

    }
}

export default ConnectivityError