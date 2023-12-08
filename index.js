const express = require('express');

const app = express();

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));

// Route to render the form
app.get('/', (req, res) => {
  res.render('form'); // Renders the form.ejs template
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { username, email } = req.body; // Access form data submitted via POST

  // Redirect to a success page or any other action
  // res.send('Form submitted successfully!');
  res.render('submitted', { username, email });
});

module.exports = app.listen(8080, () => {
});
