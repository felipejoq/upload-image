import {imgPreview, snackBar} from "../components/html.js";

export const copyToClipBoard = () => {
    const copyText = document.getElementById("url");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value).then(r => null);

}

export const removePreviewImg = () => {
    imgPreview.innerHTML = '';
}

export const showSnackBar = (message = 'Test message!') => {
    snackBar.className = "show";
    snackBar.innerHTML = message
    setTimeout(function () {
        snackBar.className = snackBar.className.replace("show", "");
    }, 3000);
}

export const showLoader = (loader) => {
    loader.style.display = 'flex';
}

export const hiddenLoader = (loader) => {
    loader.style.display = 'none';
}