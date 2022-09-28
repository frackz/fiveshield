module.exports = class Events {
    constructor(five) {
        this.five = five
        this.client = five.client
        this.db = five.db
    }

    handle() {
        require('fs').readdirSync('bot/events').forEach(e => {
            if (!e.endsWith(".js")) return;
            const event = require(`../events/${e}`);
            console.log(e + ' loaded!')
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args, this.client, this.five, this.db));
            } else {
                this.client.on(event.name, (...args) => event.execute(...args, this.client, this.five, this.db));
            }
        })
    }
}