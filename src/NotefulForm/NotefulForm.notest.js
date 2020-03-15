import React from 'react';
import NotefulForm from './NotefulForm'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'

//Smoke Test
it('renders without crashing', () => {
    // start by creating an element to render the component into
    const div = document.createElement('div')
    ReactDOM.render(<NotefulForm />, div)
    // Render the component -- Line 9 is the actual test
    // If something is wrong it will fail here.
    ReactDOM.unmountComponentAtNode(div)
});

describe(`NotefulForm component`, () => {
  const props = {
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a form.NotefulForm by default', () => {
    const tree = renderer 
    .create(<NotefulForm />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the NotefulForm given props', () => {
    const tree = renderer
    .create(<NotefulForm {...props} />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })
})