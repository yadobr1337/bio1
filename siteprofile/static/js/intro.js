const btn=document.getElementById("enter-btn")
const audio=document.getElementById("bg-audio")
btn.addEventListener("click",async()=>{try{await audio.play()}catch(e){}window.location.href="/enter/"})
