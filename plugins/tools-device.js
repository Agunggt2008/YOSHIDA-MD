const { getDevice } = require('@adiwajshing/baileys')

let handler = async (m) => {
	m.reply(await getDevice(m.quoted ? m.quoted.id : m.key.id))
}

handler.help = ['cekdevice']
handler.tags = ['tools']
handler.command = /^(cekdevice)$/i

module.exports = handler
