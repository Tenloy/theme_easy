var express = require('express');

/*

  Express是目前最流行的基于Node.js的Web开发框架，可以快速地搭建一个完整功能的网站。
      app.js： 项目入口，反正express爱叫app.js没辙，你可以改成index.js或者main.js都成。相当于php项目中的 index.php、index.html
      node_modules： 存放项目的依赖库
      package.json： 项目依赖配置及开发者信息(这个要说就说多了，还是看文档好，俺就不误人子弟了。下期看看抽个小段单说Node模块)
      public： 静态文件如 css,js,img (PS:俺其实习惯叫static)
      routes： 路由文件(学习的重要攻克对象。尼玛业务好不好，路由是关键)
      Views： 页面文件(Ejs或者jade的模板，默认是jade，俺这用Ejs，在初阶练手最重要，所以都可以试试)


  Express框架建立在node.js内置的http模块上。http模块生成服务器的原始代码如下。

  var http = require("http");
  
    var app = http.createServer(function(request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.end("Hello world!");
  });

  app.listen(3000, "localhost");



 */





var path = require('path');
//引入body-parser中间件
var bodyParser = require('body-parser');
var app = express();
//app.use(logger('dev'));

app.use(bodyParser.json()); // for parsing application/json 解析客户端发过来的json结构的数据
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded 

app.use(express.static(path.join(__dirname, 'public')));
     app.post('/', function (req, res) {
       
       console.log(req.body);
       res.json(req.body);
     })

     app.get('/user/:id/:name', function(req, res){
       console.log(req.params.id);
       console.log(req.params.name);
       res.send('user ' + req.params.id);
     });

     app.get('/news', function(req, res){
        res.json({
            "count": 5,
            "start": 0,
            "total": 36,
        });

});

    app.listen(3000);
    module.exports = app;
