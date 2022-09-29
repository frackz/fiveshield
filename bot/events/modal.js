const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { 
    v1: uuidv1,
  } = require('uuid');

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

            const id = uuidv1()

            await db.prepare(
                'INSERT INTO `reports` (`user`, `enemy`, `reason`, `proof`, `key`, `id`) VALUES (?, ?, ?, ?, ?, ?)'
            ).run(interaction.user.id, identifiers, reason, proof, null, id)

            interaction.reply({
                content: "Your report has been sent!",
                ephemeral: true
            })

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('accept*'+id)
                        .setLabel('✨ Accept')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('decline*'+id)
                        .setLabel('🎯 Decline')
                        .setStyle(ButtonStyle.Danger),
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
                    ],
                    "footer": {
                        "text": "ID: "+id
                    }
                }],
                components: [row]
            })
        }
	},
};