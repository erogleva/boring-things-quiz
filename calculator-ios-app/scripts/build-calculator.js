const util = require('util');
const mv = require('mv');
const rimraf = require('rimraf');
const child_process = require('child_process');

module.exports = function(context) {

    const execAsync = util.promisify(child_process.exec);
    const moveAsync = util.promisify(mv);
    const rimrafAsync = util.promisify(rimraf);


    (async function f() {
        try {
            console.log('Running npm install');
            let { stdout, stderr } = await execAsync('npm install', {cwd: process.cwd() + '/calculator'});
            console.log('stdout:', stdout);

            ({stdout, stderr} = await execAsync('npm run compile', {cwd: process.cwd() + '/calculator'}));
            console.log('stdout:', stdout);

            console.log('Build the calculator app');
            ({stdout, stderr} = await execAsync('npm run build', {cwd: process.cwd() + '/calculator'}));
            console.log('stdout:', stdout);

            console.log('Clear the contents of www');
            await rimrafAsync(process.cwd() + '/www');

            console.log('Move the files to www');
            await moveAsync(process.cwd() + '/calculator/build', process.cwd() + '/www')
        } catch (e) {
            console.log(e)
        }
    })();
};
