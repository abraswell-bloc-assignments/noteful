import React from 'react'
import ConnectivityForm from './ConnectivityForm'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'


it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ConnectivityForm />, div)
    ReactDOM.unmountComponentAtNode(div)
})

describe(`ConnectivityForm component`, () => {
  const props = {
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a form.ConnectivityForm by default', () => {
    const tree = renderer 
    .create(<ConnectivityForm />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the ConnectivityForm given props', () => {
    const tree = renderer
    .create(<ConnectivityForm {...props} />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })
})