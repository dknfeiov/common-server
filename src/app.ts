import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import router from './routes/index';
import db from './mongodb/database';
import { RequestHandler } from 'express';
import { Token } from './middleware/token';


var app = express();
console.log(db.config)

// view engine setupy
// app.set('views', './views');
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// token 校验
app.use('/*', Token.check);

router(app);
// app.use('/*', index);
// app.use('/users', users);

// catch 404 and forward to error handler
/* app.use(function(err, req, res, next) {
  next(err);
}); */

// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */


app.use(express.static('./public'));
app.listen(3000);



