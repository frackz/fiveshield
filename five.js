// This file is apart of FiveShield
// A FiveM global ban system.
// Made by Fr3ckzDK and contributed by: no one :(

const sqlite = require('better-sqlite3')
const discord = require('discord.js')

const bot = require('./bot/handler')

class FiveShield {
    constructor() {
        this.db = new sqlite('fiveshield.sqlite')
        this.client = new discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION'],intents: 32767,disableMentions: 'everyone',})
    }

    run() {
        new bot(this).handle()
    }
}

new FiveShield().run()