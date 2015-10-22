/**
 * Created by irekromaniuk on 10/22/2015.
 */
exports.config = {
    framework: 'mocha',
    specs : [
        'test/e2e/**/*.spec.js'
    ],
    mochaOpts: {
        enableTimeouts: false
    }
    /*onPrepare: function() {
        require('./bin/www')
    }*/
};