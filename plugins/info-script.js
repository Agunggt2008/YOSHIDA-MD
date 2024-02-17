const fetch = require("node-fetch")
const fs = require('fs')
const path = require('path')
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys")

let handler  = async (m, { conn }) => {

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => global.hwaifu)
let name = await conn.getName(who)

let msg = await generateWAMessageFromContent(m.chat, { locationMessage: {
  degreesLatitude: 35.685506276233525,
  degreesLongitude: 139.75270667105852,
  name: "Script YOSHIDA MD",
  address: "Mau SC Nya?, Sc Ada Di Situ Tinggal Klick:v",
  url: "https://github.com/ImYanXiao/Elaina-MultiDevice/tree/master",
  isLive: false,
  accuracyInMeters: 5,
  speedInMps: 0,
  degreesClockwiseFromMagneticNorth: 2,
  comment: '📌',
  jpegThumbnail: await( await fetch(pp)).buffer()
}}, { quoted: m })

return conn.relayMessage(m.chat, msg.message, {})
}
handler.tags = ["info"]
handler.help = ["script", "sc"]
handler.command = /^(script|sc)$/i;
module.exports = handler