const { Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')

module.exports = class Commands {
    constructor(five) {
        this.client = five.client
        this.commands = five.commands
    }

    handle() {
        const rest = new REST({ version: '10' }).setToken(require('../../config.json').token)
        var data = []
        require('fs').readdirSync('bot/commands').forEach(f => {
            if (!f.endsWith(".js")) {return}
            const e = require('../commands/'+f)
            this.commands[e.data.name] = {
                file: f
            }
            data.push(e.data)
            console.log(f + ' loaded!')
        })
        rest.put(Routes.applicationCommands(require('../../config.json').id), {body: data})
            .catch(console.error)
    }
}