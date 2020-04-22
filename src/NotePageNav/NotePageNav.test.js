import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import NotePageNav from './NotePageNav'

it('renders without crashing', () => {

  const div = document.createElement('div')
  ReactDOM.render(<NotePageNav />, div)
  ReactDOM.unmountComponentAtNode(div)
  })

describe(`NotePageNav component`, () => {
  it('renders a .NotePageNav by default', () => {
    const wrapper = renderer
    .create(<NotePageNav />)
    .toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it.skip('renders a h3 with folder name when in props', () => {
    const props = {
      match: {
        params: {
          noteId: 'test-note-id'
        }
      }
    }
    const context = {
      notes: [{ id: 'test-note-id', folderid: 'test-folder-id' }],
      folders: [{ id: 'test-folder-id', name: 'Important' }]
    }

    const h3 = renderer
    .create(<NotePageNav {...props} />, context)
    .find('.NotePageNav__folder-name')
    .toJSON()
    expect(h3).toMatchSnapshot()
  })
})