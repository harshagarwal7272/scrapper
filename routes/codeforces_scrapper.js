var profile = require('./codeforces_profile');
var submission = require('./codeforces_submission.js');

var codeforcesFunc = function(username,callback){
  console.log("hey "+username);
  submission.submissionFunc(username,function(err,submission_data){
    return callback(null,submission_data);
  });
}

module.exports = {
  codeforcesFunc
};
