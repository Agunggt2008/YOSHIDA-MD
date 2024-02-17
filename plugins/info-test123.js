const fetch = require("node-fetch")
const fs = require('fs')
const path = require('path')
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys")

let handler  = async (m, { conn }) => {
let _uptime = process.uptime() * 1000
let adi = clockString(_uptime)
let time = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss')
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => global.hwaifu.getRandom())
let name = await conn.getName(who)

let msg = await generateWAMessageFromContent(m.chat, { locationMessage: {
  degreesLatitude: 35.685506276233525,
  degreesLongitude: 139.75270667105852,
  name: "Bot Online Bosku",
  address: `Bot Aktif Selama: ${adi}`,
  url: global.gcl,
  isLive: true,
  accuracyInMeters: 0,
  speedInMps: 0,
  degreesClockwiseFromMagneticNorth: 2,
  comment: '',
  jpegThumbnail: await( await fetch(pp)).buffer()
}}, { quoted: m })

return conn.relayMessage(m.chat, msg.message, {})
}
handler.customPrefix = /^(tes|bot|yoshi|test)$/i
handler.command = new RegExp
module.exports = handler 

function clockString(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " Day " + hours + " Hour " + minutes + " Minute " + sec + " Second ";
}
