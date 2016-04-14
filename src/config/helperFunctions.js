var helperFunctions = function () {
  var menuLinks = function (req) {
    var nav = [
      {
        Link: '/login',
        Text: 'Login'
      },
      {
        Link: '/',
        Text: 'Home'
      }
    ];
    if (!req.user) {
      return nav;
    } else if (req.user && req.user.role === 'admin') {
      nav.push({
        Link: '/backend',
        Text: 'Admin'
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