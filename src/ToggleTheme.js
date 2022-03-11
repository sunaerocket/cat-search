class ToggleTheme {
  constructor({ $target, onToggle }) {
    const $toggleButton = document.createElement('label');
    this.$toggleButton = $toggleButton;
    $toggleButton.className = 'ToggleButton';
    $target.appendChild($toggleButton);

    const $switch = document.createElement('input');
    $switch.setAttribute('type', 'checkbox');

    $toggleButton.appendChild($switch);

    const $slider = document.createElement('span');
    $slider.className = 'slider';
    $toggleButton.appendChild($slider);

    this.onToggle = onToggle;

    if (matchMedia('(prefers-color-scheme: dark)').matches) {
      $switch.checked = true;
      onToggle();
    }

    $toggleButton.addEventListener('change', () => {
      onToggle();
    });
  }
}
