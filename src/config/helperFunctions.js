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
  var backendLinks = function (req) {
    var navSide = [
      {
        Link: '#/',
        Text: 'Home'
      },{
        Link: '#/categories',
        Text: 'Categories'
      },{
        Link: '#/tags',
        Text: 'Tags'
      }
    ];
    if (req.user && req.user.role === 'admin') {
      navSide.push({
        Link: '#/users',
        Text: 'Users'
      });
      return navSide;
    } else if (req.user && req.user.role === 'author') {
      return navSide;
    }
    return [];
  };
  return {
    menuLinks: menuLinks,
    backendLinks: backendLinks
  };
};

module.exports = helperFunctions;