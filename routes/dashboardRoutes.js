app.get('/dashboard', (req, res) => {
    if (req.session.user) {
      // Pass user details to the template
      res.render('dashboard', { title: 'Dashboard', user: req.session.user });
    } else {
      // Redirect to login if user is not logged in
      res.redirect('/login');
    }
  });
  