import React, {Component} from 'react'
import './ConnectivityButton.css'


 class NavConnectivityButton extends Component {

    render(){
    const { tag, className, children, ...otherProps } = this.props

    return React.createElement(
        
        this.props.tag,
        {
            className: ['NavButton', this.props.className].join(' '),
            ...otherProps
        },
        this.props.children

        
    )

    }
}

NavConnectivityButton.defaultProps ={
    tag: 'a'
}

export default NavConnectivityButton