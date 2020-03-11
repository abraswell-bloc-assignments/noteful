import React, {Component} from 'react'
import './CircleButton.css'


 class NavCircleButton extends Component {

    render(){
    const { tag, className, children, ...otherProps } = this.props

    return React.createElement(
        
        this.props.tag,
        {
            className: ['NavCircleButton', this.props.className].join(' '),
            ...otherProps
        },
        this.props.children

        
    )

    }
}

NavCircleButton.defaultProps ={
    tag: 'a'
}

export default NavCircleButton