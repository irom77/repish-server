/**
 * Created by irekromaniuk on 8/17/2015.
 */


    var exec = require('ssh-exec');
    var config = require('./../configure/config');

    command = '/var/scripts/dev-UpdateGateways';
    host = config.user_host;
    //console.log(command + '\n' + host);
    exec(command, host).pipe(process.stdout);


