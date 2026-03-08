export default async function handler(req, res) {

const id = req.query.id

try{

const response = await fetch(
`https://youtubetranscript.com/?server_vid2=${id}`
)

const data = await response.json()

let subtitle = data
.map(i => i.text)
.join(" ")

const translate = await fetch(
"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=" +
encodeURIComponent(subtitle)
)

const t = await translate.json()

let result=""

t[0].forEach(i=>{
result+=i[0]
})

res.status(200).json({
subtitle:result
})

}catch{

res.status(200).json({
error:"Subtitle tidak ditemukan"
})

}

}