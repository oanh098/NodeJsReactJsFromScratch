const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

//app.use(cors(corsOptions));//client must on port 8081 to allow access server
app.use(cors());
//parse request of content-type - applicaion/x-www-form-urlencoded
// bodyParser, parses the request body to be a readable json format
//The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({ extended: true }));
// parse request of content-type - application/json
app.use(bodyParser.json());


app.use(bodyParser.json());


const db = require('./app/models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected well to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    })

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});


require('./app/routes/tutorial.routes')(app, {});

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});

