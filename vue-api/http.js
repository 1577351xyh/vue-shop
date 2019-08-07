let express = require('express');
let fs = require('fs');
let path = require('path');
var cors = require('cors');
let app = express();
let bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads/', express.static('./uploads/'));

//导入服务器
// 导入mysql模块
var mysql = require('mysql')
// 创建数据库的连接
var connection = mysql.createConnection({
    // 地址
    host: 'localhost',
    // 用户名
    user: 'root',
    // 密码
    password: 'root',
    // 库的名字
    database: 'vue'
});

// 连接数据库
connection.connect();
//轮播图图片数据接口

app.get('/', (req, res) => {
    var datas = [];
    var str = 'http://localhost:3747/uploads/lunbo/';
    var strData = '';
    res.setHeader('Access-Control-Allow-Origin', '*');
    let path1 = path.join(__dirname, '/uploads/lunbo');
    fs.readdir(path1, (err, data) => {
        if (err) {
            res.send('读取失败' + err)
        } else {
            //data是一个数组
            for (var i = 0; i < data.length; i++) {
                strData = str + data[i]
                datas.push(strData)
            }
            res.send({
                code: 200,
                msg: datas
            });
        }
    })
    console.log('有人访问我的轮播图数据接口了')

});

// 获取新闻列表数据
app.get('/newlist', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query('select id,title,time,zhaiyao,click,img from newlist;', (error, results, fields) => {
        // console.log(results);
        res.send({
            code: 200,
            msg: results
        });
    })
    console.log('有人访问我的新闻数据接口了')
});


//根据id查询返回一个对象数组
app.get('/home/newsinfo', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let id = req.query.id;
    //根据id取出数据
    connection.query(`select * from newpas where id = ${id};`, (error, results, fields) => {
        // console.log(results[0]);
        res.send({
            code: 200,
            msg: results[0]
        });
    })
    console.log('有人访问我的新闻详情内容了')
});

//查询评论数组
app.get('/home/comment', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //根据id取出数据
    connection.query("select id,name,time,content from comment;", (error, results, fields) => {
        res.send({
            code: 200,
            msg: results
        });
    })
    console.log('有人访问我的评论数据了')
});

//新增评论数据
app.post('/home/comment', (req, res) => {
    //根据id取出数据
    console.log(req.query); 
    let id = req.query.id;
    let content = req.query.content;
    let time = req.query.time;

    var unixTimestamp = new Date( time *1 ) ;
    times = unixTimestamp.toLocaleString();
   
    connection.query(`insert into comment(name,time,content) values('匿名用户','${times}','${content}');`, (err, results, fields) => {
        if(err || content.length ===0){
            res.sed({
                code:404,
                msg:"新增失败"
            })
        }else{
            res.send({
                code: 200,
                msg: '新增成功'
            });
        }
       
    })
    console.log('有人向我添加评论数据了')
});

//获取图片分类导航栏数据
app.get('/photolist/nav', (req, res) => {
    //查询数据
    connection.query("select id,nav from navtop;", (err, results, fields) => {
        if(err){
            res.send(err)
        }else{
            res.send({
                code: 200,
                msg: results
            });
        }
    })
    console.log('有人访问我的图片分类导航栏数据了')
});

//获取图片列表
app.get('/photolist/max', (req, res) => {
    //查询数据
    connection.query("select id,title,url,zhaiyao from meinv;", (err, results, fields) => {
        console.log(results);
        if(err){
            res.send(err)
        }else{
            res.send({
                code: 200,
                msg: results
            });
        }
    })
    console.log('有人访问我的图片分类导航栏api接口了')
});

//根据id查询单张图片
app.get('/photolist/index', (req, res) => {
    //查询数据
    let id = req.query.id;
    connection.query(`select * from meinv where id = ${id};`, (err, results, fields) => {
        if(err){
            res.send(err)
        }else{
            res.send({
                code: 200,
                msg: results
            });
        }
    })
    console.log('有人访问我的图片分类导航栏api接口了(根据id获取)')
});

//根据id查找图片的详情数据
app.get('/photolist/info', (req, res) => {
    //查询数据
    let id = req.query.id;
    connection.query(`select * from photoinfo where id = ${id};`, (err, results, fields) => {
        if(err){
            res.send(err)
        }else{
            res.send({
                code: 200,
                msg: results
            });
        }
    });
    console.log('有人访问我的图片详情api接口了')
});

//获取商品列表的数据
app.get('/goodslist', (req, res) => {
    connection.query(`select id,title,url,price,odl_price,quantity from goodslist;`, (err, results, fields) => {
        if(err){
            res.send(err)
        }else{
            res.send({
                code: 200,
                msg: results
            });
        }
    })
    console.log('有人访问我的图片详情api接口了')
});

//商品详情的数据接口
app.get('/goodinfo', (req, res) => {
    let id = req.query.id;
    connection.query(`select * from goodinfo where id = ${id};`, (err, results, fields) => {
        if(err){
            res.send(err)
        }else{
            res.send({
                code: 200,
                msg: results
            });
        }
    })
    console.log('有人访问我的商品详情api接口了')
});

//根据id查询商品列表
/***
 * 接收的参数是一个数组
 */
app.get('/carshop', (req, res) => {
    let id1 = req.query.id;
    connection.query(`select * from goodinfo where id in (${id1})`, (err, results, fields) => {
        console.log(results);
        if(err){
            res.send(err)
        }else{
            res.send({
                code: 200,
                msg: results
            });
        }
    });
    console.log('有人访问我id查询商品列表api接口了')
});


app.listen(3747, () => {
    console.log('runing');
});