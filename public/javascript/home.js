function AddToCart(e,b){
    e.preventDefault()
    const id={productId:b}
    const stId=JSON.stringify(id)
    console.log(id);
    var userConfirmed = confirm('Do you sure Add this product to cart');
    if(userConfirmed)
    {

        fetch('/user/AddToCart',{method:"post",body:stId,headers:{'content-Type':'application/json'}})
        .then((e)=>e.json())
        .then((data)=>{
            const one=data
            if(one.success)
            {
                setTimeout(()=>{
                    window.alert('Item added to the cart successfully!');
                },500)
            }
            else{
                window.alert('Failed to add item to the cart. Please try again.');
            }
        })
    }
}