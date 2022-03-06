import { ValidateProps } from '@/api-lib/constants';
import { findNotes, insertNote } from '@/api-lib/db';
import { database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const notes = await findNotes(req.db);

  res.json({ notes });
});

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
    const note = await insertNote(req.db, {
      content: req.body.content,
    });

    return res.json({ note });
  }
);

export default handler;
