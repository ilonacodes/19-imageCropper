var preview = document.querySelector('img');
var canvas = document.querySelector('canvas');

var previewImage = function () {
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
    }
};

var startX, startY;
var endX, endY;

preview.addEventListener('mousedown', function (e) {
    startX = e.clientX - preview.getBoundingClientRect().left;
    startY = e.clientY - preview.getBoundingClientRect().top;
    e.preventDefault();
    return false;
});

preview.addEventListener('mousedown', function (e) {
    startX = e.clientX - preview.getBoundingClientRect().left;
    startY = e.clientY - preview.getBoundingClientRect().top;
    e.preventDefault();
    return false;
});

preview.addEventListener('mouseup', function (e) {
    endX = e.clientX - preview.getBoundingClientRect().left;
    endY = e.clientY - preview.getBoundingClientRect().top;

    if (endX < startX) {
        var t = startX;
        startX = endX;
        endX = t;
    }

    if (endY < startY) {
        var n = startY;
        startY = endY;
        endY = n;
    }

    var context = canvas.getContext('2d');
    var cropWidth = endX - startX;
    var cropHeight = endY - startY;
    canvas.width = canvas.width;
    var realWidth = preview.naturalWidth;
    var realHeight = preview.naturalHeight;


    var realX = startX * realWidth / preview.width;
    var realY = startY * realHeight / preview.height;

    var realCropWidth = cropWidth * realWidth / preview.width;
    var realCropHeight = cropHeight * realHeight / preview.height;

    context.drawImage(preview,
        realX, realY,
        realCropWidth, realCropHeight,
        0, 0,
        cropWidth, cropHeight);

    document.querySelector('a')
        .setAttribute('href', canvas.toDataURL());

    e.preventDefault();
    return false;
});
