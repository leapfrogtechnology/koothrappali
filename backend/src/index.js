import app from './app';
import config from './config';
import logger from './utils/logger';

app.set('port', config.app.port);
app.set('host', config.app.host);

app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Server started at http://${app.get('host')}:${app.get('port')}/api`);
});
