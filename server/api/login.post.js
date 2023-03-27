import User from '@/server/models/user.js';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (e) => {
  // if (e.node.req.method === 'POST') {
  try {
    const user = await readBody(e);
    const userThis = await User.findOne({ email: user.email });

    if (!userThis) {
      const wrongEmail = createError({
        statusCode: 400,
        statusMessage: 'Email not register or wrong.',
        data: {},
      });
      sendError(e, wrongEmail);
    }

    if (!userThis.validPassword(user.password)) {
      const wrongPassword = createError({
        statusCode: 400,
        statusMessage: 'Wrong password',
        data: {},
      });
      sendError(e, wrongPassword);
    }

    const { _id } = userThis;
    const token = await jwt.sign({ _id }, 'mysecrettoken');
    return token;
  } catch (error) {
    sendError(e, error);
  }
  // }
});
