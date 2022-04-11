const request= require("request");
const cheerio  = require("cheerio");
const fs=require("fs");
const path=require("path");
const pdfkit=require("pdfkit");
function getIssuesPageHtml(url,topic,repoName){
    request(url,cb);
    function cb(err,response,html){
        if(err)
        console.log(err);
        else if(response.statusCode==404)
        console.log("page not found");
        else{
            //getReposLink(html);
            //console.log(html);
            getIssues(html);
        }
    }
    function getIssues(html){
        let $=cheerio.load(html);
        let issuesElemArr=$(".d-block.d-md-none.position-absolute.top-0.bottom-0.left-0.right-0");
        let arr=[];
        for(let i=0;i<issuesElemArr.length;i++){
            let link=$(issuesElemArr[i]).attr("href");
            let fullLink=`https://github.com/${link}`;
           // console.log(fullLink);
            arr.push(fullLink);
        }
        //console.log(topic,"   ",arr);
        let folderPath=path.join(__dirname,topic);
        dirCreator(folderPath);
        let filePath=path.join(folderPath,repoName+".pdf");
        //let text=JSON.stringify(arr);        //stringify is used as it does not take array data directly so we have to stringify it
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        for(let i=0;i<arr.length;i++)
        {
            let text=JSON.stringify(arr[i]);
            pdfDoc.text(text);
        }
        //pdfDoc.text(text);
        pdfDoc.end();
        //fs.writeFileSync(filePath,);     
    }
}
module.exports=getIssuesPageHtml;

function dirCreator(folderPath){
    if(fs.existsSync(folderPath)==false)
    fs.mkdirSync(folderPath)
}