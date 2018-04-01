var cheerio = require('cheerio');
var request = require('request');

var profileFunc = function(username,callback){
  console.log("Entered Profile of "+username);
  var url = "http://codeforces.com/profile/" + username;
  var profile_data = {};
  request(url,function(err,res,body){
    if(err){
      console.log(err);
      return err;
    }
    var $ = cheerio.load(body);
    var user_name = $('div.main-info h1 a').text();
    var user_rank = $('div.user-rank span').text();
    var max_user_rank = $('div.info ul').children('li').eq(0).find('span').eq(2).text();
    var user_rating = $('div.info ul').children('li').eq(0).find('span').eq(0).text();
    var max_user_rating = $('div.info ul').children('li').eq(0).find('span').eq(3).text();
    user_rank = user_rank.trim();
    max_user_rank = max_user_rank.split(',');
    max_user_rank = max_user_rank[0];
    console.log("user name "+user_name);
    console.log("user rank "+user_rank);
    console.log("max user rank "+max_user_rank);
    console.log("user rating "+user_rating);
    console.log("max user rating "+max_user_rating);
    profile_data = {
      user_name,
      user_rank,
      user_rating,
      max_user_rank,
      max_user_rating
    };
    if(username.length===0)
    {
      return callback("No such user exists.");
    }
    return callback(null,profile_data);
  });
}

module.exports = {
  profileFunc
};
