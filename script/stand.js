const standcanvas = document.getElementById('standcanvas');
const ctx = standcanvas.getContext('2d');
standcanvas.width = 2480;
standcanvas.height = 3508;

const standpreview = document.getElementById('standpreview');
const imageInput = document.getElementById('standimageInput');
const titleInput = document.getElementById('standtitleInput');
const footerInput = document.getElementById('standfooterInput');
const positionSelect = document.getElementById('standpositionSelect');
const fontSelect = document.getElementById('standfontSelect');
const colorSelect = document.getElementById('standcolorSelect');
const titlefontsizeInput = document.getElementById('standtitlefontsizeInput');
const footerfontsizeInput = document.getElementById('standfooterfontsizeInput');

let uploadedImage = null;

const standBackground = new Image();
standBackground.src = 'frame/stand.jpg';
standBackground.onload = () => {
    updateCanvas();
};
standBackground.onerror = () => {
    console.error('背景画像 stand.jpg の読み込みに失敗しました');
};

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
        uploadedImage = new Image();
        uploadedImage.onload = updateCanvas;
        uploadedImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

titleInput.addEventListener('input', updateCanvas);
footerInput.addEventListener('input', updateCanvas);
positionSelect.addEventListener('change', updateCanvas);
fontSelect.addEventListener('change', updateCanvas);
colorSelect.addEventListener('change', updateCanvas);
titlefontsizeInput.addEventListener('input', updateCanvas);
footerfontsizeInput.addEventListener('input', updateCanvas);

const aspectRatio = 1.77;

function updateCanvas() {
    ctx.clearRect(0, 0, standcanvas.width, standcanvas.height);
    ctx.drawImage(standBackground, 0, 0, standcanvas.width, standcanvas.height);

    const destWidth = 1768;
    const destHeight = destWidth / aspectRatio;
    const destX = 351;
    const destY = 2197;

    if (uploadedImage) {
        const imgW = uploadedImage.width;
        const imgH = uploadedImage.height;
        let cropW, cropH;

        if (imgW / imgH > aspectRatio) {
            cropH = imgH;
            cropW = cropH * aspectRatio;
        } else {
            cropW = imgW;
            cropH = cropW / aspectRatio;
        }

        const centerX = imgW / 2;
        const centerY = imgH / 2;
        const cropX = centerX - cropW / 2;
        const cropY = centerY - cropH / 2;

        ctx.drawImage(
            uploadedImage,
            cropX, cropY, cropW, cropH,
            destX, destY, destWidth, destHeight
        );
    }

    const title = titleInput.value;
    let yTitle;

    if (title) {
        ctx.font = `bold ${titlefontsizeInput.value}px ${fontSelect.value}`;
        ctx.fillStyle = colorSelect.value;
        ctx.textAlign = 'center';
        switch (positionSelect.value) {
            case 'top':
                ctx.textBaseline = 'top';
                yTitle = destY + 50;
                break;
            case 'center':
                ctx.textBaseline = 'middle';
                yTitle = destY + destHeight / 2;
                break;
            case 'bottom':
                ctx.textBaseline = 'bottom';
                yTitle = destY + destHeight - 50;
                break;
            default:
                ctx.textBaseline = 'middle';
                yTitle = destY + destHeight / 2;
        }

        ctx.fillText(title, standcanvas.width / 2, yTitle);
    }

    const footer = footerInput.value;
    if (footer) {
        ctx.font = `bold ${footerfontsizeInput.value}px ${fontSelect.value}`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        const yFooter = 870;
        ctx.fillText(footer, standcanvas.width / 2, yFooter);
    }

    standpreview.src = standcanvas.toDataURL('image/jpeg');
}
