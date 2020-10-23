const express = require('express');
const gameController = require('./controllers/game');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');
const flash = require('connect-flash');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 3000;

let JobController = require('./controllers/JobController');
let DetectControllor = require('./controllers/DetectController');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
// mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once('open', function() {
    console.log('Connected to MongoDB');
});
db.on('error', function(err) {
    console.log(err);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use(flash());

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE";
        return cb(error, false)
    }
    cb(null, true)
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});
const upload = multer({ storage });
app.use('/fileupload', upload.single('file'), (req, res) => {
    res.send('file uploaded');
});
// Passport Config
require('./config/passport')(passport);
// require('./config/teacher_passport')(passport);


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(__dirname + '/../client/dist'))
    .get('/', (req, res) => res.status(200).send('This class is awesome!'))
    .use('/game', gameController)
    .use('/job', JobController.store)
    .use('/jobinfo', JobController.info)
    .use('/jobupdate', JobController.update)
    .use('/jobread_Sai5', JobController.readSai5)
    .use('/jobread_Petch', JobController.readPetch)
    .use('/detectdata', DetectControllor.info)
    .use('/detectdatacreate', DetectControllor.store)
    .use('/detectdatadelete', DetectControllor.delete)
    .use('/detectdatacheck', DetectControllor.check)

.use((err, req, res, next) => {
    console.error(err);
    const errorCode = err.code || 500;
    res.status(errorCode).send({ message: err.message });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));