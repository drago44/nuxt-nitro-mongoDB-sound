import mongoose from 'mongoose';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.public.MONGODB_URI);
    console.log('connect');
  } catch (e) {
    console.error(e);
  }
});
