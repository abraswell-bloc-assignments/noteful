import React from 'react'

export default function ConnectivityfulForm(props) {
    const {className, ...otherProps} = props
    return(
        <form
            className={['Connectivity-form', className].join(' ')}
            action='#'
            {...otherProps}
        />
    )
}

