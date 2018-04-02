var profile = require('./codechef_profile');

var codechefFunc = function(username,callback){
  console.log("hey "+username);
  data = {};
  profile.profileFunc(username,function(err,profile_data){
    if(err){
      console.log(err);
      return err;
    }
        data = {
        profile_data
      };
      return callback(null,data);
  });
}

module.exports = {
  codechefFunc
};
