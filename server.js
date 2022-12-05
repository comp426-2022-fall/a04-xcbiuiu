import minimist from "minimist";
import express from "express";
import {roll} from "./lib/roll.js";

const args = minimist(process.argv.slice(2));
const app = express();
app.use(express.urlencoded({extended: true}));

let port = 5000;

if(args.port){
	port = args.port;
}

app.get('/app/', (req, res) => {
	res.status(200);
	res.send('200 OK');
});

app.get('/app/roll/', (req, res) => {
	res.send(roll(6,2,1));
	res.status(200);
});

app.post('/app/roll/', (req, res) => {
	res.send(roll(parseInt(req.body.sides), parseInt(req.body.dice), parseInt(req.body.rolls)));
	res.status(200);
});


app.get('/app/roll/:sides/', (req, res) => {
	res.send(roll(parseInt(req.params.sides), 2, 1));
	res.status(200);
});

app.get('/app/roll/:sides/:dice/', (req, res) => {
	res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1));
	res.status(200);
});

app.get('/app/roll/:sides/:dice/:rolls?', (req, res) => {
	res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls)));
	res.status(200);
});

app.use((req, res) => {
	res.send("404 NOT FOUND");
	res.status(404);
});

app.listen(port, () => {
	console.log("Server listening on port " + port);
});