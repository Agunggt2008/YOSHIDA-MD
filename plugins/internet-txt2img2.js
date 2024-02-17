const fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `🚩 *Masukan detail gambar!* `;
  try {
    m.react('⏱️')
    const res = await fetch(`https://api.botcahx.eu.org/api/maker/text2img?text=${text}&apikey=${global.btc}`).then(res => res.buffer());
    conn.sendFile(m.chat, res, 'image.jpg', `Result: ${text}`, m);
  } catch (e) {
     console.log(e)
    m.reply(`Server down!`);
  }
};

handler.command = handler.help = ['text2img2'];
handler.tags = ['ai'];
handler.limit = true;
module.exports = handler;
