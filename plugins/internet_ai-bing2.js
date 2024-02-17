const fetch = require('node-fetch')

let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (command == 'bing2') {
    if (!text) throw `Example : ${usedPrefix + command} siapa presiden Indonesia?`;
    try {
    m.react('⏱️')
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            apikey: global.lann
          })
        })
        .then(res => res.json());
    await conn.sendMessage(m.chat, {
    text: response.message,
    contextInfo: {
    externalAdReply: { 
    title: 'Bing-Ai',
    body: '',
    thumbnailUrl: "https://telegra.ph/file/b6a2e82f30570afa1d082.jpg",
    sourceUrl: "https://www.bing.com/?/ai",
    mediaType: 1,
    renderLargerThumbnail: true
    }}}, { quoted: m})
    } catch (e) {
      console.log(e);
      throw `*Error:* Server...`;
    }
  }
  if (command == 'bingimg2') {
    if (!text) throw `Contoh: ${usedPrefix + command} anak berlari menggunakan pakaian merah 3d animation`;
    try {
      m.react('⏱️')
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-img', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            apikey: global.lann
          })
        })
        .then(res => res.json());

      for (let i = 0; i < 4; i++) {
        let img = response.result[i]
        await sleep(3000)
        await conn.sendFile(m.chat, img, 'bing_img.png', `*PROMPT:* ${text}`, m)
      }
    } catch (error) {
      throw `Server Down...`
    }
  }
}

handler.command = handler.help = ['bing2', 'bingimg2']
handler.tags = ['ai']
handler.limit = 5

module.exports = handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
