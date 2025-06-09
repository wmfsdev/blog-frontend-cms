
function extractURL(string) {

    const url = string.replace(`<p><img src="`, "").replace(`" alt=""></p>`, "")
    console.log(url)
    return url
}

export default extractURL

