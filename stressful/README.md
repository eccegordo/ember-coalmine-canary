# Stressful

A dummy example to stress test ember cli and try to reproduce `FSEventStreamStart` errors in Node and Ember CLI
Note that there is not much going on this app at the moment other than a lot of resources. Will try to throw the kitchen sink in over time.

```
apple    -> apples
book     -> books
chair    -> chairs
picture  -> pictures
page     -> pages
key      -> keys
computer -> computers
```
Used custom blueprint generator to generate these  resources

```
ember g custom-crud-resource apple
ember g custom-crud-resource book
ember g custom-crud-resource chair
ember g custom-crud-resource picture
ember g custom-crud-resource page
ember g custom-crud-resource key
ember g custom-crud-resource computer
```
Note that the router.js was created manually


This README outlines the details of collaborating on this Ember application.

A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

