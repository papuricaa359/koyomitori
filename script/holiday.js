// 春分・秋分の日計算
function calculateSpringEquinoxDay(year) {
  return Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}
function calculateAutumnEquinoxDay(year) {
  return Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}
function isOriginalHoliday(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = date.getDay();
  if (m === 1 && d === 1) return true;                      // 元日
  if (m === 1 && w === 1 && d >= 8 && d <= 14) return true; // 成人の日（1月第2月曜）
  if (m === 2 && d === 11) return true;                     // 建国記念の日
  if (m === 2 && d === 23) return true;                     // 天皇誕生日
  if (m === 3 && d === calculateSpringEquinoxDay(y)) return true;  // 春分の日
  if (m === 4 && d === 29) return true;                     // 昭和の日
  if (m === 5 && d >= 3 && d <= 5) return true;             // 憲法記念日～こどもの日
  if (m === 7 && w === 1 && d >= 15 && d <= 21) return true; // 海の日（7月第3月曜）
  if (m === 8 && d === 11) return true;                     // 山の日
  if (m === 9 && w === 1 && d >= 15 && d <= 21) return true; // 敬老の日（9月第3月曜）
  if (m === 9 && d === calculateAutumnEquinoxDay(y)) return true; // 秋分の日
  if (m === 10 && w === 1 && d >= 8 && d <= 14) return true; // 体育の日（10月第2月曜）
  if (m === 11 && (d === 3 || d === 23)) return true;       // 文化の日、勤労感謝の日
  if (m === 12 && d === 23) return true;                    // 天皇誕生日（平成時代）

  return false;
}
// 振替休日
function isSubstituteHoliday(date) {
  if (date.getDay() === 0) return false;
  const sun = new Date(date);
  sun.setDate(date.getDate() - date.getDay());
  if (!isOriginalHoliday(sun)) return false;
  const mon = new Date(sun);
  mon.setDate(sun.getDate() + 1);
  const tue = new Date(sun);
  tue.setDate(sun.getDate() + 2);
  if (date.getTime() === mon.getTime() && !isOriginalHoliday(mon)) {
    return true;
  }
  if (
    date.getTime() === tue.getTime() &&
    isOriginalHoliday(mon) &&
    !isOriginalHoliday(tue)
  ) {
    return true;
  }
  return false;
}

// 国民の休日
function isCitizenHoliday(date) {
  if (isOriginalHoliday(date)) return false;
  if (isSubstituteHoliday(date)) return false;
  if (date.getDay() === 0 || date.getDay() === 6) return false; // 土日除外

  let prev = new Date(date);
  prev.setDate(date.getDate() - 1);
  let next = new Date(date);
  next.setDate(date.getDate() + 1);

  return (isOriginalHoliday(prev) || isSubstituteHoliday(prev)) &&
         (isOriginalHoliday(next) || isSubstituteHoliday(next));
}
// 総合判定
function isHoliday(date) {
  return isOriginalHoliday(date) || isSubstituteHoliday(date) || isCitizenHoliday(date);
}