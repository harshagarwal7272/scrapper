var cheerio = require('cheerio');
var request = require('request');

var profileFunc = function(username,callback){
  let profile_data = {};
  console.log("Entered Profile of "+username);
  var url = "http://www.codechef.com/users/" + username;
  request(url,function(err,res,body){
    var $ = cheerio.load(body);
    var star = $('section.user-details ul').children('li').eq(0).find('span').eq(1).text();
    var username = $('section.user-details ul').children('li').eq(0).find('span').eq(2).text();
    var current_rating = $('div.rating-number').text();
    var max_rating = $('div.rating-header small').text();
    var institution = $('section.user-details ul').children('li').eq(5).find('span').eq(0).text();
    console.log(star);
    console.log(username);
    console.log(current_rating);
    console.log(max_rating);
    console.log(institution);
    var solved_cnt = $('section.problems-solved h5').eq(0).text();
    solved_cnt = solved_cnt.split('(');
    solved_cnt = solved_cnt[1];
    solved_cnt = solved_cnt.split(')');
    solved_cnt = solved_cnt[0];
    solved_cnt = parseInt(solved_cnt);
    console.log(solved_cnt);

    var solved = [];
    var partial_solved = [];

    var temp = $('section.problems-solved').find('span').children('a');
    $(temp).each(function(i,tmp){
      var x = $(this).attr('href');
      x = x.split(',');
      x = x[0].split('/');
      x = x[x.length-1];
      if(i<solved_cnt)
      {
        solved.push(x);
      }
      else
      {
          partial_solved.push(x);
      }
    });
    console.log(solved);
    console.log();
    console.log(partial_solved);
    profile_data = {
      star,
      username,
      current_rating,
      max_rating,
      institution,
      solved_cnt,
      solved,
      partial_solved
    };
    return callback(null,profile_data);
  });
}

module.exports = {
  profileFunc
};
