var profile = require('./codeforces_profile');
var submission = require('./codeforces_submission.js');

var codeforcesFunc = function(username,callback){
  console.log("hey "+username);
  data = {};
  profile.profileFunc(username,function(err,profile_data){
    if(err){
      console.log(err);
      return err;
    }
    submission.submissionFunc(username,function(errr,submission_data){
      if(errr){
        console.log(errr);
        return errr;
      }
      data = {
        profile_data,
        submission_data
      }
      return callback(null,data);
    });
  });
}

module.exports = {
  codeforcesFunc
};
