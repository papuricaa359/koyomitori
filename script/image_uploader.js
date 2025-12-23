window.uploadedImage = null;
const imageInputListenersSet = new Set();

function setupImageInputListener(pageNum) {
  const input = document.getElementById(`ImageInput_${pageNum}`);
  if (!input) return;

  if (pageNum === 0) {
    input.style.display = "none";
    return;
  } else {
    input.style.display = "block";
  }

  if (imageInputListenersSet.has(pageNum)) return;
  imageInputListenersSet.add(pageNum);

  input.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const image = new Image();
      image.onload = () => {
        window.uploadedImage = image;
        const type = document.querySelector('input[name="type"]:checked').value;
        drawCalendar(type, window.uploadedImage);
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

window.handlePageChange = function (pageNum) {
  if (pageNum === 0) {
    const image = new Image();
    image.onload = () => {
      window.uploadedImage = image;
      const type = document.querySelector('input[name="type"]:checked').value;
      drawCalendar(type, window.uploadedImage);
    };
    image.src = "img/sample.jpg";
  } else {
    setupImageInputListener(pageNum);
    const input = document.getElementById(`ImageInput_${pageNum}`);
    if (input && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = new Image();
        image.onload = () => {
          window.uploadedImage = image;
          const type = document.querySelector('input[name="type"]:checked').value;
          drawCalendar(type, window.uploadedImage);
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      window.uploadedImage = null;
      const type = document.querySelector('input[name="type"]:checked').value;
      drawCalendar(type, null);
    }
  }
};