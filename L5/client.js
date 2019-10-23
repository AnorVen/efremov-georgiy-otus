async function req(method = 'POST') {
  console.log('reqest')
  let response = await fetch("",
    {
      method: method,
      data: '12',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  if(response.ok){
    let json = response.json()
    console.log(json)
  } else {
    console.log(response.status)
  }

}
setInterval( ()=>req(), 2000);
setInterval( ()=>req('PUT'), 2500);

