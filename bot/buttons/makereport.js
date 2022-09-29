const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const modal = new ModalBuilder()
    .setCustomId('report')
    .setTitle('Make a report');

const reason = new TextInputBuilder()
    .setCustomId('reason')
    .setLabel("Why are you reporting this user?")
    .setMaxLength(40)
    .setStyle(TextInputStyle.Short);

const identifiers = new TextInputBuilder()
    .setCustomId('identifiers')
    .setLabel("Information of user steam id, discord id, etc")
    .setMaxLength(100)
    .setStyle(TextInputStyle.Paragraph);

const proof = new TextInputBuilder()
    .setCustomId('proof')
    .setLabel("What proof do you have? Videoes, pictures etc")
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(300);

const firstActionRow = new ActionRowBuilder().addComponents(reason);
const secondActionRow = new ActionRowBuilder().addComponents(identifiers);
const thirdActionRow = new ActionRowBuilder().addComponents(proof);


modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

module.exports = {
    data: {
        id: "makereport",
        contain: false
    },
	async execute(client,five,interaction,db) {
        await interaction.showModal(modal);
	},
};