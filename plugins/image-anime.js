const axios = require('axios');
var handler = async (m, { conn, args, usedPrefix, command }) => {
    m.react('🔎');
    try {
    let url = `https://api.botcahx.eu.org/api/anime/${command}?apikey=${global.btc}`;
    let response = await axios.get(url, { responseType: 'arraybuffer' });
    conn.sendFile(m.chat, response.data, "", "", m);
    } catch (e) {
    conn.reply(m.chat, 'Maaf sedang error❗', m)

    throw e

    }
}
handler.help = ['umaru','kaneki','megumin','yotsuba','shinomiya','yumeko','tejina','chiho','toukachan','akira','itori','kurumi','sagiri','eba','deidara','itachi','madara','asuna','ayuzawa','chitoge','emilia','hestia','inori','ana','miku','kaori','shizuka','doraemon','kaga','kotori','mikasa','akiyama','gremory','isuzu','shina','kagura','shinka','tsunade','sasuke','sakura','rize','nezuko','boruto','naruto','erza','minato','elaina','yuri','shota','waifu','loli','hinata']
handler.command = /^(umaru|keneki|megumin|yotsuba|shinomiya|yumeko|tejina|chiho|toukachan|akira|itori|kurumi|sagiri|eba|deidara|itachi|madara|asuna|ayuzawa|chitoge|emilia|hestia|inori|ana|miku|kaori|shizuka|doraemon|kaga|koturi|mikasa|akiyama|gremory|isuzu|shina|kagura|shinka|tsunade|sasuke|sakura|rize|nezuko|boruto|naruto|erza|minato|elaina|yuri|shota|waifu|loli|hinata)$/i
handler.tags = ['image']
handler.limit = 1;
module.exports = handler;
