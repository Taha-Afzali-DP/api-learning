'use strict';

const wait = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const imageContainer = document.querySelector('.images');

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.addEventListener('load', function () {
      imageContainer.appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error(`عکس یافت نشد: ${url}`));
    });

    img.src = url;
    img.alt = 'Loaded image';
  });
}

// let currentImage;

// createImage('./img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('عکس ۱ لود شد');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('عکس ۲ لود شد');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     console.log('تمام عکس‌ها لود و مخفی شدند');
//     return createImage('./img/img-3.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('عکس ۳ لود شد');
//   })
//   .catch(err => {
//     console.error('خطا:', err.message);

//     imageContainer.innerHTML = `<p style="color: red;">${err.message}</p>`;
//   });
const loadNpouse = async function () {
  try {
    // loaded img 1
    let img = await createImage('./img/img-1.jpg');
    console.log('load image 1');
    await wait(2);
    img.style.display = 'none';
    // loaded img 2
    img = await createImage('./img/img-2.jpg');
    console.log('load image 2');
    await wait(2);
    img.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
};
loadNpouse();

//TODO new Part for challange ::
const loadAll = async function (imgArr) {
  try {
    const img = imgArr.map(img => createImage(img));
  } catch (error) {
    console.error(error);
  }
};
