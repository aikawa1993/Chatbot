'use strict';

const Telegram = require('Telegram-node-bot');
class TodoController extends Telegram.TelegramBaseController {
    
    addHandler($) {
        // dòng nối lệnh
        let todo = $.message.text.split(' ').slice(1).join(' ');
        if(!todo) {
            return $.sendMessage('Sorry, please pass a todo item.');
        }
        $.getUserSession('todos').then(todos => {
            $.getUserSession('todos')
            .then(todos => {
                if(!Array.isArray(todos)) {
                    $.setUserSession('todos',[todo]);
                }
                else {
                    $.setUserSession('todos', todos.concat([todo]));
                }
                $.sendMessage('Added new todo!');
            })
        });
    }

    getHandler($){
        $.getUserSession('todos').then(todos => {
            $.sendMessage(this.serializeList(todos), {parse_mode:'Markdown'});
        });
    }

    checkHandler($){
        let index = parseInt($.message.text.split(' ').slice(1).join(' '));
        if (isNaN(index)) return $.sendMessage('Sorry, you didn\'t pass a valid index');
        $.getUserSession('todos')
            .then(todos => {
                if(index >= todos.length) return $.sendMessage('Sorry, you didn\'t pass valid index');
                todos.splice(index, 1);
                $.setUserSession('todos', todos);
                $.sendMessage('Checked todo!');
        });
    }

    get routes() {
        return {
            'addCommand': 'addHandler',
            'getCommand': 'getHandler',
            'checkCommand': 'checkHandler'
        };
    }

    serializeList(todoList) {
        let serialized = '*Your Todos:*\n\n';
        todoList.forEach((t, i)  => {
            serialized += `*${i}* - ${t}\n` ;
        });
        return serialized;
    }
}

module.exports = TodoController;