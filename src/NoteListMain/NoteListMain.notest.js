import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import NoteListMain from './NoteListMain'

describe(`NoteListMain component`, () => {
  const props = {
    notes: [
      {
        "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        "name": "Dogs",
        "modified": "2019-01-03T00:00:00.000Z",
        "folderid": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        "content": "Corporis accusamus placeat.\n \rUnde."
      },
      {
        "id": "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
        "name": "Cats",
        "modified": "2018-08-15T23:00:00.000Z",
        "folderid": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        "content": "Eos\n \rlaudantium."
      },
      {
        "id": "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        "name": "Pigs",
        "modified": "2018-03-01T00:00:00.000Z",
        "folderid": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        "content": "Occaecati dignissimos\nvoluptatum nihil."
      },
      {
        "id": "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
        "name": "Birds",
        "modified": "2019-01-04T00:00:00.000Z",
        "folderid": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        "content": "Eum culpa odit."
      },
    ]
  }

    //Smoke Test
    it('renders without crashing', () => {
      // start by creating an element to render the component into
      const div = document.createElement('div')
      ReactDOM.render(<NoteListMain />, div)
      // Render the component -- Line 9 is the actual test
      // If something is wrong it will fail here.
      ReactDOM.unmountComponentAtNode(div)
    });

  it('renders a .NoteListMain by default', () => {
    const tree = renderer
    .create(<NoteListMain />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a Note in ul for each notes in array', () => {
    const ul = renderer
    .create(<NoteListMain {...props} />)
      .find('ul')
    .toJSON()
    expect(ul).toMatchSnapshot()
  })
})
