export function getNumberOfNotesByCategory(notes, category, archived) {
    return notes.filter((note) => note.category === category && note.archived === archived).length;
}
