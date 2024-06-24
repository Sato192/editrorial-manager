const express = require('express');
const cors = require('cors');
const path = require('path');
const adminRouter = require('./routes/admin');
const authorRouter = require('./routes/author');
const reviewerRouter = require('./routes/reviewer');
const authRouter = require('./routes/auth');
const editorRouter = require('./routes/editor');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Editor = require('./models/editor');
const Reviewer = require('./models/reviewer');
const Admin = require('./models/admin')
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const crypto = require('crypto');

const MONGO_URL = 'mongodb+srv://sato:S9GRELgPwGaHLzpj@cluster1964.hc81wfg.mongodb.net/editorial?retryWrites=true&w=majority&appName=cluster1964';
const store = new MongodbStore(
        {
                uri: MONGO_URL,
                collection: 'sessions'
        })

const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
                cb(null,crypto.randomBytes(4).toString('hex') + '_' + file.originalname);
        }
});
const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
                cb(null, true);
        }
        else {
                cb(null, false);
        }
}

app = express();
app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('file'))
app.use(session({
        secret: "my seceret",
        resave: false,
        saveUninitialized: false,
        store: store
}))

app.use((req, res, next) => {
        if (req.session.sato === "author") {
                Author.findById(req.session.user._id)
                .then(user => {
                        req.user = user;
                        next();
                }).catch(error => {
                        console.log(error)
                });
        }
        else if (req.session.sato === "admin") {
                Admin.findById(req.session.user._id)
                        .then(user => {
                                req.user = user;
                                next();
                        }).catch(error => {
                                console.log(error)
                        });
        }
        else if (req.session.sato === "editor") {
                Editor.findById(req.session.user._id)
                        .then(user => {
                                req.user = user;
                                next();
                        }).catch(error => {
                                console.log(error)
                        });
        } else if (req.session.sato === "reviewer") {
                Reviewer.findById(req.session.user._id)
                        .then(user => {
                                req.user = user;
                                next();
                        }).catch(error => {
                                console.log(error)
                        });
        }
        else {
                next();
        }
});

app.get('/test2', (req, res) => {
        const data = req.session.sato;
        console.log(data);
        console.log(req.user);
        res.send(data);
})

app.get('/getname', (req, res) => {
        try {
                const data = req.user.name;
                res.send(data);

        } catch (error) {
                console.log('eroor reading name');
        }
})
app.post('/logout', (req, res) => {
        console.log('logout')
        req.session.destroy((err) => {
                if (err) {
                        return res.status(500).send('Failed to destroy session');
                }
                res.send('Logged out');
        });
})
app.use('/auth', authRouter);
app.use('/author', authorRouter);
app.use('/admin', adminRouter);
app.use('/editor', editorRouter);
app.use('/reviewer', reviewerRouter);

mongoose.connect(MONGO_URL)
        .then(result => {
                app.listen(3000, () => {
                        console.log("listening on port 3000")
                });

        }
        ).catch(error => {
                console.log(error);
        });


// mongoConnect(client=>{
//     //console.log(client);
//     app.listen(3000 ,() => {
//         console.log("listening on port 3000");
// })
// })
