'use strict';


import tag from './tag.route'
import analysis from './analysis.route'
import doc from './doc.route'
import user from './user.route'


export default app => {
  app.use('/tag', tag);
  app.use('/analysis', analysis);
  app.use('/doc', doc);
  app.use('/user', user);
}