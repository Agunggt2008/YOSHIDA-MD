let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
try { 
let img = await fetch(`https://api.betabotz.eu.org/api/wallpaper/meme?apikey=${global.lann}`).then(result => result.buffer())
await conn.sendFile(m.chat, img, 'file.jpg', '🗿', m)
} catch (e) {
throw `Meme Gak Ketemu Min:v`
 }
}
handler.command = /^(meme)$/i
handler.tags = ['fun']
handler.help = ['meme']
handler.limit = 1
module.exports = handler
