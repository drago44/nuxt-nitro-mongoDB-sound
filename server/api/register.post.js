import jwt from 'jsonwebtoken';
import User from '@/server/models/user.js';

export default defineEventHandler(async (e) => {
  // if (e.node.req.method === 'POST') {
  try {
    const user = await readBody(e);
    const isExist = await User.exists({ email: user.email });

    if (isExist) {
      const userExist = createError({
        statusCode: 409,
        statusMessage: 'User already exists',
        data: {},
      });
      sendError(e, userExist);
    }

    const newUser = new User(user);

    newUser.setPassword(user.password);
    await newUser.save();

    const { _id } = newUser;
    const token = await jwt.sign({ _id }, 'mysecrettoken');
    return token;
  } catch (error) {
    sendError(e, error);
  }
  // }
});
