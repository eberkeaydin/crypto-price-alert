import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB Connected');

    // Veritabanına Ping At
    await mongoose.connection.db.command({ ping: 1 });
    console.log('MongoDB Connection Verified');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Hata varsa uygulamayı durdurun
  }
};

export default connectDB;
