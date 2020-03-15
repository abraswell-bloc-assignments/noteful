import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import Note from './Note'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

  //Smoke Test
  it('renders without crashing', () => {
    // start by creating an element to render the component into
    const div = document.createElement('div')
    ReactDOM.render(<Note />, div)
    // Render the component -- Line 9 is the actual test
    // If something is wrong it will fail here.
    ReactDOM.unmountComponentAtNode(div)
  });

describe(`Note component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: new Date(2018, 12, 15),
  }

  it('renders a .Note by default', () => {
    const tree = renderer
    .create(<Note />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the Note given props', () => {
    const tree = renderer  
    .create(<Note {...props} />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })
  
})
