/**
 * Created by irekromaniuk on 10/29/2015.
 */
// Load the bcrypt module
var bcrypt = require('bcryptjs');
var hash = bcrypt.hashSync(process.argv[2], 10);
console.log(process.argv[2],hash, bcrypt.compareSync(process.argv[2], hash));