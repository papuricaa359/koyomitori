function setupSelectors() {
  const yearSelect = document.getElementById("yearSelect");
  const fontSelect = document.getElementById("fontSelect");
  const today = new Date();
  for (let y = today.getFullYear(); y <= 2030; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
  const fonts = [
    "Arial", "Verdana", "Helvetica", "Times New Roman", "Courier New", "Lucida Console", "Tahoma", "Trebuchet MS",
    "Impact", "Comic Sans MS", "Palatino Linotype", "Garamond", "MS Gothic", "Noto Sans", "Roboto", "Open Sans", "Lato", "Montserrat",
    "Source Sans Pro", "Ubuntu", "PT Sans", "Merriweather", "Nunito", "Playfair Display"
  ];
  fonts.forEach(font => {
    const option = document.createElement("option");
    option.value = font;
    option.textContent = font;
    fontSelect.appendChild(option);
  });
  yearSelect.value = today.getFullYear();
  fontSelect.value = fonts[0];
}
function standPositionSelect() {
    const select = document.getElementById('standpositionSelect');
    const options = [
        { value: 'top', text: '上部' },
        { value: 'center', text: '中央' },
        { value: 'bottom', text: '下部' }
    ];
    options.forEach(({ value, text }) => {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = text;
        select.appendChild(opt);
    });
}
function standFontSelect() {
    const select = document.getElementById('standfontSelect');
    const fonts = [
        { value: "'Noto Sans JP', sans-serif", text: 'Noto Sans JP (ゴシック体)' },
        { value: "'Yu Gothic', '游ゴシック', sans-serif", text: '游ゴシック (Yu Gothic, ゴシック体)' },
        { value: "'Meiryo', 'メイリオ', sans-serif", text: 'メイリオ (Meiryo, ゴシック体)' },
        { value: "'MS PGothic', 'ＭＳ Ｐゴシック', sans-serif", text: 'MS Pゴシック (ゴシック体)' },
        { value: "'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', sans-serif", text: 'ヒラギノ角ゴ Pro (ゴシック体)' },
        { value: "'Yu Mincho', '游明朝', serif", text: '游明朝 (Yu Mincho, 明朝体)' },
        { value: "'MS PMincho', 'ＭＳ Ｐ明朝', serif", text: 'MS P明朝 (明朝体)' },
        { value: "'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro W3', serif", text: 'ヒラギノ明朝 Pro (明朝体)' },
        { value: "'Kozuka Mincho Pro', '小塚明朝 Pro', serif", text: '小塚明朝 Pro (明朝体)' },
        { value: "'Noto Serif JP', serif", text: 'Noto Serif JP (明朝体)' }
    ];


    fonts.forEach(({ value, text }) => {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = text;
        select.appendChild(opt);
    });
}
function standColorSelect() {
    const select = document.getElementById('standcolorSelect');
    const options = [
        { value: '#000', text: '黒' },
        { value: '#fff', text: '白'}
    ];
    options.forEach(({ value, text }) => {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = text;
        select.appendChild(opt);
    });
}
window.addEventListener('DOMContentLoaded', () => {
    standPositionSelect();
    standFontSelect();
    standColorSelect();
}); 