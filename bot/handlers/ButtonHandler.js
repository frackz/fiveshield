module.exports = class Buttons {
    constructor(five) {
        this.client = five.client
        this.buttons = five.buttons
    }

    handle() {
        require('fs').readdirSync('bot/buttons').forEach(e => {
            if (!e.endsWith(".js")) return;
            const event = require(`../buttons/${e}`);
            console.log(e + ' loaded!')

            this.buttons[event.data.id] = {
                file: e,
                contain: event.data.contain            
            }
        })
    }
}