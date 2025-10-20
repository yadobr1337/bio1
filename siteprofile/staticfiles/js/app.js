const enterBtn=document.getElementById("enter-btn")
const intro=document.getElementById("intro")
const stage=document.getElementById("stage")
const audio=document.getElementById("bg-audio")

async function startExperience(){
  try{
    if(audio.paused){ await audio.play() }
  }catch(e){
    console.warn("Audio play blocked:", e)
  }

  const video=document.createElement("video")
  video.className="bg-video"
  video.setAttribute("playsinline","")
  video.setAttribute("autoplay","")
  video.setAttribute("muted","")
  video.setAttribute("loop","")
  video.preload="metadata"
  const src=document.createElement("source")
  src.src=window.APP_CFG.videoSrc
  src.type="video/mp4"
  video.appendChild(src)
  document.body.appendChild(video)

  intro.classList.add("hidden")
  document.body.classList.remove("no-scroll")
  stage.classList.remove("hidden")

  try{
    await fetch(window.APP_CFG.addViewUrl,{credentials:"same-origin"})
      .then(r=>r.json())
      .then(data=>{
        const el=document.getElementById("views-count")
        if(el && data && typeof data.views==="number"){ el.textContent=data.views }
      })
  }catch(e){}
}

enterBtn.addEventListener("click",startExperience)
