let express = require('express');
let ejs = require('ejs');
let fs = require('fs');
let path = require('path');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", 'ejs');

const statsFilePath = path.join(__dirname, 'wishStats.json');

let wishStats = {};

function loadStats() {
    try {
    if (fs.existsSync(statsFilePath)) {
        const data = fs.readFileSync(statsFilePath, 'utf8');
        wishStats = JSON.parse(data);
    } else {
        wishStats = {
        'Luck': 0,
        'Love': 0,
        'Money': 0
        };
        saveStats();
    }
    } catch (error) {
    console.error('Error loading stats:', error);
    wishStats = {
        'Luck': 0,
        'Love': 0,
        'Money': 0
    };
  }
}

function saveStats() {
    try {
        fs.writeFileSync(statsFilePath, JSON.stringify(wishStats, null, 2));
    } catch (error) {
        console.error('Error saving stats:', error);
    }
}

loadStats();

app.get('/', function (req, res) {
    res.render("home.ejs", {});
});

app.get('/leave', function (req, res) {
    res.render("leave.ejs", {});
});

app.get('/stats', function (req, res) {
    res.render("stats.ejs", { wishStats: wishStats });
});

app.post('/record-wish', function (req, res) {
    const wishType = req.body.wishType;

    if (wishType) {
        if (wishStats[wishType]) {
            wishStats[wishType]++;
        } else {
            wishStats[wishType] = 1;
        }
    
    saveStats();
    
    res.json({ success: true, wishType: wishType, count: wishStats[wishType] });
  } else {
    res.json({ success: false, error: 'No wish type provided' });
  }
});

app.get('/get-stats', function (req, res) {
    res.json(wishStats);
});

app.use(express.static('public'));

app.get('/test', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    console.log('Current wish stats:', wishStats);
});