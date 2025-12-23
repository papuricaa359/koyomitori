function drawAndCalendar_type6(image) {
  const previewCanvas = document.getElementById("previewCanvas");
  const ctx = previewCanvas.getContext("2d");
  const canvasWidth = 1748;
  const canvasHeight = 1181;
  previewCanvas.width = canvasWidth;
  previewCanvas.height = canvasHeight;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  const cropAspectRatio = canvasWidth / canvasHeight;
  const imgAspectRatio = image.width / image.height;
  let sx, sy, sWidth, sHeight;
  if (imgAspectRatio > cropAspectRatio) {
    sHeight = image.height;
    sWidth = sHeight * cropAspectRatio;
    sx = (image.width - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = image.width;
    sHeight = sWidth / cropAspectRatio;
    sx = 0;
    sy = (image.height - sHeight) / 2;
  }
  ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
  const calendarCanvas = document.getElementById("calendarCanvas");
  const calendarWidth = calendarCanvas.width;
  const calendarHeight = calendarCanvas.height;
  const marginRight = 102;
  const marginBottom = 200;
  const calendarX = canvasWidth - calendarWidth - marginRight;
  const calendarY = canvasHeight - calendarHeight - marginBottom;
  ctx.drawImage(calendarCanvas, calendarX, calendarY);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
  const line1 = "このカレンダーはkoyomitoriを使用して生成されました。";
  const line2 = "https://papuricaa359.github.io/koyomitori/";
  const fontSize = 20;
  const padding = 20;
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = "black";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  const textX = canvasWidth - padding;
  const textY = canvasHeight - padding;
  ctx.fillText(line2, textX, textY);
  ctx.fillText(line1, textX, textY - fontSize - 5);
  updatePreviewImageAsJpeg();
}
