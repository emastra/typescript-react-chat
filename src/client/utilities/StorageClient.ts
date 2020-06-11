// @ts-nocheck

export default class StorageClient {
    constructor() {}

    getStorage = (item) => {
        const data = Object.create(null);

        // if no localStorage item is passed, get both settings and messages
        // data.settings and data.messages stays undefined if localStorage items are null
        if (!item) {
            if (localStorage.getItem('settings')) {
                data.settings = JSON.parse(localStorage.getItem('settings'));
            } 

            if (localStorage.getItem('messages')) {
                data.messages = JSON.parse(localStorage.getItem('messages'));
            } 
        }
        // get specific item from localStorage
        else {
            if (localStorage.getItem(item)) {
                data[item] = JSON.parse(localStorage.getItem(item));
            }
        }

        return data;
    }

    syncStorage = (item, data) => {
        localStorage.setItem(item, JSON.stringify(data));
    }
}