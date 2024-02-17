let fetch = require('node-fetch');
let handler = async (m, { conn }) => {
  try {
    m.react('🔎')
    let res = await fetch(`https://api.botcahx.eu.org/api/download/storyanime?apikey=${global.btc}`);
    let json = await res.json();
      conn.sendFile(m.chat, json.result.url, 'anime_story.mp4', "*STORY ANIME*", m);
     } catch (e) {
        console.log(e)
        return m.reply(status.error)
    }
}

handler.help = ['storyanime'];
handler.tags = ['internet'];
handler.command = /^(storyanime)$/i;
handler.limit = true 
module.exports = handler;
