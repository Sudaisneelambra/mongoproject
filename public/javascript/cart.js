function conformation(b) {
    b.preventDefault()
    var inp = document.getElementById('inp').value;
    console.log(inp);
    var userConfirmed = confirm('Do you sure to delete this product in cart');
    if(userConfirmed)
    {
        fetch('/user/delete',{method:"post",body:JSON.stringify({inp}),headers:{'Content-Type': 'application/json'}})
        .then((e)=>e.json())
        .then((data)=>{
            location.href=data.url
        })
    }
  
}