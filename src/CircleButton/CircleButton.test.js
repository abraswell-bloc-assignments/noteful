import React from 'react'
import renderer from 'react-test-renderer'
import CircleButton from './CircleButton'
import ReactDOM from 'react-dom'

//Smoke Test
it('renders without crashing', () => {
  // start by creating an element to render the component into
  const div = document.createElement('div')
  ReactDOM.render(<CircleButton />, div)
  // Render the component -- Line 9 is the actual test
  // If something is wrong it will fail here.
  ReactDOM.unmountComponentAtNode(div)
  });

describe(`CircleButton component`, () => {
  const props = {
    tag: 'a',
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a button.CircleButton by default', () => {
    const tree = renderer
      .create(<CircleButton />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the circle button from props', () => {
    const tree = renderer
      .create(<CircleButton {...props} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
