import React from 'react'
import renderer from 'react-test-renderer'
import AddNote from './AddNote'

describe(`AddNote component`, () => {
  const stubFolders = [
    {
      "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Important"
    },
    {
      "id": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Super"
    },
    {
      "id": "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Spangley"
    }
  ]

  it('renders the complete form', () => {
    const tree = renderer
    .create(<AddNote />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the select options from folders', () => {
    const select = renderer
    .create(<AddNote folders={stubFolders} />)
    .find('#note-folder-select')
    .toJSON()
    expect(select).toMatchSnapshot()
  })
})