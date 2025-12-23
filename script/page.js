window.pagenumber = 0;
const totalPages = 13;

const generateMonthPages = () => {
  const container = document.getElementById('main_preview_area');
  if (!container) return;
  const monthNames = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];
  let html = "";
  for (let i = 1; i <= 12; i++) {
    html += `
      <div id="page_${i}" class="preview-container" style="display: none;">
        <input type="file" id="ImageInput_${i}" class="hidden-input" accept="image/*" style="display: none;" />
        <div class="upload-box">
          <label for="ImageInput_${i}" class="custom-file-upload">
            <div class="upload-content">
              <span class="upload-icon">📷</span>
              <span class="upload-text">${i}月の画像を選択</span>
              <span class="file-name-display" id="fileName_${i}">選択されていません</span>
            </div>
          </label>
        </div>
        <img id="preview_${i}" class="preview" src="frame/${monthNames[i - 1]}.jpg">
      </div>
    `;
  }
  container.innerHTML = html;
};

window.isCanvasBlank = function (canvas) {
  if (!canvas) return true;
  const context = canvas.getContext('2d');
  const pixelBuffer = new Uint32Array(
    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );
  return !pixelBuffer.some(color => color !== 0);
};

const applySize = (el, h) => {
  if (!el) return;
  el.removeAttribute('width');
  el.removeAttribute('height');
  el.style.setProperty('height', `${h}px`, 'important');
  el.style.setProperty('width', 'auto', 'important');
  el.style.setProperty('max-width', '100%', 'important');
  el.style.setProperty('display', 'block', 'important');
  el.style.setProperty('object-fit', 'contain', 'important');
};

const updateStandSize = () => {
  const standImg = document.getElementById("standpreview");
  const standArea = document.querySelector(".stand-content-area");
  const header = document.getElementById("header");
  const baseH = window.innerHeight;

  if (standImg) {
    applySize(standImg, baseH);
    const imgWidth = standImg.getBoundingClientRect().width;
    const leftWidth = window.innerWidth - imgWidth;
    if (leftWidth > 0) {
      if (header) {
        header.style.setProperty('width', `${leftWidth}px`, 'important');
        header.style.marginLeft = "0";
        header.style.marginRight = "auto";
      }
      if (standArea) {
        standArea.style.width = `${leftWidth}px`;
      }
    }
  }
};
const updateAllSizes = () => {
  const standDiv = document.getElementById("stand");
  if (standDiv && standDiv.style.display === "flex") {
    updateStandSize();
    return;
  }
  const baseH = window.innerHeight - 85;
  const mainH = baseH / 2;
  const thumbH = baseH / 8;
  document.querySelectorAll('.preview').forEach(el => {
    applySize(el, mainH);
  });
  document.querySelectorAll('.preview_all').forEach(el => {
    applySize(el, thumbH);
  });

  const currentMain = document.getElementById(`preview_${window.pagenumber}`);
  const previewList = document.getElementById('preview_list');
  const header = document.getElementById('header');

  if (!header) return;
  if (!header.classList.contains('calender')) {
    header.style.removeProperty('width');
    header.style.removeProperty('display');
    header.style.removeProperty('margin-left');
    header.style.removeProperty('margin-right');
    if (previewList) {
      previewList.style.removeProperty('width');
      previewList.style.removeProperty('margin-left');
      previewList.style.removeProperty('margin-right');
    }
    return;
  }
  if (currentMain) {
    const imgWidth = currentMain.getBoundingClientRect().width;
    if (imgWidth > 0) {
      const headerWidth = window.innerWidth - imgWidth;
      header.style.setProperty('width', `${headerWidth}px`, 'important');
      header.style.setProperty('display', 'block', 'important');
      header.style.marginLeft = "0";
      header.style.marginRight = "auto";

      const currentBox = document.querySelector(`#page_${window.pagenumber} .upload-box`);
      if (currentBox) {
        currentBox.style.setProperty('width', `${headerWidth}px`, 'important');
        currentBox.style.marginLeft = "0";
        currentBox.style.marginRight = "auto";
      }
      if (previewList) {
        previewList.style.setProperty('width', `${imgWidth}px`, 'important');
        previewList.style.marginLeft = "auto";
        previewList.style.marginRight = "0";
      }
    }
  }
};
window.updatePreviewImageAsJpeg = function () {
  const canvas = document.getElementById('previewCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const img = document.getElementById(`preview_${window.pagenumber}`);
  const all_preview_img = document.getElementById(`all_preview_${window.pagenumber}`);
  if (!window.isCanvasBlank(canvas)) {
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    if (img) img.src = dataURL;
    if (all_preview_img) all_preview_img.src = dataURL;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(updateAllSizes, 50);
  }
};

function showPage(num) {
  for (let i = 0; i < totalPages; i++) {
    const page = document.getElementById(`page_${i}`);
    if (page) {
      page.style.display = (i === num) ? "block" : "none";
    }
  }

  const settingDiv = document.getElementById("setting");
  const prevBtn = document.getElementById("prevpageBtn");
  const nextBtn = document.getElementById("nextpageBtn");
  const tostandBtn = document.getElementById("tostandBtn");
  const preview_list = document.getElementById("preview_list");
  const headertext = document.getElementById("headertext");
  const header = document.getElementById("header");
  document.getElementById("stand").style.display = "none";
  document.getElementById("calender").style.display = "block";
  const viewport = document.getElementById("viewport") || document.querySelector(".viewportbutton");
  if (viewport) viewport.style.display = "flex";

  if (num === 0) {
    if (settingDiv) settingDiv.style.display = "block";
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "block";
    headertext.textContent = "カレンダーの設定を選択してください。";
    header.classList.remove('calender');
    if (preview_list) preview_list.style.display = "none";
  } else {
    if (settingDiv) settingDiv.style.display = "none";
    if (prevBtn) prevBtn.style.display = "block";
    if (nextBtn) nextBtn.style.display = (num === 12) ? "none" : "block";
    if (tostandBtn) tostandBtn.style.display = (num === 12) ? "block" : "none";
    headertext.textContent = `${num}月の画像をアップロードしてください。`;
    header.classList.add('calender');
    if (preview_list) preview_list.style.display = "block";
  }

  updateAllSizes();
}

function nextPage() {
  if (window.pagenumber < totalPages - 1) {
    window.pagenumber++;
    showPage(window.pagenumber);
    if (window.handlePageChange) window.handlePageChange(window.pagenumber);
  }
}

function prevPage() {
  if (window.pagenumber > 0) {
    window.pagenumber--;
    showPage(window.pagenumber);
    if (window.handlePageChange) window.handlePageChange(window.pagenumber);
  }
}
function toStand() {
  document.getElementById("calender").style.display = "none";
  const viewport = document.getElementById("viewport") || document.querySelector(".viewportbutton");
  if (viewport) viewport.style.display = "none";
  
  const standDiv = document.getElementById("stand");
  standDiv.style.display = "flex";
  document.getElementById("headertext").textContent = "スタンドの設定をしてください。";
  setTimeout(updateStandSize, 50);
}
function tocalender() {
  window.pagenumber = 12;
  document.getElementById("calender").style.display = "block";
  const viewport = document.getElementById("viewport") || document.querySelector(".viewportbutton");
  if (viewport) viewport.style.display = "flex";
  document.getElementById("stand").style.display = "none";
  showPage(window.pagenumber);
}
generateMonthPages();
document.getElementById("nextpageBtn").addEventListener("click", nextPage);
document.getElementById("prevpageBtn").addEventListener("click", prevPage);
document.getElementById("tostandBtn").addEventListener("click", toStand);
document.getElementById("tocalenderBtn").addEventListener("click", tocalender);
document.getElementById("agree").addEventListener("click", function () {
  document.getElementById("rule").style.display = "none";
});
document.getElementById("disagree").addEventListener("click", function () {
  location.href = "/";
});
window.addEventListener('resize', updateAllSizes);
document.querySelectorAll('.hidden-input').forEach(input => {
  input.addEventListener('change', function (e) {
    const pageNum = this.id.split('_')[1];
    const displayId = this.id === "standimageInput" ? "standFileName" : `fileName_${pageNum}`;
    const displayElement = document.getElementById(displayId);
    if (this.files && this.files.length > 0) {
      if (displayElement) {
        displayElement.textContent = this.files[0].name;
        displayElement.style.color = "#2d5a27";
      }
    } else {
      if (displayElement) {
        displayElement.textContent = "選択されていません";
        displayElement.style.color = "#888";
      }
    }
  });
});
showPage(window.pagenumber);
if (window.handlePageChange) window.handlePageChange(window.pagenumber);