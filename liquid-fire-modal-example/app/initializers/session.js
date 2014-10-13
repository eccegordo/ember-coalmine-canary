// app/initializers/session.js

export default {
  name: 'session',
  initialize: function(container, app) {
    app.inject('route', 'session', 'service:session');
    app.inject('controller', 'session', 'service:session');
    // injecting into the components feels a little extreme
    // but our modals are components and in some cases will need access
    // the session object for context
    app.inject('component', 'session', 'service:session');
  }
};
