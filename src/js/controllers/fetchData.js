 let fetchTime = null
 
 const customFetch = (url) => {
  return new Promise((resolve, reject) => {

    fetchTime = setTimeout(() => {
      console.log(`PRELOADER START AFTER TIMEOUT`)
    }, 200)
    
    fetch(`${url}`)
      .then(response => {
        clearTimeout(fetchTime)
        console.log(`PRELOADER END`)

        if (response.ok) {
          response.json().then(json => {
            resolve(json)
          });
        } else {
          reject(`${response.status}: ${response.statusText}`)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export {customFetch}