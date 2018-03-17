'use strict';

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram('460246369:AAEclEYwAWaq7NNI1MNJ7xJhkPPB6Ry31LQ',{
    workers: 1
});
const TodoController = require('./controllers/todo');
const OtherwiseController = require('./controllers/otherwise');
const todoCtrl = new TodoController();

tg.router.when(
        new Telegram.TextCommand('/add', 'addCommand'),todoCtrl).
        when(new Telegram.TextCommand('/get', 'getCommand'),todoCtrl).
        when(new Telegram.TextCommand('/check','checkCommand'),todoCtrl)
        .otherwise(new OtherwiseController());