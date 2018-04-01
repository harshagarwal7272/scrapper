const request = require('request');
const cheerio = require('cheerio');

var submissionFunc = function(username,callback){
  console.log("Fetching submission details of "+username);
  var submission_data = {};
  var questions_list = [];
  var solved = [];
  var accepted = 0;
  var wa = 0;
  var hacked = 0;
  var runtime_error = 0;
  var tle = 0;
  var compilation_error = 0;
  var mem_lim_exceed = 0;
  var unique_questions_solved = 0;
  var page_count;

  var url = "http://codeforces.com/submissions/"+username;
  request(url,function(err,res,body){
    var $ = cheerio.load(body);
    page_count = $('div.pagination ul').children('li').eq(-2).text();
    page_count = page_count.trim();
    page_count = parseInt(page_count);
  });
  console.log("Number of pages : "+page_count);

  function nextPage(page){
    var url = "http://codeforces.com/submissions/"+username+"/page/"+page;
    request(url,function(err,res,body){
      var $ = cheerio.load(body);
      var rows = $("div.datatable").find('tr');
      for(var i=0;i<rows.length;i++){
        var current = rows[i];
        var q_name = $(current).children("td").eq(3).text();
        var verdict = $(current).children("td").eq(-3).text();
        q_name = q_name.trim();
        verdict = verdict.trim();
        if(verdict.charAt(0)=='A')
        {
          accepted++;
          solved.push(q_name);
        }
        else if(verdict.charAt(0)=='W')
        {
          wa++;
        }
        else if(verdict.charAt(0)=='T')
        {
          tle++;
        }
        else if(verdict.charAt(0)=='H')
        {
          hacked++;
        }
        else if(verdict.charAt(0)=='C')
        {
          compilation_error++;
        }
        else if(verdict.charAt(0)=='R')
        {
          runtime_error++;
        }
        else
        {
          mem_lim_exceed++;
        }
        questions_list.push(q_name);
      }
  });
}

    solved = Array.from(new Set(solved));
    unique_questions_solved = solved.length;
    questions_list = Array.from(new Set(questions_list));
    submission_data={
      solved,
      unique_questions_solved,
      accepted,
      wa,
      tle,
      hacked,
      runtime_error,
      mem_lim_exceed,
      compilation_error
    };
    return callback(null,submission_data);
}

module.exports = {
  submissionFunc
};
