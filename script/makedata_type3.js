function drawAndCalendar_type3(image) {
  const previewCanvas = document.getElementById("previewCanvas");
  const ctx = previewCanvas.getContext("2d");
  const canvasWidth = 1748;
  const canvasHeight = 1181;
  previewCanvas.width = canvasWidth;
  previewCanvas.height = canvasHeight;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  const cropAspectRatio = 3 / 4;
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
  const displayWidth = (canvasHeight * cropAspectRatio * 0.6);
  const displayHeight = canvasHeight * 0.6;
  const marginLeft = 200;
  const posY = (canvasHeight - displayHeight) / 2;
  ctx.drawImage(image, sx, sy, sWidth, sHeight, marginLeft, posY, displayWidth, displayHeight);
  const calendarCanvas = document.getElementById("calendarCanvas");
  const calendarAspectRatio = calendarCanvas.width / calendarCanvas.height;
  const calendarWidth = canvasHeight * calendarAspectRatio;
  const calendarX = canvasWidth - calendarWidth;
  ctx.drawImage(calendarCanvas, calendarX, 0, calendarWidth, canvasHeight);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
  const line1 = "このカレンダーはkoyomitoriを使用して生成されました。";
  const line2 = "https://papuricaa359.github.io/koyomitori/";
  const fontSize = 20;
  const padding = 20;
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  const textWidth = Math.max(ctx.measureText(line1).width, ctx.measureText(line2).width);
  const textX = canvasWidth - padding - textWidth;
  const textY = canvasHeight - padding;
  ctx.fillText(line2, textX, textY);
  ctx.fillText(line1, textX, textY - fontSize - 5);
  updatePreviewImageAsJpeg();
}