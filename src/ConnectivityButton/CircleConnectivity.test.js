import React from 'react'
import renderer from 'react-test-renderer'
import ConnectivityButton from './ConnectivityButton'
import ReactDOM from 'react-dom'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ConnectivityButton />, div)
  ReactDOM.unmountComponentAtNode(div)
  })

describe(`ConnectivityButton component`, () => {
  const props = {
    tag: 'a',
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a button.ConnectivityButton by default', () => {
    const tree = renderer
      .create(<ConnectivityButton />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the circle button from props', () => {
    const tree = renderer
      .create(<ConnectivityButton {...props} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
