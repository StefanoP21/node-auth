import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;

    try {
      mongoose.connect(mongoUrl, {
        dbName,
      });

      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      throw error;
    }
  }
}
