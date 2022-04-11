const request= require("request");
const cheerio  = require("cheerio");
const getIssuesPageHtml = require("./issues");
function getReposPageHtml(url,topic){
    request(url,cb);
    function cb(err,response,html){
        if(err)
        console.log(err);
        else if(response.statusCode==404)
        console.log("page not found");
        else{
            getReposLink(html);
            //console.log(html);
        }
    }
    function getReposLink(html){
        let $=cheerio.load(html);
        let headingsArr=$(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);
        for(let i=0;i<10;i++){
            let twoanchor=$(headingsArr[i]).find("a");
            let link=$(twoanchor[1]).attr("href");      
            
            let fullLink=`https://github.com${link}/issues`;
            //console.log(fullLink);
            let repoName=link.split("/").pop();
            getIssuesPageHtml(fullLink,topic,repoName);
        }
        console.log("```````````");
    }
}

module.exports=getReposPageHtml;