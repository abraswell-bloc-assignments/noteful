import React from 'react'
import renderer from 'react-test-renderer'
import NotePageMain from './NotePageMain'

describe.only(`NotePageMain component`, () => {
  const props = {
    note: {
      "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Dogs",
      "modified": "2019-01-03T00:00:00.000Z",
      "folderid": "2",
      "content": "Corporis accusamus placeat.\n \rUnde."
    },
    match: {
      params: {
         noteId: "123"
      }
    }
  }

  it('renders a .NotePageMain by default', () => {
    const tree = renderer
      .create(<NotePageMain />)
      .toJSON()
      expect(tree).toMatchSnapshot()
  })

  it('renders a Note with note prop', () => {
    const note = renderer
      .create(<NotePageMain {...props} />)
      .find('Note')
      .toJSON()
    expect(note).toMatchSnapshot()
  })

  it(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    [{
      note: { "content": "Content with n r.\n \rafter n r." }
    }, {
      note: { "content": "Content with n.\nafter." }
    }].forEach(props => {
      const content = renderer
        .create(<NotePageMain {...props} />)
        .find('NotePageMain__content')
        .toJSON()
      expect(content).toMatchSnapshot()
    })
  })
})
