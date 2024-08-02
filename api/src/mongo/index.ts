// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

const uri =
  'mongodb+srv://guanhaha:rQRzQoOnXt1gEnIL@cluster0.wskvm4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  dbName: 'test', // 数据库名称
});
const db = mongoose.connection;

// 当连接失败的时候
db.on('error', (err) => {
  console.log('MongoDB 数据库连接失败！', err);
});
// 当连接成功的时候
db.once('open', () => {
  console.log('MongoDB 数据库连接成功！');
});

// eslint-disable-next-line import/prefer-default-export
export { default as Profile } from './model/profile';
