import './style.css';
import {ping} from "./utils/ping.js";
import {DEV_URL_SERVICE_BASE} from "./utils/constants.js";

const dropZone = document.getElementById('dropzone');
const imageInput = document.getElementById('imageInput');
const formUploadImage = document.getElementById('formUploadImage');
const loader = document.getElementById('loader');
const snackBar = document.getElementById("snackbar");
const btnSelectFile = document.getElementById('btnSelectFile');
const imgPreview = document.getElementById('imgPreview');
const result = document.getElementById('result');

const allowedExtensions = ["jpg", "jpeg", "png"];
const sizeFile = 200000;

imageInput.addEventListener('change', (event) => {
    if (!isFileAccepted(event.target.files[0])) {
        showSnackBar(`Los archivos aceptados son: ${allowedExtensions.join(', ')}`);
        imageInput.value = '';
    } else if (!isFileSize(event.target.files[0])) {
        showSnackBar(`La imagen excede el tamaño de: ${sizeFile / 1000}kb`)
        imageInput.value = '';
    }
});

formUploadImage.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (isInputFileEmpty(imageInput)) {
        showSnackBar('Seleccione una imagen para subir...');
        return;
    }

    isFileAccepted(imageInput);

    try {
        showLoader(loader);
        const result = await uploadImage(formUploadImage);
        hiddenLoader(loader);
        showSnackBar(result.message);
        imageInput.value = '';
        showResult(result.image);
        removePreviewImg();
    } catch (e) {
        hiddenLoader(loader);
        showSnackBar('Hubo un error al subir la imagen, intente nuevamente.')
    }

});

btnSelectFile.addEventListener('click', (event) => {
    event.preventDefault();
    imageInput.click();
})

dropZone.addEventListener('click', (event) => {
    imageInput.click();
});

function copyToClipBoard() {
    const copyText = document.getElementById("url");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value).then(r => console.log('Copiado!', r));

}

const showResult = (url) => {

    result.innerHTML = `
            <label for="url">Dirección de la imagen:</label>
            <div class="input-text" >    
                <input type="text" name="url" id="url" value="${url}"/>
                <button class="btn" id="btnCopyLink">Copiar</button>
            </div>
                `;

    const btnCopy = document.getElementById('btnCopyLink');
    if (btnCopy) {
        btnCopy.addEventListener('click', copyToClipBoard);
    }

}


const previewImage = () => {
    const file = imageInput.files[0];
    removePreviewImg();
    if (file) {
        const img = document.createElement('img');
        img.id = 'imgPreview';
        img.alt = 'Previsualización';
        img.src = URL.createObjectURL(file);
        imgPreview.appendChild(img);
    }
}

const removePreviewImg = () => {
    imgPreview.innerHTML = '';
}

const showSnackBar = (message = 'Test message!') => {
    snackBar.className = "show";
    snackBar.innerHTML = message
    setTimeout(function () {
        snackBar.className = snackBar.className.replace("show", "");
    }, 3000);
}

const isInputFileEmpty = (fileInput) => {
    return fileInput.files.length === 0;
}

const uploadImage = async (form) => {
    const data = new FormData(form);

    const response = await fetch(`${DEV_URL_SERVICE_BASE}/image-upload/api/upload`, {
        method: 'POST',
        body: data
    });

    const responseServer = await response.json();

    if (!response.ok) {
        throw new Error(responseServer.error);
    }

    return responseServer;
}

dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
});

dropZone.addEventListener('dragenter', (event) => {
    event.preventDefault();
    dropZone.classList.add('drop-zone-active');
})

dropZone.addEventListener('dragleave', (event) => {
    dropZone.classList.remove('drop-zone-active');
});

dropZone.addEventListener('drop', async (event) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items.length === 1) {
        [...event.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                if (!isFileAccepted(file)) {
                    showSnackBar(`Los archivos aceptados son: ${allowedExtensions.join(', ')}`);
                    imageInput.value = '';
                } else if (!isFileSize(file)) {
                    showSnackBar(`La imagen excede el tamaño de: ${sizeFile / 1000}kb`)
                    imageInput.value = '';
                } else {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    imageInput.files = dataTransfer.files;
                    console.log('Cargar el preview...')
                    previewImage();
                }
            }
        });
    } else {
        showSnackBar('Solo se permite subir una imagen a la vez.')
    }
});

const isFileSize = (file) => {
    return file.size <= sizeFile;
}

const isFileAccepted = (file) => {
    const extension = file.type.split('/').pop().toLowerCase();
    return allowedExtensions.includes(extension);
}

const showLoader = (loader) => {
    loader.style.display = 'flex';
}

const hiddenLoader = (loader) => {
    loader.style.display = 'none';
}

ping()
    .then(resolve => console.log(resolve))
    .catch(error => console.log(error));