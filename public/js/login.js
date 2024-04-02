document.querySelector("#loginForm").addEventListener("submit",e=>{
    e.preventDefault();
    const adopterObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    console.log('adopterObj', adopterObj)
    fetch("/api/adopters/login",{
        method:"POST",
        body:JSON.stringify(adopterObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/profile"
        } else {
            alert("trumpet sound")
        }
    })
})