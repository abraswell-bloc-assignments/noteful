import React, {Component} from 'react'


class NotefulError extends Component {
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
                // <div className='error'>{this.props.message}</div>
                <h2>Something went wrong!</h2>
            )
        }
        return this.props.children

    }
}

export default NotefulError