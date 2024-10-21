app.post('/register', async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    let users = readUsers();
  
    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.render('registration', { title: 'Register', error: 'Username already exists' });
    }
  
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Store user data securely
    const newUser = {
      username,
      email,
      password: hashedPassword, // storing hashed password
      firstName,
      lastName,
    };
    users.push(newUser);
  
    // Save updated users to the JSON file
    writeUsers(users);
  
    // Store the registered user in the session
    req.session.user = newUser;
  
    // Redirect to dashboard
    res.redirect('/dashboard');
  });
  