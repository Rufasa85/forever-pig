document.querySelector("#logout").addEventListener("click",e=>{
    fetch("/api/adopters/logout",{
        method:"DELETE"
    }).then(res=>{
        if(res.ok){
          location.href="/"
        } else {
            alert("trumpet sound")
        }
    })
})