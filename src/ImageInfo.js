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

  onClose() {
    const wrapper = document.querySelector('.content-wrapper');
    wrapper.classList.remove('fadein');
    wrapper.classList.add('fadeout');
    wrapper.onanimationend = () => {
      wrapper.classList.remove('fadeout');

      this.setState({
        visible: false,
        image: null,
      });
    };
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data;

      this.$imageInfo.innerHTML = `
        <article class="content-wrapper">
          <header class="title">
            <h1>${name}</h1>
            <button class="close">&times;</button>
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
      const wrapper = document.querySelector('.content-wrapper');
      wrapper.classList.add('fadein');
      wrapper.onanimationend = () => {
        wrapper.classList.remove('fadein');
      };

      this.$imageInfo.addEventListener('click', (event) => {
        const className = event.target.className;

        const isCloseButton = className === 'close';
        const isOverlay = className === 'ImageInfo';

        if (isCloseButton || isOverlay) {
          this.onClose();
        }
      });

      document.body.addEventListener('keyup', (event) => {
        if (event.key === 'Escape') {
          this.onClose();
        }
      });
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
