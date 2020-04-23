
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'


// This component is rendered in the sidebar for the '/' and 'folder/:folderid' routes
export default class NoteListNav extends React.Component {
    static contextType = ApiContext
    render() {
        const { folders = [], notes = [] } = this.context
        return(
            <aside className='NoteListNav'>
                <ul className='NoteListNav__list'>
                    { /* Loop through the array of folders passed as a prop*/ }
                    { /* Create list item for each folder in the array */}
                    {folders.map(folder =>
                        
                        <li key={folder.id}>
                            <NavLink
                                className='NoteListNav__folder-link'
                                to={`/folders/${folder.id}`}
                            >
                                <span className='NoteListNav__num-notes'>
                                    {countNotesForFolder(notes, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='NoteListNav__button-wrapper'>
                    <CircleButton
                        tag={Link}
                        to='/add-folder'
                        type='button'
                        className='NoteListNav__add-folder-button'
                    >
                        <FontAwesomeIcon icon={['fa', 'plus']} />
                        <br />
                        Folder
                    </CircleButton>
                </div>
            </aside>
        )
    }
}


NoteListNav.defaultProps = {
folders: []
}

