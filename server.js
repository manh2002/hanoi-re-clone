const express = require('express');
const path = require('path');

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets middleware
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home - Hanoi Re' });
});

// Additional routes for future expansion
app.get('/products', (req, res) => {
  res.render('index', { title: 'Products - Hanoi Re' });
});

app.get('/finance', (req, res) => {
  res.render('index', { title: 'Finance - Hanoi Re' });
});

app.get('/news', (req, res) => {
  res.render('index', { title: 'News - Hanoi Re' });
});

// Catch-all for 404 errors
app.use((req, res, next) => {
  res.status(404).render('error', { 
    title: '404 - Page Not Found',
    errorCode: 404, 
    message: 'The requested page could not be found.',
    contactInfo: {
      email: 'contact@hanoire.com',
      phone: '+84 24 3734 2828',
      website: 'https://www.hanoire.com'
    }
  });
});

// Error handling middleware (internal server errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: '500 - Internal Server Error',
    errorCode: 500, 
    message: 'Internal Server Error. Please try again later.',
    contactInfo: {
      email: 'contact@hanoire.com',
      phone: '+84 24 3734 2828',
      website: 'https://www.hanoire.com'
    }
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
