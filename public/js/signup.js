const signupForm = document.querySelector("#signupForm")
document.querySelector("#getCurrPos").addEventListener("click",e=>{
    signupForm.classList.add("loading")
    navigator.geolocation.getCurrentPosition((data)=>{
        console.log(data.coords);
        signupForm.classList.remove("loading")
        document.querySelector("#signupLat").value = data.coords.latitude
        document.querySelector("#signupLng").value = data.coords.longitude
    })
})

signupForm.addEventListener("submit",e=>{
    e.preventDefault();
    const adopterObj = {
        email:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value,
        displayName:document.querySelector("#signupDisplayName").value,
        lat:document.querySelector("#signupLat").value,
        lng:document.querySelector("#signupLng").value,
    }
    console.log('adopterObj', adopterObj)
    fetch("/api/adopters",{
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