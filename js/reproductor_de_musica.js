// Song data
const songList = [
  {
    title: "Amakna",
    file: "amakna.mp3",
    cover: "arbol.png",
  },
  {
    title: "Bonta",
    file: "bonta.mp3",
    cover: "casa.png",
  },
  {
    title: "Incarnam",
    file: "incarnam.mp3",
    cover: "portal.png",
  },
];

//cancion actual
let actualSong = null;

// Capturar elementos del DOM para trabajar con JS
const fuego = document.getElementById("fuego");
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

progressContainer.addEventListener("click", setProgress);

// Escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress);

// Escuchar clicks en los controles
play.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());

// Cargar canciones y mostrar el listado de canciones
function loadSongs() {
  songList.forEach((song, index) => {
    //console.log(index);
    // Crear "li"
    const li = document.createElement("li");
    // Crear "a"
    const link = document.createElement("a");
    // Hidratar "a"
    link.textContent = song.title;
    link.href = "#";
    //Escuchar clicks
    link.addEventListener("click", () => {
      loadSong(index);
    }); //ponemos la funcion dentro de una funcion flecha para llamarla cuando hagamos clic y no cuando se recorra automaticamente
    // Añadir "a" a "li"
    li.appendChild(link);
    // Añadir "li" a "ul"
    songs.appendChild(li);
  });
}

// Cargar cancion seleccionada
function loadSong(songIndex) {
  //console.log(songIndex);

  if (songIndex !== actualSong) {
    changeActiveClass(actualSong, songIndex);
    actualSong = songIndex;

    audio.src = `./audio/${songList[songIndex].file}`;
    playSong();
    changeCover(songIndex);
  }
  changeSongTitle(songIndex);
  fuego.classList.add("active");
  play.classList.remove("disable-controls");
  next.classList.remove("disable-controls");
  prev.classList.remove("disable-controls");
}

// Actualizar barra de progreso de la cancion
function updateProgress(event) {
  //total y el actual
  const { duration, currentTime } = event.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";
}

// Hacer la barra de progreso clickeable
function setProgress(event) {
  const totalWidth = this.offsetWidth;
  const progressWidth = event.offsetX;
  const current = (progressWidth / totalWidth) * audio.duration;
  audio.currentTime = current;
}

// Actualizar controles
function updateControls() {
  if (audio.paused) {
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  } else {
    play.classList.add("fa-pause");
    play.classList.remove("fa-play");
  }
}

// Reproducir cancion
function playSong() {
  if (actualSong !== null) {
    audio.play();
    updateControls();
  }
}

// Pausar cancion
function pauseSong() {
  audio.pause();
  updateControls();
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
  const links = document.querySelectorAll("a");
  if (lastIndex !== null) {
    links[lastIndex].classList.remove("active");
  }
  links[newIndex].classList.add("active");
}

// Cambiar el cover de la cancion
function changeCover(songIndex) {
  cover.src = `./images/${songList[songIndex].cover}`;
}

// Cambiar el titulo de la cancion
function changeSongTitle(songIndex) {
  title.textContent = songList[songIndex].title;
}

// Anterior cancion
function prevSong() {
  if (actualSong > 0) {
    loadSong(actualSong - 1);
  } else {
    loadSong(songList.length - 1);
  }
}

// Siguiente cancion
function nextSong() {
  if (actualSong < songList.length - 1) {
    loadSong(actualSong + 1);
  } else {
    loadSong(0);
  }
}

// Lanzar siguiente cancnion cuando se acaba la actual
audio.addEventListener("ended", () => {
  nextSong();
});

// GO!
loadSongs();
