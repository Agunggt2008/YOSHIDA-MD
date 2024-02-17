let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
        global.db.data.users[m.sender].koin = 99999999999999999
        global.db.data.users[m.sender].limit = 99999999999999999
        global.db.data.users[m.sender].exp = 99999999999999999
        global.db.data.users[m.sender].level = 100
        global.db.data.users[m.sender].money = 99999999999999999
        m.reply('*Cheat Activited*')
}
handler.help = ['hesoyam']
handler.tags = ['owner']
handler.command = /^(hesoyam|cheat)$/i
handler.owner = false
handler.premium = true
module.exports = handler