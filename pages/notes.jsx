import { fetcher } from '@/lib/fetch';
import { useState } from 'react';
import { useFormik } from 'formik';
const Notes = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const formik = useFormik({
    initialValues: {
      note: '',
    },
    onSubmit: async (values) => {
      const body = JSON.stringify({ content: values.note });
      const note = await fetcher(
        process.env.NEXT_PUBLIC_WEB_URI + '/api/notes',
        {
          method: 'POST',
          body: body,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setNotes([...notes, note.note]);
    },
  });

  return (
    <div>
      <h1>Notes</h1>

      <form onSubmit={formik.handleSubmit}>
        <input
          id="note"
          name="note"
          value={formik.values.note}
          onChange={formik.handleChange}
          placeholder="do full stack homework"
        />
        <button type="submit">create note</button>
      </form>
      <div>
        {notes.map((Note) => {
          if (Note._id) {
            return (
              <div key={Note._id}>
                <p>{Note.content}</p>
                <button
                  onClick={async () => {
                    await fetcher(
                      process.env.NEXT_PUBLIC_WEB_URI +
                        '/api/notes/' +
                        Note._id,
                      {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                      }
                    );
                    var removeIndex = notes
                      .map((note) => note._id)
                      .indexOf(Note._id);

                    let theNotes = [...notes];
                    theNotes.splice(removeIndex, 1);
                    setNotes(theNotes);
                  }}
                >
                  Delete Note
                </button>
                <button
                  onClick={async () => {
                    const body = JSON.stringify({
                      content: formik.values.note,
                    });

                    const note = await fetcher(
                      process.env.NEXT_PUBLIC_WEB_URI +
                        '/api/notes/' +
                        Note._id,
                      {
                        method: 'POST',
                        body: body,
                        headers: { 'Content-Type': 'application/json' },
                      }
                    );

                    let objIndex = notes.findIndex((note) => {
                      return note._id === Note._id;
                    });

                    let theNotes = [...notes];
                    theNotes[objIndex] = note.note;
                    setNotes(theNotes);
                  }}
                >
                  Edit Note
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  try {
    const notes = await fetcher(
      process.env.NEXT_PUBLIC_WEB_URI + '/api/notes',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    // toast.success('You have posted successfully');
    // contentRef.current.value = '';
    return {
      props: { notes: notes.notes }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
  }
}

export default Notes;
