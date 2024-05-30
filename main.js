import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";
const api = new API();

// Sayfa yüklendiğinde apiye istek atar. Popüler müzikleri listeler
document.addEventListener(
  "DOMContentLoaded",
  async () => await api.topPopular()
);
const playMusic = (url) =>{
  elements.audioSource.src = url;
  elements.audio.load();
  elements.audio.play();
}
// Card btn tıklandığında çalışır.
const handleClick = (e) => {
    if(e.target.id === "play-btn"){
        const parent = e.target.closest(".card");
        // Seçilen müziği bilgilerini gösterir
        renderPlayingInfo(parent.dataset);
        // Seçilen müziği çalar
        playMusic(parent.dataset.url);
    }
}
document.addEventListener("click", handleClick);

const animatePhoto = () =>{
  const img  = document.querySelector(".info img");
  img.className = "animate";
}
const stopAnimation = () =>{
  const img  = document.querySelector(".info img");
  img.classList.remove("animate");
}
// Müziği oynatma, resmi döndürme
elements.audio.addEventListener("play", animatePhoto);
// Müziği durdurma, dönen resmi durdurma
elements.audio.addEventListener("pause", stopAnimation);

elements.form.addEventListener("submit", (e) =>{
  e.preventDefault();
  const query = e.target[0].value;
  if(!query){
    return;
  }
  // Başlığı günceller
  updateTitle(`"${query}" İçin Sonuçlar`);
  api.searchMusic(query);
})

// Logo tıklayınca anasayfa açılması
elements.logoBtn.addEventListener("click",
async () => {
  await api.topPopular();
  updateTitle(`Beğenilen Şarkılar`);
  elements.form.reset();
}

)