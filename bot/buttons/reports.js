module.exports = {
    data: {
        id: "reports",
        contain: false
    },
	async execute(client,five,interaction,db) {
        const data = db.prepare('SELECT * FROM `reports` WHERE `user` = ?').all(interaction.user.id)
        var text = ''
        data.forEach(e => {
            text += 'Enemy: '+e.enemy+' - Proof: '+e.proof+'\n'
        })

        return interaction.reply({
            embeds:[{
                "title": "FiveShield Reports",
                "description": "You have the following reports:```"+text+"```",
                "color": 754385
            }],
            ephemeral: true
        })
	},
};