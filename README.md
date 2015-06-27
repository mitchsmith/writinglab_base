# writinglab-django-angular-boilerplate

## Installation

*NOTE: Requires [virtualenv](http://virtualenv.readthedocs.org/en/latest/),
[virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/) and
[Node.js](http://nodejs.org/).*

* Fork this repository.
* `$ mkproject writinglab-djangular`
* `$ git clone git@github.com:<your username>/writinglab-django-angular-boilerplate.git ./`
* ~~`$ mkvirtualenv writinglab-djangular`~~
* ~~`$ cd writinglab-django-angular-boilerplate/`~~
* `$ pip install -r requirements.txt`
* ~~`$ npm install -g bower`~~
* `$ sudo npm install -g bower`
* `$ npm install`
* `$ bower install`
* `$ python manage.py migrate`
* `$ python manage.py runserver`

## Creating an Angular frontend interface to a DRF API endpoint

*EXAMPLE ENDPOINT: localhost:8000/api/v1/accounts/*

* Enable HTML5 routing for AngularJS (get rid of ugly hash routing)
    * Create a config.js for the root module (eg. static/javascripts/writinglab.config.js)
    * Add the config as a depencency in the root module (eg. static/javascripts/writinglab.js)
* Configure AngularJS CSRF settings to harmonize with Django cookie and headers
    * xsrfHeaderName = 'X-CSRFToken'(eg. static/javascripts/writinglab.js)
    * xsrfCookieName = 'csrftoken' (eg. static/javascripts/writinglab.js)
* Define the service (eg. static/javascripts/authentication/services/authentication.service.js)
    * Create the factory (eg. Authentication)
    * Add methods (eg. register, which corresponds to Django Account.create ) 
* Create the user interface
    * Create an Angular template for the partial (eg. static/templates/authentication/register.html)
    * Create an Angular controller for the module (eg. static/javascripts/authentication/controllers/register.controller.js)
    * Create Angular routes for the module (eg. static/javascripts/writinglab.routes.js)
    * Define the module and it's dependencies (eg. static/javascripts/authentication/authentication.module.js)
    * Update the root module to include it's new dependencies (eg. static/javascripts/writinglab.js)
    * Include the new js files in the appropriate Django template (eg. templates/javascripts.html)
* Create/edit layout template for the navbar register controll (eg. static/templates/layout/navbar.html) 

##A more general example

*SAME THING FOR POSTS: localhost:/api/v1/posts/ and '/api/v1/accounts/' + username + '/posts/'*

* static/javascripts/posts/posts.module.js (define module)
* static/javascripts/writinglab.js (add module as a dependency)
* templates/javascripts.html (add module script tag to django template)
* static/javascripts/posts/services/posts.service.js (define the service ie. create a factory)
* templates/javascripts.html (add service script tag to django template)
* static/templates/layout/index.html (add/modify layout template. Example employs a directive, posts)
    * The posts interface employs a snackbar utility for communicating the status of post actions:
    * static/javascripts/utils/utils.module.js (the module)
    * static/javascripts/utils/services/snackbar.service.js (the service)
    * static/javascripts/writinglab.js (add the utis module as a dependency)
* templates/javascripts.html (add utils and the snackbar service script tag to django template)
* static/javascripts/layout/controllers/index.controller.js (layout controller for the index page)
* static/javascripts/writinglab.routes.js (append the route for the index)
* static/javascripts/posts/directives/posts.directive.js (define the directive, post, used in the template)
* templates/javascripts.html (add the directives script tag to the django template)
* static/javascripts/posts/controllers/posts.controller.js (controller for the posts directive -- lots of good examples of formatting and layout methods here)
* templates/javascripts.html (Add the controller js tag)
* static/templates/posts/posts.html (template for the posts directive -- ng-cloak masks fouc, neat!)
* static/javascripts/posts/directives/post.directive.js (single post directive "post")
* static/templates/posts/post.html (single post directive template)
* static/stylesheets/styles.css (a couple of css declarations for post elements)

*MORE FORM HANDLING: button and modal dialog with snackbar messaging*

* static/templates/layout/index.html (add button with ng-show, ng-dialog, and ng-dialog-controller)
* static/templates/posts/new-post.html (** not clear what the double underscore in element id's about.)
* static/javascripts/posts/controllers/new-post.controller.js (new post form controller)
    * Lots going on here:
    * A bunch of deps ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts']
    * Quite a few unfamilliar builtin methods: $rootScope.$broadcast, $scope.closeThisDialog(), etc.
    * createPostSuccessFn calls Snackbar.show() (See tutorial excerpt 1 below)
* templates/javascripts.html (Add the create controller js tag)

## Another useful example

### (A good candidate for turning into a generic stub)

*Profiles (Endpoints exist, so it's all Angular)*

* Define the nodules in static/javascripts/profiles/profiles.module.js
    * .controllers (with empty dependency list)
    * .services (with empty dependency list)
* Register the profile modules as deps in the root app static/javascripts/writinglab.js
* Add the modules script tag to templats/javascript.html
* Create the profile factory in static/javascripts/profiles/services/profile.service.js
* Add the services script tag to templates/javascripts.html
* Create the partial: static/templates/profiles/profile.html
* Define a controller in static/javascripts/profiles/controllers/profile.controller.js
* Add the controller to templates/javacripts.html
* Add routes to static/javascripts/writinglab.routes.js

*Add the update interface*

* Define a settings controller in static/javascripts/profiles/controllers/profile-settings.controller.js
* Add settings controller to templates/javascripts.html
* Create the settings form partial in static/templates/profiles/settings.html
* Add routes to static/javascripts/writinglab.routes.js

###TUTORIAL EXCERPT 1

Earlier we set up an event listener in IndexController that listened for the post.created event and then pushed the new post onto the front of vm.posts. Let's look at this a little more closely, as this turns out to be an important feature of rich web applications.

What we are doing here is being optimistic that the API response from Posts.create() will contain a 200 status code telling us everything went according to plan. This may seem like a bad idea at first. Something could go wrong during the request and then our data is stale. Why don't we just wait for the response?

When I said we are increasing the perceived performance of our app, this is what I was talking about. We want the user to perceive the response as instant.

The fact of the matter is that this call will rarely fail. There are only two cases where this will reasonably fail: either the user is not authenticated or the server is down.

In the case where the user is not authenticated, they shouldn't be submitting new posts anyways. Consider the error to be a small punishment for the user doing things they shouldn't.

If the server is down, then there is nothing we can do. Unless the user already had the page loaded before the server crashed, they wouldn't be able to see this page anyways.

Other things that could possibly go wrong make up such a small percentage that we are willing to allow a slightly worse experience to make the experience better for the 99.9% of cases where everything is working properly.

Furthermore, the object we pass as the second argument is meant to emulate the response from the server. This is not the best design pattern because it assumes we know what the response will look like. If the response changes, we have to update this code. However, given what we have, this is an acceptable cost.

So what happens when the API call returns an error?

    $rootScope.$broadcast('post.created.error');

If the error callback is triggered, then we will broadcast a new event: post.created.error. The event listener we set up earlier will be trigger by this event and remove the post at the front of vm.posts. We will also show the error message to the user to let them know what happened.

    $scope.closeThisDialog();

This is a method provided by ngDialog. All it does is close the model we have open. It's also worth nothing that closeThisDialog() is not stored on the ViewModel, so we must call $scope.closeThisDialog() instead of vm.closeThisDialog().

