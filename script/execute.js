document.addEventListener("DOMContentLoaded", () => {
  setupSelectors();

  const selectors = ["yearSelect", "fontSelect"];
  selectors.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", () => {
        runByType();
      });
    }
  });

  const typeRadios = document.querySelectorAll('input[name="type"]');
  typeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      runByType();
    });
  });

  runByType();
});

function runByType() {
  const typeRadio = document.querySelector('input[name="type"]:checked');
  const type = typeRadio ? typeRadio.value : "type1";
  drawCalendar(type, window.uploadedImage || null);
}

function drawCalendar(type, image = null) {
  switch (type) {
    case "type1":
      generateCalendar_type1();
      if (image) drawAndCalendar_type1(image);
      break;
    case "type2":
      generateCalendar_type1();
      if (image) drawAndCalendar_type2(image);
      break;
    case "type3":
      generateCalendar_type3();
      if (image) drawAndCalendar_type3(image);
      break;
    case "type4":
      generateCalendar_type3();
      if (image) drawAndCalendar_type4(image);
      break;
    case "type5":
      generateCalendar_type5();
      if (image) drawAndCalendar_type5(image);
      break;
    case "type6":
      generateCalendar_type6();
      if (image) drawAndCalendar_type6(image);
      break;
  }
} 