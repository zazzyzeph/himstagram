class BandcampPlayer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const button = document.createElement('button');
    const buttonText = document.createTextNode('Load embedded content from bandcamp.com')
    button.setAttribute('type', 'button');
    button.classList.add('button');
    button.appendChild(buttonText);
    this.innerHTML = '';
    this.append(button);
    button.addEventListener('click', e => {
      button.style.display = 'none';
      const url = this.dataset.url;
      const album = this.dataset.album;
      const track = this.dataset.track;
      const title = this.dataset.title;
      const player = this.makeEmbed(url, album, track, title);
      this.append(player)
    }) 
  }
  makeEmbed(url, album, track, title) {
    const player = document.createElement('iframe');
    player.style.border = '0';
    player.style.width = '100%';
    player.style.height = '120px';
    player.src = `https://bandcamp.com/EmbeddedPlayer/album=${album}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=${track}/transparent=true/`;
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const linkText = document.createTextNode(title);
    link.appendChild(linkText);
    player.appendChild(link);
    return player;
  }
}

export { BandcampPlayer };
