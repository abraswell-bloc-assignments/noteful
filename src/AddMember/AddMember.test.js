import React from 'react'
import renderer from 'react-test-renderer'
import AddMember from './AddMember'
import ReactDOM from 'react-dom'


it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AddMember />, div)
    ReactDOM.unmountComponentAtNode(div)
    })

describe(`AddItemForm component`, () => {
  it('renders the complete form', () => {
    const wrapper = renderer
    .create(<AddMember />)
    .toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})