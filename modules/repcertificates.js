/**
 * Created by irekromaniuk on 8/17/2015.
 */
module.exports = function (RoboName) {

    //return('TESTrep');
    var exec = require('ssh-exec');
    var config = require('./../configure/config');

    //RoboName = process.argv[2]; //'Irek_Test_1100';
    command = config.envCMA + config.resetSic + RoboName + config.ActivationKey + ';' + config.lscertSIC + RoboName + ';';
    host = config.user_host;
    console.log(command + '\n' + host);
    if (!RoboName) {
        console.log('RoboName is empty');
        //process.exit();
    }
    output = exec(command, host).pipe(process.stdout);
    return(output);
    /*
    var buffers = [];
    var reset = function (command) {
        stream = process.stdin
            .pipe(exec(command, host));
        stream.on('data', function (buffer) {
            buffers.push(buffer);
        });
        stream.on('end', function () {
            var buffer = Buffer.concat(buffers);
            //console.log(buffer.toString());
            return(buffer.toString());
            //process.stdin.end();
        });
    };

    reset(command);
    */

};