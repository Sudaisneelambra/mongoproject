
function loginsubmit(e){

    e.preventDefault()
    console.log(e);
    let pass=document.getElementById('pass').value
    let mail=document.getElementById('mail').value
    let submission=document.getElementById('submission')
    if(!pass || !mail)
    {
        let submission=document.getElementById('submission')
        submission.innerText="fill the both fields..."
        console.log("sudais");
    }
    else{
        console.log("anuz");
        // let error1=document.getElementById('error1')
        let pass=document.getElementById('pass').value
        let mail=document.getElementById('mail').value
        const jsonData = JSON.stringify({mail, pass});  
        console.log(jsonData);      
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