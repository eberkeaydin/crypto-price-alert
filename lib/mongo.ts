import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB Already Connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    console.log('MongoDB Connected');

    // Ensure database object exists before calling .admin().ping
    if (!mongoose.connection.db) {
      throw new Error('Database object is undefined after connection.');
    }

    // Verify MongoDB connection with ping
    const admin = mongoose.connection.db.admin();
    const pingResponse = await admin.ping();
    console.log('MongoDB Connection Verified:', pingResponse);

  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Stop execution on failure
  }
};

export default connectDB;
