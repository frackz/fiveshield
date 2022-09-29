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
        const qrs=[
            'CREATE TABLE IF NOT EXISTS `servers` (`guild` varchar(255) NOT NULL, `key` varchar(255) NOT NULL, `log` varchar(255) NOT NULL)',
            'CREATE TABLE IF NOT EXISTS `reports` (`user` varchar(255) NOT NULL, `enemy` varchar(255) NOT NULL, `reason` varchar(255) NOT NULL, `proof` varchar(255) NOT NULL, `key` varchar(255) DEFAULT NULL, `id` varchar(255) DEFAULT NULL)'
        ].forEach(e => this.db.exec(e))
    }

    run() {
        new bot(this).handle()
    }
}

new FiveShield().run()