function generateCalendar_type5() {
  const canvas = document.getElementById("calendarCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const year = parseInt(document.getElementById("yearSelect").value);
  let month = window.pagenumber;
  if (month === 0) month = 1;
  const font = document.getElementById("fontSelect").value;
  canvas.width = 567;
  canvas.height = 1181;
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const cellWidth = 52;
  const cellHeight = 45;
  const dayHeaderHeight = 23;
  const bottomMargin = 200;
  const tableWidth = cellWidth * 7;
  const tableHeight = dayHeaderHeight + cellHeight * 6;
  const startX = (canvas.width - tableWidth) / 2;
  const startY = canvas.height - bottomMargin - tableHeight;
  const bigFontSize = 300;
  const smallFontSize = 60;
  const dayFontSize = 32;
  const weekdayFontSize = 18;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.font = `bold 50px '${font}'`;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText(`${year}`, canvas.width - 30, 30);
  const monthNumberY = startY - 90;
  const monthEnglishY = startY - 30;
  ctx.fillStyle = "#000";
  ctx.font = `bold ${bigFontSize}px '${font}'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(month.toString(), canvas.width / 2, monthNumberY);
  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  ctx.font = `bold ${smallFontSize}px '${font}'`;
  ctx.fillText(monthNames[month - 1], canvas.width / 2, monthEnglishY);
  ctx.font = `bold ${weekdayFontSize}px '${font}'`;
  for (let i = 0; i < 7; i++) {
    const x = startX + i * cellWidth;
    const y = startY;
    ctx.fillStyle = (i === 0) ? "red" : (i === 6) ? "blue" : "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(days[i], x + cellWidth / 2, y + dayHeaderHeight / 2);
  }
  const firstDay = new Date(year, month - 1, 1);
  const startWeekday = firstDay.getDay();
  const lastDay = new Date(year, month, 0).getDate();
  const prevMonthLast = new Date(year, month - 1, 0).getDate();
  const prevMonthStart = prevMonthLast - startWeekday + 1;
  let dayCounter = 1;
  let row = 0;
  let col = 0;
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
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(displayDay, x + cellWidth / 2, y + cellHeight / 2);
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
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00FF,
    B = f & 0x0000FF;
  return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
}