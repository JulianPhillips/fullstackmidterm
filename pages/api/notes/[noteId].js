import { ValidateProps } from '@/api-lib/constants';
import { updateNoteById, deleteNoteById } from '@/api-lib/db/note';
import { database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.post(
  validateBody({
    type: 'object',
    properties: {
      content: ValidateProps.notes.content,
    },
    required: ['content'],
    additionalProperties: false,
  }),
  async (req, res) => {
    const content = req.body.content;

    const note = await updateNoteById(req.db, req.query.noteId, content);

    if (!note) {
      return res.status(404).json({ error: { message: 'Note is not found.' } });
    }

    return res.json({ note });
  }
);

handler.delete(async (req, res) => {
  const note = await deleteNoteById(req.db, req.query.noteId);

  if (!note) {
    return res.status(404).json({ error: { message: 'Note is not found.' } });
  }

  return res.json({ note });
});

export default handler;
