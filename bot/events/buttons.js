module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction, client, five, db) {
        if (!interaction.isButton()) return;
        
        const ButtonList = five.buttons
        const id = interaction.customId
        
        if (ButtonList[id] != undefined && ButtonList[id].contain == false) {
            require('../buttons/'+ButtonList[id].file).execute(client,five,interaction,db); return;
        }
        for (const btn of Object.keys(ButtonList)) {
            const b = ButtonList[btn]
            if (id.includes(btn) && b.contain == true) {
                require('../buttons/'+b.file).execute(client,five,interaction,discord,config,db);
                return;
            }
        }
	},
};