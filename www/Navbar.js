    var cordova = require('cordova'),
        exec = require('cordova/exec');

    function handlers() {
        return navbar.channels.navbarchange.numHandlers;
    }

    var NavBar = function () {

        //this.currentHeight = -1;

        // Create new event handlers on the window (returns a channel instance)
        this.channels = {
            navbarchange: cordova.addWindowEventHandler("navbarchange")
        };
        for (var key in this.channels) {
            this.channels[key].onHasSubscribersChange = NavBar.onHasNavBarChanged;
        }
    };

    NavBar.onHasNavBarChanged = function () {
        // If we just registered the first handler, make sure native listener is started.
        if (this.numHandlers === 1 && handlers() === 1) {
            exec(navbar._change, navbar._error, "NavBar", "start", []);
        } else if (handlers() === 0) {
            exec(null, null, "NavBar", "stop", []);
        }
    };


    NavBar.prototype._change = function (obj) {
        //navbar.currentHeight = height;
        console.log("_change called");
        console.log("Received: " + JSON.stringify(obj));
        cordova.fireWindowEvent("navbarchange", {myobj: obj, foo: 'boo'});
    };

    NavBar.prototype._error = function (e) {
        console.log("Error initializing Navbar: " + e);
    };

    var navbar = new NavBar();

    module.exports = navbar;