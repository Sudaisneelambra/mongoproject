let errors=false
let errors1=false
let submission=document.getElementById('submission')
let pass1=document.getElementById('pass1')
let passvalid=false

function passvalidation(){
    let pass=document.getElementById('pass').value
    let error1=document.getElementById('error1')
    let passrejex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let validpass=passrejex.test(pass)

    if(!validpass)
    {
        error1.innerText="password must have 8 letter and special charecter and numbers also"
        submission.innerText=""
    }
    else{
        error1.innerText=""
        submission.innerText=""
        errors1=true
    }
  
    
}
function mailvalidation(){
    let mail=document.getElementById('mail').value
    let error=document.getElementById('error')
    let mailregex=/@gmail\.com$/;
    let validmail=mailregex.test(mail)

    if(!validmail)
    {
        error.innerText="enter mail in correct format"
        submission.innerText=""
    }else{
        error.innerText=""
        submission.innerText=""
        errors=true
    }
   
    
}

pass1.addEventListener('input',()=>{
    let pass=document.getElementById('pass').value
    let pass1=document.getElementById('pass1').value
    if(pass===pass1)
    {
        document.getElementById('pass1').style.color="black"
        passvalid=true
        document.getElementById('error2').innerText=""
      
    }
    else{
        document.getElementById('pass1').style.color="red"
        passvalid=false
        document.getElementById('error2').innerText="enter same password entered above"
        

        
    }
})

function submitted(e){

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
    else if(!passvalid)
    {
        submission.innerText="password incorrect"
    }
    else if(errors && errors1){
        console.log("anuz");
        // let error1=document.getElementById('error1')
        let pass=document.getElementById('pass').value
        let mail=document.getElementById('mail').value
        const jsonData = JSON.stringify({mail, pass});  
        console.log(jsonData);      
            fetch('/user/signup',{method:'POST', body: jsonData,headers:{
                'content-Type':'application/json'
            }})
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.status)
                {
                    console.log(data.url);
                    location.href=data.url 
                }else{
                    submission.innerText=data.message
                }
               
            })
   

    }
    else{
        submission.innerText=""
    }
}