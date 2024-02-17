let fetch = require('node-fetch')
let handler = async (m, { text }) => {
if (!text) throw `Kasih pertanyaan!`
try {
  let res = await fetch(`https://api.botcahx.eu.org/api/search/simsimi?query=${encodeURIComponent(text)}&apikey=Bang_Putra`)
  let json = await res.json()
  m.reply(json.result)
} catch (e) {
throw `Internal server eror!`
  }
}
handler.help = ['simi'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|simih)$/i

module.exports = handler