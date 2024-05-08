const express = require('express');
const app = express();

app.use(express.static('web'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'pug');

app.post('/submit', (req, res) => {
  res.render('submit', {name: req.body.name, email: req.body.email});
});

const PORT = process.env.PORT || 3040;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
