const app = require('./server.js');
const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`App listening on port ${port}!`))