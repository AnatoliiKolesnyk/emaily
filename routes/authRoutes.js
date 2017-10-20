const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    console.log('Hit /auth/callback');
    next();
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user || 'You are logged out now!');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user || 'No user');
  });
}
