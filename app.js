
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing POST request bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Path to the JSON file where user data is stored in the data folder
const usersFile = path.join(__dirname, 'data', 'users.json');

// Ensure that the users.json file exists
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, '[]');
}

// Function to read users from JSON file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Function to write users to JSON file
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// app.get('/Registration', (req, res) => {
//   const { username, email, password } = req.body; {
//   req.session.user = { username, email };
//   }
//   res.redirect('/dashboard');
// });


app.get('/registration', (req, res) => {
  res.render('registration', { title: 'Register' });
});


app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

app.get('/transli', (req, res) => {
  res.render('transli', { title: 'Transli' });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

// Registration route
// app.post('/register', async (req, res) => {
//   const { username, email, password, firstName, lastName } = req.body;
//   let users = readUsers();



app.post('/register', async (req, res) => {
const { username, email, password, firstName, lastName } = req.body;
const users = readUsers();

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.render('registration', { title: 'Register', error: 'Username already exists' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user data securely
  users.push({
    username,
    email,
    password: hashedPassword, // storing hashed password
    firstName,
    lastName,
  });

  // Save updated users to the JSON file
  writeUsers(users);

  // Redirect to success page
  res.redirect('/dashboard');
});

// // Success page route
// app.get('/success', (req, res) => {
//   res.render('success', { title: 'Registration Successful' });
// });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// const express = require('express');
// const app = express();
// const path = require('path');
// const fs = require('fs');
// const bcrypt = require('bcrypt');

// // Set the view engine to Pug
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// // Middleware for parsing POST request bodies (for form data)
// app.use(express.urlencoded({ extended: true }));

// // Serve static files (CSS, JS, Images)
// app.use(express.static(path.join(__dirname, 'public')));

// // Path to the JSON file where user data is stored
// const usersFile = path.join(__dirname, 'data', 'users.json');

// // Function to read users from JSON file
// function readUsers() {
//   try {
//     const data = fs.readFileSync(usersFile, 'utf8');
//     return JSON.parse(data);
//   } catch (err) {
//     return [];
//   }
// }

// // Function to write users to JSON file
// function writeUsers(users) {
//   fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
// }

// // Routes
// app.get('/', (req, res) => {
//   res.render('home', { title: 'Home' });
// });

// app.get('/login', (req, res) => {
//   res.render('login', { title: 'Login' });
// });

// app.get('/registration', (req, res) => {
//   res.render('registration', { title: 'Register' });
// });

// app.get('/contact', (req, res) => {
//   res.render('contact', { title: 'Contact' });
// });

// app.get('/transli', (req, res) => {
//   res.render('transli', { title: 'Transli' });
// });

// app.get('/about', (req, res) => {
//   res.render('about', { title: 'About' });
// });

// // Register route
// app.post('/register', async (req, res) => {
//   const { username, email, password, firstName, lastName } = req.body;
//   const users = readUsers();

//   // Check if user already exists
//   const existingUser = users.find(user => user.username === username);
//   if (existingUser) {
//     return res.render('registration', { title: 'Register', error: 'Username already exists' });
//   }

//   // Store the password as plain text (NOT recommended)
//   const newUser = {
//     username,
//     email,
//     password, // storing plain-text password
//     firstName,
//     lastName
//   };
  
//   users.push(newUser);

//   // Save updated users to the JSON file
//   writeUsers(users);

//   // Redirect to the dashboard with the user's details
//   res.redirect(`/dashboard?username=${username}`);
// });

// // Dashboard route to display user details
// app.get('/dashboard', (req, res) => {
//   const username = req.query.username;
//   const users = readUsers();
  
//   const user = users.find(u => u.username === username);

//   if (user) {
//     res.render('dashboard', { title: 'Dashboard', user });
//   } else {
//     res.redirect('/');
//   }
// });

// // Success route after registration
// app.get('/success', (req, res) => {
//   res.render('success', { title: 'Registration Successful' });
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



// ----------------------------------------------------------------






// const express = require('express');
// const app = express();
// const path = require('path');
// const fs = require('fs');
// const bcrypt = require('bcrypt');

// // Set the view engine to Pug
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// // Middleware for parsing POST request bodies (for form data)
// app.use(express.urlencoded({ extended: true }));

// // Serve static files (CSS, JS, Images)
// app.use(express.static(path.join(__dirname, 'public')));

// // Path to the JSON file where user data is stored in the data folder
// const usersFile = path.join(__dirname, 'data', 'users.json');

// // Function to read users from JSON file
// function readUsers() {
//   try {
//     const data = fs.readFileSync(usersFile, 'utf8');
//     return JSON.parse(data);
//   } catch (err) {
//     return [];
//   }
// }

// // Function to write users to JSON file
// function writeUsers(users) {
//   fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
// }

// // Routes
// app.get('/', (req, res) => {
//   res.render('home', { title: 'Home' });
// });

// app.get('/login', (req, res) => {
//   res.render('login', { title: 'Login' });
// });
// app.get('/about', (req, res) => {
//   res.render('about', { title: 'About' });
// });

// app.get('/registration', (req, res) => {
//   res.render('registration', { title: 'Register' });
// });
// app.get('/contact', (req, res) => {
//   res.render('contact', { title: 'contact' });
// });
// app.get('/about', (req, res) => {
//   res.render('about', { title: 'about' });
// });
// app.get('/transli', (req, res) => {
//   res.render('transli', { title: 'transli' });
// });

// app.get('/dashboard', (req, res) => {
//     res.render('dashboard');
//   });
  

// app.post('/register', async (req, res) => {
//   const { username, email, password, firstName, lastName } = req.body;
//   const users = readUsers();

//   // Check if user already exists
//   const existingUser = users.find(user => user.username === username);
//   if (existingUser) {
//     return res.render('register', { title: 'Register', error: 'Username already exists' });
//   }

//   // Store the password as plain text (NOT recommended)
//   users.push({
//     username,
//     email,
//     password, // storing plain-text password
//     firstName,
//     lastName,
//   });

//   // Save updated users to the JSON file
//   writeUsers(users);

//   // Redirect to success page
//   res.redirect('/success');
// });


// app.get('/success', (req, res) => {
//   res.render('success', { title: 'Registration Successful' });
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

