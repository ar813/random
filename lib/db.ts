import mysql from 'mysql2/promise';
import { Connection } from 'mysql2/promise';

let db: Connection | null = null;

export const getDB = async (): Promise<Connection> => {
  if (!db) {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'A4alghazali@',
      database: 'user_db',
    });
  }
  return db;
};
