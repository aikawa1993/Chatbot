'use strict';

const Telegram = require('telegram-node-bot');
const fs = require('fs');

class PresidentMemoryStorage extends Telegram.BaseStorage {
    constructor(userStoragePath, chatStoragePath) {
        super();
        this._storage = {
            userStorage: require(userStoragePath),
            chatStorage: require(chatStoragePath)
        };
    }
    get(storage, key) {
        return new Promise((resolve) => {
            resolve(this._storage[storage][key] || {});
        });
    }

    set(storage, key, data) {
        return Promise((resolve) => {
            this._storage[storage][key] = data;
            resolve();
        });
    }
    
    remove(storage, key) {
        return Promise((resolve) => {
            delete this._storage[storage][key];
        })
    }
}