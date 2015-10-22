/**
 * Created by irekromaniuk on 8/17/2015.
 */
module.exports = function (SiteName) {

    var exec = require('ssh-exec');
    var config = require('./../configure/config');

    command = '/var/scripts/UpdateGateways';
    host = config.user_host;
    //console.log(command + '\n' + host);
    if (!SiteName) {
        console.log('SiteName is empty');
        //process.exit();
    }
    output = exec(command, host).pipe(process.stdout);
    return (output);

};