import {imageInput, imgPreview, result} from "../components/html.js";
import {copyToClipBoard, removePreviewImg} from "./helpers.js";

export const showResult = (url) => {
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


export const previewImage = () => {
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