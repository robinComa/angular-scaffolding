# Front-end

myApp - AngularJS project.

## Environment

-   [Node.js](http://nodejs.org/)
-   [Ruby](https://www.ruby-lang.org/fr/)
-   [Compass](http://compass-style.org/install/)
-   [Gulp](http://gulpjs.com/)
-   [Bower](http://bower.io/)

## Getting started

    git clone git@github.com:robinComa/angular-scaffolding.git
    cd myApp/frontend
    npm install
    bower install
    gulp serve

## Check installation
Check all tests are OK.

	gulp test

## Commands

### gulp

	gulp                        // starting a dev mode server
	gulp serve                  // starting a dev mode server
	gulp serve:production       // starting a production mode server
	gulp test                   // starting unit and e2e tests (require a proxy server at localhost:9000)
	gulp test:unit              // starting unit tests
	gulp test:e2e               // starting e2e tests (require a proxy server at localhost:9000)
	gulp dist                   // building the application
