var fs = require('fs');
var request = require('request');
var data = fs.readFileSync('url.dat','utf-8');
var lines = data.split("\n");
console.log(lines.length);
function get_line(begin,end) {

    for(var j =begin;j<end;j++){
        if(lines[j] && JSON.parse(lines[j]).url) {
            var obj = JSON.parse(lines[j]);
            var url = obj.url;
        }else{
            return;
        }
            download(url,'image');

    }
}

var i = 21048;
//隔两秒读一次，主要是为了读文件后的其他耗时操作
var interval = setInterval(function(){
    console.log(i);
    if(i>lines.length-5){
        console.log('time to go!!!');
        clearInterval(interval);
    }
    get_line(i,i+2);
    i+=2;



},5000);



function download(url,path){
    var id= url.substring(url.lastIndexOf('/')+1,url.indexOf('_'));

    var rep = /i[0-9].pixiv.net/;
    var host = rep.exec(url)[0];
    var options = {
        url: url,
        headers: {
            'Accept':'image/webp,image/*,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
            'Connection':'keep-alive',
            'Cookie':'p_ab_id=2; _ga=GA1.2.433897734.1451647016; device_token=6160f7e569c0860ae8a99c98f017c65d; module_orders_mypage=%5B%7B%22name%22%3A%22everyone_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22spotlight%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22featured_tags%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22contests%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22following_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22mypixiv_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22booth_follow_items%22%2C%22visible%22%3Atrue%7D%5D; __utma=235335808.433897734.1451647016.1457359994.1457700215.45; __utmc=235335808; __utmz=235335808.1457359994.44.4.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmv=235335808.|2=login%20ever=yes=1^3=plan=normal=1^5=gender=male=1^6=user_id=16664186=1; PHPSESSID=16664186_e4ae9f7c7304939796760dd4c7ea7dc1',
            'Host':host,
            'Referer':'http://www.pixiv.net/member_illust.php?mode=medium&illust_id='+id,
            'Upgrade-Insecure-Requests':1,
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',

        }
    };


    var filename = id+'.jpg';

    request(options).pipe(fs.createWriteStream(path+'/'+filename)).on('close', function(){console.log('done');});

}

module.exports = download;