const app = require('./config/express')();

const port = app.get('port');
require('./config/database');

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
