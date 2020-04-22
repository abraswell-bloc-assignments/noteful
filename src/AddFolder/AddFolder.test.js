import React from 'react'
import renderer from 'react-test-renderer'
import AddFolder from './AddFolder'
import ReactDOM from 'react-dom'


it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AddFolder />, div)
    ReactDOM.unmountComponentAtNode(div)
    })

describe(`AddItemForm component`, () => {
  it('renders the complete form', () => {
    const wrapper = renderer
    .create(<AddFolder />)
    .toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})