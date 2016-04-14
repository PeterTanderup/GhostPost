var helperFunctions = function () {
  var menuLinks = function (req) {
    var nav = [
      {
        Link: '/',
        Text: 'Home'
      }
    ];
    if (!req.user) {
      nav.push({
        Link: '/login',
        Text: 'Login'
      });
      return nav;
    } else if (req.user && req.user.role === 'admin') {
      nav.push({
        Link: '/backend',
        Text: 'Admin'
      });
      nav.push({
        Link: '/auth/profile',
        Text: 'Profile'
      });
      nav.push({
        Link: '/auth/logout',
        Text: 'Logout'
      });
      return nav;
    } else if (req.user && req.user.role === 'author') {
      nav.push({
        Link: '/backend',
        Text: 'Author'
      });
      nav.push({
        Link: '/auth/profile',
        Text: 'Profile'
      });
      nav.push({
        Link: '/auth/logout',
        Text: 'Logout'
      });
      return nav;
    } else if (req.user && req.user.role === 'user') {
      nav.push({
        Link: '/auth/profile',
        Text: 'Profile'
      });
      nav.push({
        Link: '/auth/logout',
        Text: 'Logout'
      });
      return nav;
    }
    return nav;
  };
  return {
    menuLinks: menuLinks
  };
};

module.exports = helperFunctions;