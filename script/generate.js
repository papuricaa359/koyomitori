document.getElementById('generateBtn').addEventListener('click', async () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  const missingMonths = [];
  const previews = [];
  const monthNames = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  for (let i = 1; i <= 12; i++) {
    const img = document.getElementById(`preview_${i}`);
    const defaultSrc = `frame/${monthNames[i - 1]}.jpg`;
    if (!img || img.src.includes(defaultSrc)) {
      missingMonths.push(i);
    } else {
      previews.push(img);
    }
  }
  if (missingMonths.length > 0) {
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const missingStr = missingMonths.map(m => monthNames[m - 1]).join(', ');
    alert(`以下の画像が未設定です:\n${missingStr}`);
    return;
  }

  const postcardWidth = 148;
  const postcardHeight = 100;
  const marginLeft = 10;
  const marginTop = 10;
  for (let page = 0; page < 6; page++) {
    if (page > 0) pdf.addPage();
    const img1 = previews[page * 2];
    const img2 = previews[page * 2 + 1];
    await new Promise((resolve) => {
      const image = new Image();
      image.src = img1.src;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1748;
        canvas.height = 1181;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', marginLeft, marginTop, postcardWidth, postcardHeight);
        resolve();
      };
    });
    await new Promise((resolve) => {
      const image = new Image();
      image.src = img2.src;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1181;
        canvas.height = 1748;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const yPos = marginTop + postcardHeight;
        pdf.addImage(imgData, 'JPEG', marginLeft, yPos, postcardWidth, postcardHeight);
        resolve();
      };
    });
  }
  pdf.addPage();
  const standImg = document.getElementById('standpreview');
  if (standImg && standImg.src) {
    await new Promise((resolve) => {
      const image = new Image();
      image.src = standImg.src;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        resolve();
      };
    });
  }
  const pdfBlobUrl = pdf.output('bloburl');
  window.open(pdfBlobUrl);
});
