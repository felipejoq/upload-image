import {isFileAccepted, isFileSize, isInputFileEmpty} from "../utils/validators.js";
import {formUploadImage, imageInput, loader} from "../components/html.js";
import {hiddenLoader, removePreviewImg, showLoader, showSnackBar} from "../utils/helpers.js";
import {uploadImage} from "../services/upload.js";
import {previewImage, showResult} from "../utils/renderers.js";
import {allowedExtensions, sizeFile} from "../config/constants.js";

export const triggerUploadImage = async () => {
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
}

export const triggerAddFilesToUpload = (event) => {
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
                    previewImage();
                }
            }
        });
    } else {
        showSnackBar('Solo se permite subir una imagen a la vez.')
    }
}