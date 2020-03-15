import React from 'react';
import renderer from 'react-test-renderer'
import AddFolder from './AddFolder'
import ReactDOM from 'react-dom'

//Smoke Test
it('renders without crashing', () => {
    // start by creating an element to render the component into
    const div = document.createElement('div')
    ReactDOM.render(<AddFolder />, div)
    // Render the component -- Line 9 is the actual test
    // If something is wrong it will fail here.
    ReactDOM.unmountComponentAtNode(div)
    });

describe(`AddItemForm component`, () => {
  it('renders the complete form', () => {
    const wrapper = renderer
    .create(<AddFolder />)
    .toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})