import * as mongoose from 'mongoose'
import Chalk from 'chalk'

const url = 'mongodb://127.0.0.1:27017/admin';

// { useMongoClient: true }
mongoose.connect(url);
// mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
    console.log(
        Chalk.green('连接数据库成功')
    );
})

db.on('error', function (error) {
    console.error(
        Chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function () {
    console.log(
        Chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(url, { server: { auto_reconnect: true } });
});

export default db;
