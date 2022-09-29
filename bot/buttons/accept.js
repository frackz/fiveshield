module.exports = {
    data: {
        id: "accept*",
        contain: true
    },
	async execute(client,five,interaction,db) {
        const custom = interaction.customId
        const id = custom.split("*")[1]

        const data = db.prepare('SELECT * FROM `reports` WHERE `id` = ?').get(id)
        if (data == null) {
            return interaction.reply({content: "Cannot find report, already answered?", ephemeral: true})
        }

        interaction.message.delete()
        
        db.prepare('DELETE FROM `reports` WHERE `id` = ?').run(id)

        return interaction.reply({content: "You accepted report `"+id+"` by user <@"+data.user+">\nEnemy's identifiers is: ```"+data.enemy+"```"})
	},
};