import { elements } from "./helpers.js";
// Müzikleri listeleyecek fonksiyon
export const renderSongs = (songs) =>{    
    elements.list.innerHTML = "";
    songs.forEach((song) =>{
        const div = document.createElement("div");
        div.dataset.url = song.preview_url;
        div.dataset.title = song.name;
        div.dataset.subtitle = song.album.artists[0].name;
        div.dataset.img = song.album.images[1].url;
        div.className = "card";
        div.innerHTML = `
        <figure>
            <img src="${song.album.images[0].url}" alt="image" />
            <div class="play">
                <i class="bi bi-play-fill" id="play-btn"></i>
            </div>
        </figure>
        <h4>${song.album.artists[0].name}</h4>
        <h5>${song.name.length >30 ? song.name.slice(0, 30) + "..." : song.name}</h5>
        `;
        elements.list.appendChild(div);
    })
}
// Aratılan müzikleri listeleyecek fonksiyon
export const renderSearchMusic = (songs) =>{    
    elements.list.innerHTML = "";
    songs.forEach((song) =>{
        const div = document.createElement("div");
        div.dataset.url = song.hub?.actions?.pop().uri;
        div.dataset.title = song.title;
        div.dataset.subtitle = song.subtitle;
        div.dataset.img = song.images?.coverart;
        div.className = "card";
        div.innerHTML = `
        <figure>
            <img src="${song.images?.coverart}" alt="image" />
            <div class="play">
                <i class="bi bi-play-fill" id="play-btn"></i>
            </div>
        </figure>
        <h4>${song.subtitle}</h4>
        <h5>${song.title.length > 30 ? song.title.slice(0, 30) + "..." : song.title}</h5>
        `;
        elements.list.appendChild(div);
    })
}
// Çalınacak müzik
export const renderPlayingInfo = (song) =>{
    elements.playingInfo.innerHTML = `
    <img
        src="${song.img}"
        id="info-img"
        class=""
        alt=""
    />
    <div>
        <p>Şu an oynatılıyor...</p>
        <h3>${song.title}</h3>
        <h6>( ${song.subtitle} )</h6>
    </div>`;
}
export const updateTitle = (message) =>{
    elements.title.innerText = message;
}

// Menu
elements.menu.addEventListener("click", () =>{
    elements.ulList.classList.toggle("toggle");
})