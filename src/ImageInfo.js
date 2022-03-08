class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <article class="content-wrapper">
          <header class="title">
            <h1>${name}</h1>
            <button class="close">x</button>
          </header>
          <figure>
            <img src="${url}" alt="${name}"/>
            <section class="description">
              <figcaption>성격: ${temperament}</figcaption>
              <figcaption>태생: ${origin}</figcaption>
            </section>
          </figure>
        </article>`;
      this.$imageInfo.style.display = 'block';
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
