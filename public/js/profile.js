const adoptBtns = document.querySelectorAll(".adopt");
const returnBtns = document.querySelectorAll(".return");

adoptBtns.forEach(btn=>{
    btn.addEventListener("click",e=>{
       const idToAdopt = e.target.getAttribute("data-pig-id");
       fetch(`/api/pigs/${idToAdopt}/adopt`,{
           method:"PUT"
       }).then(res=>{
           if(res.ok){
              location.reload()
           } else {
               alert("trumpet sound")
           }
       })
    })
})

returnBtns.forEach(btn=>{
    btn.addEventListener("click",e=>{
       const idToReturn = e.target.getAttribute("data-pig-id");
       fetch(`/api/pigs/${idToReturn}/return`,{
           method:"PUT"
       }).then(res=>{
           if(res.ok){
              location.reload()
           } else {
               alert("trumpet sound")
           }
       })
    })
})