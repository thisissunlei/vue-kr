const { Nuxt, Builder } = require('nuxt')

const app = require('express')();

const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

const config = require('../nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)



app.get('/', function(req, res) {
    res.redirect('/new/');
});


app.use(nuxt.render);


if (config.dev) {
  new Builder(nuxt).build()
  .then(listen)
  .catch((error) => {
    process.exit(1)
  });
}else {
  listen()
}

function listen() {

  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}
