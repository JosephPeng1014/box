
const test = async()=>{
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const token = params.token;

  if(token){
    const url = `https://ca6d-2001-b011-7001-103d-a97f-3c92-36af-3f88.jp.ngrok.io/api/qrcode/get?token=${token}`
    // const url = 'https://ca6d-2001-b011-7001-103d-a97f-3c92-36af-3f88.jp.ngrok.io/api/hello'
    
    const result = await fetch(url,{
      mode: 'cors',
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .catch((error) => {
      console.log('error',error)
    })

    const project = result?.qrcode?.project
    const logo =  result?.qrcode?.project?.logo

    $("#menu_image").attr("src", logo?.src);

    $("#modal_logo").attr("src", logo?.src);
    $("#title").text(project?.title)
    $("#body").text(project?.body)

    $("#menu_image").click(()=>{
      $('#modal').toggleClass('hidden')
    })
    
    $("#modal").click((event)=>{
      if($(event.target).is("#modal-bg")){
        $('#modal').toggleClass('hidden')
      }
    })
  }
  
  

}

test()
