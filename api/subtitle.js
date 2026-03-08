export default async function handler(req, res) {

const id = req.query.id

try{

const captionURL =
`https://video.google.com/timedtext?lang=en&v=${id}`

const response = await fetch(captionURL)

const xml = await response.text()

const matches = [...xml.matchAll(/<text.*?>(.*?)<\/text>/g)]

let subtitle = matches.map(m => m[1]).join(" ")

const translate = await fetch(
"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=" +
encodeURIComponent(subtitle)
)

const data = await translate.json()

let result=""

data[0].forEach(i=>{
result+=i[0]
})

res.status(200).json({
subtitle:result
})

}catch{

res.status(200).json({
error:"Subtitle tidak tersedia"
})

}

}