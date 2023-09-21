import {allowedExtensions, sizeFile} from "../config/constants.js";
import {showSnackBar} from "./helpers.js";
import {imageInput} from "../components/html.js";

export const triggerValidationsInputFile = () => {
    if (!isFileAccepted(event.target.files[0])) {
        showSnackBar(`Los archivos aceptados son: ${allowedExtensions.join(', ')}`);
        imageInput.value = '';
    } else if (!isFileSize(event.target.files[0])) {
        showSnackBar(`La imagen excede el tamaño de: ${sizeFile / 1000}kb`)
        imageInput.value = '';
    }
}

export const isFileSize = (file) => {
    return file.size <= sizeFile;
}

export const isFileAccepted = (file) => {
    const extension = file.type.split('/').pop().toLowerCase();
    return allowedExtensions.includes(extension);
}

export const isInputFileEmpty = (fileInput) => {
    return fileInput.files.length === 0;
}