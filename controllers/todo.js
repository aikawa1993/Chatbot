'use strict';

const Telegram = require('Telegram-node-bot');
class TodoController extends Telegram.TelegramBaseController {
    addHandler($) {
        $.getUserSession('todos').then(todos => {
            // dòng nối lệnh
            let todo = $.message.text.split(' ').slice(1).join(' ');
            if(!todo) {
                return $.sendMessage('Sorry, please pass a todo item.');
            }
            $.getUserSession('todos')
            .then(todos => {
                if(!Array.isArray(todos)) {
                    $.setUserSession('todos',[todo]);
                }
                else {
                    $.getUserSession('todos', todos.concat([todo]));
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

    get routes() {
        return {
            'addCommand': 'addHandler',
            'getCommand': 'getHandler'
        };
    }

    serializeList(todoList) {
        let serialized = '*Your Todos:*';
        todoList.forEach((t, i)  => {
            serialized += `*${i}* - ${t}\n` ;
        });
        return serialized;
    }
}

module.exports = TodoController;