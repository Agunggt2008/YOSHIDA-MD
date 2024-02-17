var fetch = require('node-fetch');
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `
try {
  m.react('⏱️')
  var apii = await fetch(`https://api.botcahx.eu.org/api/search/openai-chat?text=${text}&apikey=${global.btc}`)
  var res = await apii.json()
  m.reply(res.message)
} catch (err) {
  console.error(err)
  throw "Terjadi kesalahan dalam menjawab pertanyaan"
}
}
handler.command = handler.help = ['ai3','openai'];
handler.tags = ['ai'];
handler.premium = false
module.exports = handler;
