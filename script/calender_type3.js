function generateCalendar_type3() {
  const canvas = document.getElementById("calendarCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const year = parseInt(document.getElementById("yearSelect").value);
  let month = window.pagenumber;
  if (month === 0) month = 1;
  const font = document.getElementById("fontSelect").value;
  canvas.width = 940;
  canvas.height = 1181;
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const cellWidth = 110;
  const cellHeight = 128;
  const dayHeaderHeight = 47;
  const bottomMargin = 200;
  const tableWidth = cellWidth * 7;
  const tableHeight = dayHeaderHeight + cellHeight * 6;
  const startX = (canvas.width - tableWidth) / 2;
  const startY = canvas.height - bottomMargin - tableHeight;
  const bigFontSize = 160;
  const smallFontSize = 60;
  const yearFontSize = 50;
  const dayFontSize = 40;
  const weekdayFontSize = 35;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const leftX = 50;
  const baselineY = startY;
  const monthAreaWidth = 150;
  ctx.fillStyle = "#000";
  ctx.font = `bold ${bigFontSize}px '${font}'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(month.toString(), leftX + 100, baselineY + 10);
  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];
  ctx.font = `bold ${smallFontSize}px '${font}'`;
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  const monthNameX = leftX + monthAreaWidth + 60;
  ctx.fillText(monthNames[month - 1], monthNameX, baselineY - 10);
  ctx.font = `bold ${yearFontSize}px '${font}'`;
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  const yearX = monthNameX;
  const yearY = baselineY + 23 - smallFontSize - 25;
  ctx.fillText(`${year}`, yearX, yearY);
  ctx.font = `bold ${weekdayFontSize}px '${font}'`;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  for (let i = 0; i < 7; i++) {
    const x = startX + i * cellWidth;
    const y = startY;
    ctx.fillStyle = (i === 0) ? "red" : (i === 6) ? "blue" : "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(days[i], x + cellWidth / 2, y + dayHeaderHeight / 2);
    ctx.beginPath();
    if (i < 6) {
      ctx.moveTo(x + cellWidth, y);
      ctx.lineTo(x + cellWidth, y + dayHeaderHeight);
    }
    ctx.moveTo(x, y + dayHeaderHeight);
    ctx.lineTo(x + cellWidth, y + dayHeaderHeight);
    ctx.stroke();
  }
  const firstDay = new Date(year, month - 1, 1);
  const startWeekday = firstDay.getDay();
  const lastDay = new Date(year, month, 0).getDate();
  const prevMonthLast = new Date(year, month - 1, 0).getDate();
  const prevMonthStart = prevMonthLast - startWeekday + 1;
  let dayCounter = 1;
  let row = 0;
  let col = 0;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  for (let i = 0; i < 42; i++) {
    const x = startX + col * cellWidth;
    const y = startY + dayHeaderHeight + row * cellHeight;
    let displayDay = "";
    let currentDate = null;
    let isDimmed = false;
    let color = "#000";
    if (i < startWeekday) {
      displayDay = prevMonthStart + i;
      currentDate = new Date(year, month - 2, displayDay);
      isDimmed = true;
    } else if (dayCounter <= lastDay) {
      displayDay = dayCounter;
      currentDate = new Date(year, month - 1, displayDay);
      dayCounter++;
    } else {
      displayDay = i - startWeekday - lastDay + 1;
      currentDate = new Date(year, month, displayDay);
      isDimmed = true;
    }
    const dayOfWeek = currentDate.getDay();
    if (isHoliday(currentDate)) {
      color = (dayOfWeek === 0) ? "red" : (dayOfWeek === 6) ? "blue" : "red";
    } else if (dayOfWeek === 0) {
      color = "red";
    } else if (dayOfWeek === 6) {
      color = "blue";
    }
    if (isDimmed) {
      color = shadeColor(color, 0.5);
    }
    ctx.fillStyle = color;
    ctx.font = `bold ${dayFontSize}px '${font}'`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(displayDay, x + 10, y + 10);
    ctx.beginPath();
    if (col < 6) {
      ctx.moveTo(x + cellWidth, y);
      ctx.lineTo(x + cellWidth, y + cellHeight);
    }
    if (row < 5) {
      ctx.moveTo(x, y + cellHeight);
      ctx.lineTo(x + cellWidth, y + cellHeight);
    }
    ctx.stroke();

    col++;
    if (col === 7) {
      col = 0;
      row++;
    }
  }
}
function shadeColor(color, percent) {
  let f = parseInt(color === "red" ? "ff0000" : color === "blue" ? "0000ff" : "000000", 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? -percent : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00FF,
    B = f & 0x0000FF;
  return `rgb(${Math.round((t - R) * p + R)},${Math.round((t - G) * p + G)},${Math.round((t - B) * p + B)})`;
}
