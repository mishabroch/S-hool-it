var express = require('express');var router = express.Router();var pgp = require("pg-promise")();var db = pgp("postgres://client:qwerty@localhost:1234/project");var func = require('../func');var time;var speed;var productivity;var count;var d;var res_str;var json = '{"reference_chart":"", "realtime_chart":""}';var ref_json = '{"speed":"0", "productivity":"0", "count":"0", "time": "0"}';var rt_json = '{"productivity":"0", "time": "0"}';json = JSON.parse(json);ref_json = JSON.parse(ref_json);rt_json = JSON.parse(rt_json);var M = 10000,v_max = 10, t0 = 0, t1 = 45, t2 = 445, t3 = 490, t4 = 945, t5 = 990, t6 = 1395, t7 = 1440, step=15;//queries to DB//router.get('/testajax', function(req, res, next) {//if(!req.query) return res.sendStatus(400);//else//{db.many("select count(*) as v\n" +    "from work_calendars\n" +    "where descr != 'Working';")    .then(function (data) {        count = data;        ref_json.count = count[0].v;        json.reference_chart = ref_json;        //json.reference_chart = JSON.stringify(ref_json);        // router.get('/testajax', function(req, res, next) {        // res.send(JSON.stringify(json));        // });        db.many("select begin_date as begin_time, end_date as end_time\n" +            "from work_calendars\n" +            "where descr != 'Working';")            .then(function (data) {                time = data;                time = JSON.stringify(time);                time = JSON.parse(time);                var i = 0;                var t = 0;                while(i < 4) {                    t = new Date(time[i].begin_time);                    time[i].begin_time = JSON.stringify(t.getHours()*60 + t.getMinutes());                    t = new Date(time[i].end_time);                    time[i].end_time = JSON.stringify(t.getHours()*60 + t.getMinutes());                    /*                        if(time[i].end_time < time[i].begin_time) {     // если end_time на следующий день                            time[i].end_time += 24*60;                        }                    */                    i++;                }                // ФУНКЦИЯ ПОСТРОЕНИЯ ТОЧЕК ЭТАЛОННОГО ГРАФИКА                var x_et = [], y_et = [];                //var v_mid = func.velocity_middle(5000,10000, time[0].begin_time,  time[0].end_time,  time[1].begin_time,  time[1].end_time,time[2].begin_time, time[2].end_time, time[3].begin_time, time[3].end_time);                //func.etalon_coords(5000,10000, time[0].begin_time,  time[0].end_time,  time[1].begin_time,  time[1].end_time,time[2].begin_time, time[2].end_time, time[3].begin_time, time[3].end_time,15,97,v_mid,x_et,y_et);                var v_mid=func.velocity_middle(M,v_max,t0,t1,t2,t3,t4,t5,t6,t7);                var n=1440/step;                func.etalon_coords(M,t0,t1,t2,t3,t4,t5,t6,t7,step,n,v_mid,x_et,y_et);                var res_str = '{';                for(var i = 0; i < 97; i++){                    res_str = res_str + '\"' + x_et[i] + '\":\"' + y_et[i] + '\",';                }                res_str = res_str.substring(0,res_str.length - 1);                res_str = res_str + "}";                //console.log(res_str);                res_str = JSON.parse(res_str);                console.log(JSON.stringify(res_str));                ref_json.time = time;                //ref_json = JSON.stringify(ref_json)                json.reference_chart = ref_json;                //json = res_str;                router.get('/testajax', function(req, res, next) {                    // res.send(JSON.stringify(json));                    res.send(JSON.stringify(res_str));                });                db.many("select value from params join param_values " +                    "on params.param_id = param_values.param_id " +                    "where params.name = 'Max speed';")                    .then(function (data) {                        speed = data;                        ref_json.speed = speed[0].value;                        json.reference_chart = ref_json;                        router.get('/testajax', function(req, res, next) {                            // res.send(JSON.stringify(json));                            res.send(JSON.stringify(res_str));                        });                        db.many("select value from params join param_values " +                            "on params.param_id = param_values.param_id " +                            "where params.name = 'Date production';")                            .then(function (data) {                                productivity = data;                                ref_json.productivity = productivity[0].value;                                json.reference_chart = ref_json;                                router.get('/testajax', function(req, res, next) {                                    //res.send(JSON.stringify(json));                                    res.send(JSON.stringify(res_str));                                });                                db.many("select value as productivity, timestamp as time from params join param_values " +                                    "on params.param_id = param_values.param_id " +                                    "where params.name = 'Current production';")                                    .then(function (data) {                                        d = data;                                        d = JSON.stringify(d);                                        d = JSON.parse(d);                                        console.log(d);                                        var i = 0;                                        var t = 0;                                        while(i < 11) {                                            t = new Date(d[i].time);                                            d[i].time = JSON.stringify(t.getHours()*60 + t.getMinutes());                                            i++;                                            // ИСПРАВИТЬ СЛУЧАЙ: d[i-1].time > d[i].time                                        }                                        console.log(d);                                        // ФУНКЦИЯ ПОСТРОЕНИЯ ТОЧЕК ТЕКУЩЕГО ГРАФИКА                                        var x_model = [], y_model = [];                                        var mas = [];                                        var last_value = 8.8*15;                                        var first_value = 15;                                        mas[0]=0;                                        for(var i = 1; i < 48; i++){                                            mas[i] = mas[i - 1] + first_value + Math.random()*( last_value - 0);                                        }                                        //for(var i = 48; i < 97; i++){                                        //    mas[i]= 0;                                        //  }                                        var v_up, dM;                                        func.simulated_coords(t0,t1,  t2,  t3,  t4,  t5,  t6,  t7,  n,  step,  v_mid,  v_max,  x_model,  y_model);                                        var res_str1 = '{';                                        for(var i = 0; i < 97; i++){                                            res_str1 = res_str1 + '\"' + x_model[i] + '\":\"' + mas[i] + '\",';                                        }                                        res_str1 = res_str1.substring(0,res_str1.length - 1);                                        res_str1 = res_str1 + "}";                                        //console.log(res_str);                                        res_str1 = JSON.parse(res_str1);                                        console.log(JSON.stringify(res_str1));                                        var y_pro = [];                                        var v_up,dM ;                                        func.correction_production(mas[n],  t, M,  t0,  t1,  t2,  t3,  t4,  t5,  t6,  t7,  v_max,  v_mid,  step, n,  v_up,  dM, y_pro);                                        rt_json = d;                                var res_str2 = '{';                                for(var i = 0; i < 97; i++){                                    res_str2 = res_str2 + '\"' + x_model[i] + '\":\"' + y_pro [i] + '\",';                                }                                res_str2 = res_str2.substring(0,res_str2.length - 1);                                res_str2 = res_str2 + "}";                                //console.log(res_str);                                res_str2 = JSON.parse(res_str2);                                        //ref_json = JSON.stringify(ref_json)                                        json.realtime_chart = rt_json;                                        router.get('/testajax1', function(req, res, next) {                                            // res.send(JSON.stringify(json));                                            res.send(JSON.stringify(res_str1));                                        });                                    })                                    .catch(function (error) {                                        console.log("ERROR:", error);                                    });                            })                            .catch(function (error) {                                console.log("ERROR:", error);                            });                    })                    .catch(function (error) {                        console.log("ERROR:", error);                    });            })            .catch(function (error) {                console.log("ERROR:", error);            });    })    .catch(function (error) {        console.log("ERROR:", error);    });//}//});/* GET home page. */router.get('/', function(req, res, next) {    res.render('index', { title: 'Express' });});router.get('/testajax2', function(req, res, next) {    // res.send(JSON.stringify(json));    res.send(JSON.stringify(res_str2));});//router.get('/testajax', function(req, res, next) {//res.send(JSON.stringify(json));//	res.send(JSON.stringify(res_str));//});module.exports = router;