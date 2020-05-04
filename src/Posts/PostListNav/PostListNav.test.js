import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import PostListNav from './PostListNav'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <PostListNav />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
  })

  describe(`PostListNav component`, () => {
    const props = {
      posts: [
        {
          "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Dogs",
          "modified": "2019-01-03T00:00:00.000Z",
          "memberid": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
          "content": "Corporis accusamus placeat.\n \rUnde."
        },
        {
          "id": "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Cats",
          "modified": "2018-08-15T23:00:00.000Z",
          "memberid": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
          "content": "Eos\n \rlaudantium."
        },
        {
          "id": "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Pigs",
          "modified": "2018-03-01T00:00:00.000Z",
          "memberid": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
          "content": "Occaecati dignissimos\nvoluptatum nihil."
        },
        {
          "id": "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Birds",
          "modified": "2019-01-04T00:00:00.000Z",
          "memberid": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
          "content": "Eum culpa odit."
        },
      ],
      members: [
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
    }
  
    it('renders a .PostListNav by default', () => {
      const wrapper = shallow(<PostListNav />)
      expect(toJson(wrapper)).toMatchSnapshot()
  Post
    
  
    it('renders a link in ul for each member in array', () => {
      const wrapper = shallow(<PostListNav {...props} />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })