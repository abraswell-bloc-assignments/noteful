import React from 'react'
import renderer from 'react-test-renderer'
import CircleButton from './CircleButton'
import ReactDOM from 'react-dom'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CircleButton />, div)
  ReactDOM.unmountComponentAtNode(div)
  })

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
