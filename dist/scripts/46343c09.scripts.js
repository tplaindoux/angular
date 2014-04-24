"use strict";angular.module("caf",["ngRoute","ngAnimate","ngStorage","ngTouch","ngSanitize","ngTable","jmdobry.angular-cache","caf.filters","caf.services","api.services","users.services","ladders.services","caf.directives","caf.controllers","login.controllers","users.controllers","ladders.controllers","caf.animations","ui.bootstrap","monospaced.elastic"]).constant("conf",{epApiDev:"http://localhost:8080/",epApi:"http://www.cyf-app.co/"}).config(["$angularCacheFactoryProvider","$routeProvider",function(a,b){a.setCacheDefaults({deleteOnExpire:"aggressive",storageMode:"localStorage"}),b.when("/",{templateUrl:"views/main.html",controller:"mainCtrl"}).when("/leaderboard/",{templateUrl:"views/leaderboard.html",controller:"leaderboardCtrl"}).when("/leaderboard/:type",{templateUrl:"views/leaderboard.html",controller:"leaderboardCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"mainCtrl"}).when("/login",{templateUrl:"views/partials/login.html",controller:"loginCtrl"}).when("/logout",{templateUrl:"views/main.html",controller:"logoutCtrl"}).when("/challenges",{templateUrl:"views/challenges.html",controller:"mainCtrl"}).when("/users",{templateUrl:"views/users.html",controller:"usersCtrl"}).when("/users/:userId",{templateUrl:"views/user_detail.html",controller:"usersCtrl"}).when("/friends",{templateUrl:"views/friends.html",controller:"friendsCtrl",authRequired:!0}).when("/settings",{templateUrl:"views/settings.html",controller:"mainCtrl",authRequired:!0}).when("/request",{templateUrl:"views/requests.html",controller:"mainCtrl",authRequired:!0}).when("/launchChallenge",{templateUrl:"views/launchChallenge.html",controller:"mainCtrl",authRequired:!0}).when("/ongoing",{templateUrl:"views/ongoing.html",controller:"mainCtrl",authRequired:!0}).when("/myChallenges",{templateUrl:"views/myChallenges.html",controller:"mainCtrl",authRequired:!0}).when("/rateChallenges",{templateUrl:"views/rateChallenges.html",controller:"mainCtrl",authRequired:!0}).when("/tribunal",{templateUrl:"views/tribunal.html",controller:"mainCtrl",authRequired:!0}).when("/profile",{templateUrl:"views/profile.html",controller:"profile",authRequired:!0}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","$anchorScroll","$localStorage","$http","$routeParams","$angularCacheFactory",function(a,b,c,d,e,f){e.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",e.defaults.headers.put["Content-Type"]="application/x-www-form-urlencoded",e.defaults.headers.common["X-cyf-AuthToken"]=d.sessionKey,a.$on("$routeChangeStart",function(a,c){document.getElementById("app-slider").classList.remove("slider-active"),c.authRequired!==!0||d.sessionKey||(console.log("This route requires authentication"),b.path("/login"))}),a.$on("$routeChangeSuccess",function(){b.hash(f.scrollTo),c()})}]),angular.module("caf.services",[]).value("version","0.1");var usersServices=angular.module("users.services",["ngResource"]);usersServices.factory("Users",["conf","$resource",function(a,b){return b(a.epApi+"app/users/:userId",{},{query:{method:"GET",params:{userId:""},isArray:!0}})}]);var usersServices=angular.module("ladders.services",["ngResource"]);usersServices.factory("Ladders",["conf","$resource",function(a,b){return b(a.epApi+"ladder/:type/:scope",{},{get:{method:"GET",dataType:"json",params:{type:"@type",scope:"@scope"},isArray:!0}})}]);var apiServices=angular.module("api.services",["ngResource"]);apiServices.factory("apiService",["conf","$resource",function(a,b){return{Auth:b(a.epApi+"auth/:email/:pass",{},{query:{method:"GET",dataType:"json",params:{email:!1,pass:!1}}})}}]),angular.module("caf.controllers",[]).controller("mainCtrl",["$scope",function(a){a.test="Wolrd"}]).controller("profile",["$scope","$routeParams","$angularCacheFactory","Users",function(a,b,c){c.get("profileCache")}]).controller("MenuLeftCtrl",function(a,b,c,d){d.currentUser=b.profile?b.profile:!1,d.location=a,d.modal=c}),angular.module("login.controllers",[]).controller("logoutCtrl",["conf","$rootScope","$scope","$location","$resource","$routeParams","$http","$localStorage",function(a,b,c,d,e,f,g,h){delete g.defaults.headers.common["X-cyf-AuthToken"],delete h.profile,delete h.sessionKey,h.$reset(),b.currentUser=!1,d.path("/")}]).controller("loginCtrl",["$http","$location","$modalInstance","$localStorage","$rootScope","$scope","apiService",function(a,b,c,d,e,f,g){function h(){f.form.login.$valid&&(f.state.progress=!0,g.Auth.get({email:f.form.login.email,pass:f.form.login.pass},function(a){a.passed===!0?i(a):j(a)},function(a){j(a)}))}function i(b){if(b.user&&b.user.sessionKey){a.defaults.headers.common["X-cyf-AuthToken"]=b.user.sessionKey;try{d.profile=b.user,d.sessionKey=b.user.sessionKey,c.close(),e.currentUser=d.profile}catch(f){console.log(f)}}}function j(b){f.state.progress=!1,a.defaults.headers.common["X-cyf-AuthToken"]="",delete d.profile,delete d.sessionKey,console.log(b.err?b.err:b.status?b.status:"other error")}f.state={progress:!1},f.form={},f.ok=function(){0===f.tabIndex?register():1===f.tabIndex&&h()},f.cancel=function(){c.dismiss("cancel")},f.tabSelect=function(a){f.tabIndex=a}}]),angular.module("users.controllers",["jmdobry.angular-cache"]).controller("usersCtrl",["$rootScope","$scope","$routeParams","$angularCacheFactory","Users",function(a,b,c,d,e){var f=c.userId?c.userId:!1;if(f){console.log(f);var g=d("usersCache"),h=g.get("/users_"+f);h&&h.idCool?(console.log("load from cache"),console.log(h),b.user=h):(console.log("load from api"),e.get({userId:f},function(a){console.log(a),g.put("/users_"+a.idCool,a),console.log(g.get("/users_"+a.idCool)),b.user=a},function(a){console.log(a)}))}else b.users=e.query()}]).controller("friendsCtrl",["$scope","$routeParams","$localStorage",function(a,b,c){var d=c.profile?c.profile:!1;console.log(d),a.currentUser=d}]),angular.module("ladders.controllers",[]).controller("leaderboardCtrl",["$scope","$routeParams","$angularCacheFactory","Ladders","ngTableParams",function(a,b,c,d,e){var f=b.type?b.type:!1;a.type=f?f:"global",f===!1?d.query({type:"score",scope:"global"},function(b){console.log(b);a.tableParams=new e({page:1,count:5},{total:b.length,getData:function(a,c){a.resolve(b.slice((c.page()-1)*c.count(),c.page()*c.count()))}})}):d.get({type:"score",scope:f},function(b){console.log(b);a.tableParams=new e({page:1,count:5},{total:b.length,getData:function(a,c){a.resolve(b.slice((c.page()-1)*c.count(),c.page()*c.count()))}})},function(a){console.log(a)})}]);var cafAnimations=angular.module("caf.animations",["ngAnimate"]);angular.module("caf.filters",[]).filter("interpolate",["version",function(a){return function(b){return String(b).replace(/\%VERSION\%/gm,a)}}]),angular.module("caf.directives",[]).directive("appVersion",["version",function(a){return function(b,c){c.text(a)}}]).directive("menuLeft",function(){return{templateUrl:"views/partials/menuleft.html",restrict:"AE",controller:"MenuLeftCtrl"}}).directive("scrollTo",["$location","$anchorScroll",function(a,b){return function(c,d,e){d.bind("click",function(c){c.stopPropagation();var d=e.scrollTo,f=a.hash();a.hash(d),b(),a.hash(f)})}}]);