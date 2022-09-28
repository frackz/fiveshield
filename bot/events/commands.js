module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction, client, five, db) {
        if (!interaction.isCommand()) return;
        if (interaction.guildId == null) return interaction.reply("No channel");
        if (five.commands[interaction.commandName] != null) {
            require('../commands/'+five.commands[interaction.commandName].file).execute(client, five, interaction, db)
        }
	},
};