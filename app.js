import { formatDate } from './utilities/formatDate.js'
import { extractDatesFromNoteContent } from './utilities/extractDatesFromNoteContent.js'
import { getNumberOfNotesByCategory } from './utilities/getNumberOfNotesByCategory.js'

let notes = [
    {
        id: 'mJw2V8QSJvXP8oxDRCxtx',
        name: 'Shopping list',
        created: formatDate('2021-04-20'),
        category: 'Task',
        content: 'Tomatoes, bread',
        archived: false
    },
    {
        id: 'IlGyAgKu2kaYqkTCz3XsP',
        name: 'The theory of evolution',
        created: formatDate('2021-04-27'),
        category: 'Random Thought',
        content: 'The evolution',
        archived: false
    },
    {
        id: '9yt7tuujSJSiEvpHv8bQW',
        name: 'New Feature',
        created: formatDate('2021-05-05'),
        category: 'Idea',
        content: 'Implement new feature on the 5/5/2021, I moved it from 3/5/2021',
        archived: false
    },
    {
        id: 'c1M6f6kyHTInmry1_DqVf',
        name: 'William Gaddis',
        created: formatDate('2021-05-07'),
        category: 'Random Thought',
        content: `Power doesn't come`,
        archived: false
    },
    {
        id: 'favgzqesK53D3SolNVa-E',
        name: 'Books',
        created: formatDate('2021-05-15'),
        category: 'Task',
        content: 'The Lean Startup',
        archived: false
    },
    {
        id: 'z9-LNyQqIELrBgfmzMezZ',
        name: 'Gym',
        created: formatDate('2022-01-01'),
        category: 'Task',
        content: 'Leg day',
        archived: false
    },
    {
        id: 'TT8qKOgNPsbh5Ehf1mfEW',
        name: 'Swimming pool',
        created: formatDate('2023-07-25'),
        category: 'Task',
        content: 'Improve my freestyle',
        archived: false
    }
];

function addNote(notes, name, category, content) {
    if (name.trim() !== '') {
        const date = Date.now();
        const newNote = {
            id: String(date),
            name: name,
            created: formatDate(date),
            category: category,
            content: content,
            archived: false
        };

        return [...notes, newNote];
    }
}

function editNote(notes, id, name, category, content) {
    const editedNotes = notes.map((note) => {
        if (note.id === id) {
            return { ...note, name, category, content };
        } else {
            return note;
        }
    });

    return editedNotes;
}

function toggleArchiveNote(notes, id, archived) {
    const editedNotes = notes.map((note) => {
        if (note.id === id) {
            return { ...note, archived };
        } else {
            return note;
        }
    });

    return editedNotes;
}

function removeNote(notes, id) {
    return notes.filter((note) => note.id !== id);
}

function removeAllNotes() {
    return [];
}

function renderNotesTable() {
    const notesTable = document.querySelector('#notes-table tbody');
    notesTable.innerHTML = '';
    notes.map((note) => {
        if (!note.archived) {
            const tr = document.createElement('tr');
            for (const key in note) {
                const td = document.createElement('td');
                if (key !== 'id') {
                    td.innerHTML = note[key];
                    tr.appendChild(td);
                }

                if (key === 'archived') {
                    td.innerHTML = extractDatesFromNoteContent(note.content).join(', ');
                }
            }

            const td1 = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.innerHTML = 'Edit';
            editButton.addEventListener('click', () => {
                document.querySelector('form').id = note.id;
                document.querySelector('h2').innerHTML = 'Edit Note';
                openModal();
            });
            td1.appendChild(editButton);
            tr.appendChild(td1);
            const td2 = document.createElement('td');
            const archiveButton = document.createElement('button');
            archiveButton.addEventListener('click', () => {
                const id = archiveButton.parentNode.parentNode.id;
                notes = toggleArchiveNote(notes, id, true);
                render();
            });
            archiveButton.innerHTML = 'Archive';
            td2.appendChild(archiveButton);
            tr.appendChild(td2);
            const td3 = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.innerHTML = 'Remove';
            removeButton.addEventListener('click', () => {
                const id = removeButton.parentNode.parentNode.id;
                notes = removeNote(notes, id);
                render();
            });
            td3.appendChild(removeButton);
            tr.appendChild(td3);
            tr.id = note.id;
            notesTable.appendChild(tr);
        }
    });
}

function renderSummaryTable() {
    const summaryTable = document.querySelector('#summary-table tbody');
    summaryTable.innerHTML = '';
    const categories = ['Task', 'Random Thought', 'Idea'];
    categories.map((category) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerHTML = category;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.innerHTML = getNumberOfNotesByCategory(notes, category, false);
        tr.appendChild(td2);
        const td3 = document.createElement('td');
        td3.innerHTML = getNumberOfNotesByCategory(notes, category, true);
        tr.appendChild(td3);
        summaryTable.appendChild(tr);
    });
}

function render() {
    renderNotesTable();
    renderSummaryTable();
}

function openModal() {
    document.querySelector('#modal').style.display = 'flex';
}

function closeModal() {
    document.querySelector('#name').value = '';
    document.querySelector('#category').value = 'Task';
    document.querySelector('#content').value = '';
    document.querySelector('#modal').style.display = 'none';
}

function submitForm(id) {
    const name = document.querySelector('#name').value;
    const category = document.querySelector('#category').value;
    const content = document.querySelector('#content').value;
    if (id !== '') {
        notes = editNote(notes, id, name, category, content);

    } else {
        notes = addNote(notes, name, category, content);
    }

    closeModal();
    render();

    return false;
}

const createButton = document.querySelector('#create-button');
createButton.addEventListener('click', () => {
    document.querySelector('form').id = '';
    document.querySelector('h2').innerHTML = 'Add New Note';
    openModal();
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm(form.id);
});

const cancelButton = document.querySelector('#cancel-button');
cancelButton.addEventListener('click', () => {
    closeModal();
});

const unarchiveAllButton = document.querySelector('#unarchive-all');
unarchiveAllButton.addEventListener('click', () => {
    notes = notes.map((note) => {
        if (note.archived) {
            return { ...note, archived: !note.archived };
        } else {
            return note;
        }
    });
    render();
});

const removeAllButton = document.querySelector('#remove-all');
removeAllButton.addEventListener('click', () => {
    notes = removeAllNotes();
    render();
});

render();
