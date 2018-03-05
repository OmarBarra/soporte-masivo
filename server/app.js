const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/conf')
const path = require('path');
const http = require('http');
const app = express();

app.use(bodyParser.json( {limit:'200mb'} ));
app.use(bodyParser.urlencoded({
  extended: true,
  limit:'200mb'
}));


app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// const valida_layout = require('./routes/valida_layout')

// const bajaGroup = require('./routes/baja_grupo');
// app.use('/baja_grupo',bajaGroup);

const clt_plan = require('./routes/consulta_plan');
app.use('/consulta_plan',clt_plan);

app.use('/layout', require('./routes/routeLayout'));

app.use('/api/catalogo', require('./routes/routeCatalogo'));
app.use('/api/bajaplan', require('./routes/routeBajaPlan'));
app.use('/api/cambioplan', require('./routes/routeCambioPlan'));
app.use('/api/autorizacion', require('./routes/routeAutorizacion'));

// app.use('/layout/export', require('./routes/routeLayout'));

app.set('view engine', 'html');
app.get('*',(req,res)=>{
	res.sendFile(path.resolve('dist/index.html'));
});

const server = http.createServer(app);
const main = require('./config/main');

main.start()
	.then(()=>{
		server.listen(config.port,()=>{
			console.log('Running on localhost::' + config.port)
		})
})
