const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(interaction, client, five, db) {
        return
        if (interaction.author.id != '734006395900264530') {return}

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('makereport')
                .setLabel('✨ Report a user')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('reports')
                .setLabel('🎯 My Reports')
                .setStyle(ButtonStyle.Secondary),
        );

        interaction.channel.send({
            embeds: [{
                "title": "FiveShield Report",
                "description": "Welcome to the FiveShield reporting page.\nHere you can report a user, and maybe get them banned.\n\nIf you spam reports, you will get banned without unban.",
                "color": 754385
            }],
            components: [row]
        })
	},
};