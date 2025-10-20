const intro = document.getElementById("intro")
const enterBtn = document.getElementById("enter-btn")
const stage = document.getElementById("stage")
const audio = document.getElementById("bg-audio")

function bootState(){
  document.body.classList.add("no-scroll")
  intro.style.display = "flex"
  stage.classList.remove("stage--visible")
  stage.setAttribute("aria-hidden","true")
}

async function start(){
  try{
    audio.muted = false
    audio.currentTime = 0
    audio.load()
    await audio.play()
  }catch(e){ console.warn("audio:", e) }

  const video = document.createElement("video")
  video.className = "bg-video"
  video.playsInline = true
  video.autoplay = true
  video.loop = true
  video.muted = true
  const s = document.createElement("source")
  s.src = window.APP_CFG.videoSrc
  s.type = "video/mp4"
  video.appendChild(s)
  document.body.appendChild(video)
  try{ await video.play() }catch(e){ console.warn("video:", e) }

  intro.style.display = "none"
  document.body.classList.remove("no-scroll")

  // Надёжный запуск плавной анимации: двойной rAF
  stage.setAttribute("aria-hidden","false")
  stage.classList.remove("stage--visible")
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    stage.classList.add("stage--visible")
  }))

  try{
    const url = new URL(window.APP_CFG.addViewUrl, window.location.origin)
    url.searchParams.set("_", String(Date.now()))
    const r = await fetch(url.toString(), {
      credentials: "same-origin",
      cache: "no-store",
      headers: {"Accept":"application/json"}
    })
    const data = await r.json()
    const el = document.getElementById("views-count")
    if(el && typeof data.views === "number"){ el.textContent = data.views }
  }catch(e){ console.warn("view counter:", e) }
}

document.addEventListener("DOMContentLoaded", bootState)
enterBtn.addEventListener("click", start)
