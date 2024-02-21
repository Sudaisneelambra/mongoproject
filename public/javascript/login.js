
function loginsubmit(e){

    e.preventDefault()
    let pass=document.getElementById('pass').value
    let mail=document.getElementById('mail').value
    let submission=document.getElementById('submission')
    if(!pass || !mail)
    {
        let submission=document.getElementById('submission')
        submission.innerText="fill the both fields..."
    }
    else{
        console.log("anuz");
        let pass=document.getElementById('pass').value
        let mail=document.getElementById('mail').value
        const jsonData = JSON.stringify({mail, pass});     
            fetch('/user/login',{method:'POST', body: jsonData,headers:{
                'content-Type':'application/json'
            }})
            .then(res=>res.json())
            .then(data=>{
                if(data.status)
                {
                    location.href=data.url 
                }else{
                    submission.innerText=data.message
                }
               
            })
   

    }
}