const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client, five, db) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'report') {
            const reason = interaction.fields.getTextInputValue('reason');
            const identifiers = interaction.fields.getTextInputValue('identifiers');
            const proof = interaction.fields.getTextInputValue('proof');

            const channel = client.channels.cache.get('1025102467601543209')

            await db.prepare(
                'INSERT INTO `reports` (`user`, `enemy`, `reason`, `proof`, `key`) VALUES (?, ?, ?, ?, ?)'
            ).run(interaction.user.id, identifiers, reason, proof, null)

            interaction.reply({
                content: "Your report has been sent!",
                ephemeral: true
            })

            const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('makereport')
                .setLabel('✨ Accept')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('reports')
                .setLabel('🎯 decline')
                .setStyle(ButtonStyle.Secondary),
        );

            channel.send({
                embeds: [{
                    "title": "FiveShield Report",
                    "description": "A new report has been submitted!\nBy <@"+interaction.user.id+">",
                    "color": 754385,
                    "fields": [
                      {
                        "name": "All data sent with the report:",
                        "value": "Reason: "+reason+"\nIdentifiers: "+identifiers+"\nProof: "+proof
                      }
                    ]
                }],
                co
            })
        }
	},
};