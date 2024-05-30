import { renderSearchMusic, renderSongs } from "./ui.js";
const urlTop =
  "https://spotify23.p.rapidapi.com/recommendations/?limit=35&seed_tracks=0c6xIDDpzE81m2q797ordA&locale=tr-TR&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "eb8a367b91msh1ec388030d64543p154e93jsnb834dade3b6b",
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

export class API {
  constructor() {
    this.songs = [];
  }
  // Müzikleri listeler
  async topPopular() {
    try {
      const res = await fetch(urlTop, options);
      const result = await res.json();
      this.songs = result.tracks;
      renderSongs(this.songs);
    } catch (e) {
      console.log("Hata: Bir sorun oluştu.");
    }
  }
  // Aratılan müzikleri listeler
  async searchMusic(query) {
    try {
      const urlSearch = `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`;
      const optionsSearch = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "eb8a367b91msh1ec388030d64543p154e93jsnb834dade3b6b",
          "x-rapidapi-host": "shazam.p.rapidapi.com",
        },
      };
      const res = await fetch(urlSearch, optionsSearch);
      const data = await res.json();
      const newData = data.tracks.hits.map((song) => ({ ...song.track }));
      this.songs = newData;
      renderSearchMusic(this.songs);
    } catch (e) {
      console.log("Hata: Bir sorun oluştu.");
    }
  }
}
