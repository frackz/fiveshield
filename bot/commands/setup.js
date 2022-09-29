const { SlashCommandBuilder } = require('discord.js');
const { 
    v1: uuidv1,
  } = require('uuid');
  

module.exports = {
    data: 
        new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setup a part of FiveShield")
        .addSubcommand(subcommand => 
            subcommand
                .setName("key")
                .setDescription("Setup key system"))
        .addSubcommand(subcommand => 
            subcommand
                .setName("log")
                .setDescription("Setup log system"))
    ,
	async execute(client, five, interaction, db) {
        if (interaction.options.getSubcommand() == 'key') {
            if (interaction.guildId == null) {return interaction.reply("You are not in a guild.")}
            const data = await db.prepare(
                'SELECT * FROM `servers` WHERE `guild` = ?'
            ).get(interaction.guildId)

            if (data != null && data['key'] != "") {return interaction.reply({content: "This server already has a key - find it by using /server info", ephemeral: true})}

            if (data == null) {
                await db.prepare('INSERT INTO `servers` (`guild`, `key`, `log`) VALUES (?, ?, ?)').run(interaction.guildId, "", "")
            }
            
            const key = uuidv1()
            interaction.reply({content: "Your new key is `"+key+"` - don't share this code with anyone but your developers.", ephemeral: true})
            
            await db.prepare(
                'UPDATE `servers` SET `key` = ? WHERE `guild` = ?'
            ).run(key, interaction.guildId)
        } else if (interaction.options.getSubcommand() == 'log') {
            const channel = interaction.channelId
            if (interaction.guildId == null) {return interaction.reply("You are not in a guild.")}
            const data = await db.prepare(
                'SELECT * FROM `servers` WHERE `guild` = ?'
            ).get(interaction.guildId)

            if (data == null) {
                return interaction.reply({content: "Setup your key first - using `/setup key`", ephemeral: true})
            }
            db.prepare(
                'UPDATE `servers` SET `log` = ? WHERE `guild` = ?'
            ).run(channel, interaction.guildId)

            return interaction.reply({content: "Your log channel is now set to <#"+channel+"> for guild `"+interaction.guildId+"`", ephemeral: true})
        }
	},
};