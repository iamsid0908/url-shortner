import mongoose from "mongoose"
export const connectMongo = async () => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(`${process.env.MONGO_DB}` , {
          autoIndex: true,
        })
        .then(() => {
          console.log('Mongo connected');
          resolve('Mongo connected');
        })
        .catch((err:any) => {
          console.error(err);
          reject(err);
        });
    });
};
