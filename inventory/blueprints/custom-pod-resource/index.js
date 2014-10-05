// TODO: import these as proper modules and don't piggyback or assume they are installed with ember cli
var inflection  = require('../../node_modules/ember-cli/node_modules/inflection');
var stringUtils = require('../../node_modules/ember-cli/lib/utilities/string');

module.exports = {
  description: 'generate pod based resource stub for custom pod structure',

  locals: function(options) {
    var type = options.entity.name || '<UNKNOWN>';

    var typePlural   = inflection.pluralize(type);
    var typeSingular = inflection.singularize(type);

    var capPlural    = stringUtils.capitalize(typePlural);
    var capSingular  = stringUtils.capitalize(typeSingular);

    var apiNamespace = 'api';


    return {
      typePlural: typePlural,
      typeSingular: typeSingular,
      capPlural: capPlural,
      capSingular: capSingular,
      apiNamespace: apiNamespace
    };
  }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
