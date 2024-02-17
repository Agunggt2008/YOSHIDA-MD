let handler = async (m, {
  conn,
  args,
  command
}) => {
  const totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length
   let peli = `Jumlah Fitur Saat Ini : ${totalf} Fitur 📜`
    m.reply(`${peli}`)
	}
 
handler.help = ['totalfeatures']
handler.tags = ['info']
handler.command = /^(total(fitur|feature)?)$/i
module.exports = handler
