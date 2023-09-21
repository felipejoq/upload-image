import {btnSelectFile, dropZone, formUploadImage, imageInput} from "./components/html.js";
import {triggerValidationsInputFile} from "./utils/validators.js";
import {triggerAddFilesToUpload, triggerUploadImage} from "./controllers/upload.js";

export const bootApp = () => {
    imageInput.addEventListener('change', (event) => {
        triggerValidationsInputFile()
    });

    formUploadImage.addEventListener('submit', async (event) => {
        event.preventDefault();
        await triggerUploadImage()
    });

    btnSelectFile.addEventListener('click', (event) => {
        event.preventDefault();
        imageInput.click();
    });

    dropZone.addEventListener('click', (event) => {
        imageInput.click();
    });

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
        triggerAddFilesToUpload(event)
    });
}