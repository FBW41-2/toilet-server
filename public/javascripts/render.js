getToilets()

async function getToilets() {
    let response = await fetch("https://kloapp.herokuapp.com/all")

    if (response.ok) {
        let json = await response.json()
        console.log(json)
        let directive = {
            'tbody tr': {
                'toilet<-': {
                    '.city': 'toilet.city',
                    '.location': 'toilet.name',
                    '.address': a => `${a.item.street} ${a.item.streetnr}`
                }
            }
            
        }
        $p('#toilets-table').render(json, directive)
    } else {
        alert("HTTP-Error: " + response.status)
    }
}