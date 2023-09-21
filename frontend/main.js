import './style.css';
import {ping} from "./utils/ping.js";
import {bootApp} from "./bootApp.js";

bootApp();

ping()
    .then(resolve => console.log(resolve))
    .catch(error => console.log(error));