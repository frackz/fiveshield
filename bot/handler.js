// This file is apart of FiveShield
// A FiveM global ban system.
// Made by Fr3ckzDK and contributed by: no one :(

const config = require('../config.json')

const events = require('./handlers/EventHandler')
const commands = require('./handlers/CommandHandler')
const buttons = require('./handlers/ButtonHandler')

module.exports = class Handler {
    constructor(five) {
        this.five = five
        this.client = five.client
        this.db = five.db
        
        // for handlers
        this.five.buttons = {}
        this.five.commands = {}
    }

    handle() {

        new events(this.five).handle()
        new commands(this.five).handle()
        new buttons(this.five).handle()

        this.client.login(config.token)
    }
}