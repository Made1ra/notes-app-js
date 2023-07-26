const notes = [
    {
        id: 'mJw2V8QSJvXP8oxDRCxtx',
        name: 'Shopping list',
        created: formatDate('2021-04-20'),
        category: 'Task',
        content: 'Tomatoes, bread',
        dates: '',
        archived: false
    },
    {
        id: 'IlGyAgKu2kaYqkTCz3XsP',
        name: 'The theory of evolution',
        created: formatDate('2021-04-27'),
        category: 'Random Thought',
        content: 'The evolution',
        dates: '',
        archived: false
    },
    {
        id: '9yt7tuujSJSiEvpHv8bQW',
        name: 'New Feature',
        created: formatDate('2021-05-05'),
        category: 'Idea',
        content: 'Implement new feature on the 5/5/2021, I moved it from 3/5/2021',
        dates: '5/5/2021, 3/5/2021',
        archived: false
    },
    {
        id: 'c1M6f6kyHTInmry1_DqVf',
        name: 'William Gaddis',
        created: formatDate('2021-05-07'),
        category: 'Random Thought',
        content: `Power doesn't come`,
        dates: '',
        archived: false
    },
    {
        id: 'favgzqesK53D3SolNVa-E',
        name: 'Books',
        created: formatDate('2021-05-15'),
        category: 'Task',
        content: 'The Lean Startup',
        dates: '',
        archived: false
    },
    {
        id: 'z9-LNyQqIELrBgfmzMezZ',
        name: 'Gym',
        created: formatDate('2022-01-01'),
        category: 'Task',
        content: 'Leg day',
        dates: '',
        archived: false
    },
    {
        id: 'TT8qKOgNPsbh5Ehf1mfEW',
        name: 'Swimming pool',
        created: formatDate('2023-07-25'),
        category: 'Task',
        content: 'Improve my freestyle',
        dates: '',
        archived: false
    }
];

function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}

function addNote(notes, name, category, content) {
    if (name.trim() !== '') {
        const newNote = {
            id: Date.now(),
            name: name,
            created: '',
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

function toggleArchiveNote(id, archived) {
    const editedNotes = notes.map((note) => {
        if (note.id === id) {
            return { ...note, archived: !archived };
        } else {
            return note;
        }
    });
    return editedNotes;
}

function removeNote(id) {
    return notes.filter((note) => note.id !== id);
}

function extractDatesFromNoteContent(content) {
    const regex = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
    return content.match(regex) || [];
}

function countNotesByCategory(archived) {
    return notes
        .filter((note) => note.archived === archived)
        .reduce((acc, note) => {
            acc[note.category] = (acc[note.category] || 0) + 1;
            return acc;
        }, {});
}

export { notes, addNote, editNote, toggleArchiveNote, removeNote, extractDatesFromNoteContent, countNotesByCategory };
