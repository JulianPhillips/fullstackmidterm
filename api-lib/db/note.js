import { ObjectId } from 'mongodb';

export async function findNotes(db) {
  const notes = await db.collection('notes').find({}).toArray();
  return notes;
}

export async function deleteNoteById(db, noteId) {
  const note = await db
    .collection('notes')
    .deleteOne({ _id: ObjectId(noteId) });
  return note;
}

export async function insertNote(db, { content }) {
  const note = {
    content,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('notes').insertOne(note);
  note._id = insertedId;
  return note;
}

export async function findNoteById(db, id) {
  try {
    const note = await db
      .collection('notes')
      .findOne({ _id: new ObjectId(id) })
      .then(({ value }) => value);
    if (!note) return null;
    return note;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateNoteById(db, id, content) {
  return db
    .collection('notes')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { content } },
      { returnDocument: 'after' }
    )
    .then(({ value }) => value);
}
