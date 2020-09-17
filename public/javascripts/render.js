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
                    '.address': a => `${a.item.street} ${a.item.streetnr}, ${a.item.zip} ${a.item.city}`,
                    '.feat-mirror': 'toilet.feat-mirror',
                    '.feat-papertowels': 'toilet.feat-papertowels',
                    '.feat-perfume': 'toilet.feat-perfume',
                    '.feat-access': 'toilet.feat-access',
                    '.feat-soap': 'toilet.feat-soap',
                    '.feat-baby': 'toilet.feat-baby',
                    '.stalls': 'toilet.stalls',
                    '.rating': 'toilet.rating',
                }
            }
            
        }
        $p('#toilets-table').render(json, directive)
    } else {
        alert("HTTP-Error: " + response.status)
    }
}