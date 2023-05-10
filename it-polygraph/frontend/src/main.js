import './style.css';
import './app.css';

// import $ from 'jquery';
import {Exit} from '../wailsjs/go/main/App';
import {GetHostname, GetInternetIPAddress, GetLocalIPAddress} from "../wailsjs/go/net/Net";
// import * as bootstrap from 'bootstrap'

// let topMenu = document.getElementById("top-menu");
// nameElement.focus();

window.exit = function () {
    try {
        Exit()
            .then((result) => {
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

window.gethostname = function (id) {
    try {
        let element = document.getElementById(id);//"hostname-result"
        if (element == null) {
            return;
        }

        GetHostname()
            .then((result) => {
                element.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

window.getlocalIPaddress = function (id) {
    try {
        let element = document.getElementById(id);
        if (element == null) {
            return;
        }

        GetLocalIPAddress()
            .then((result) => {
                element.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

window.getpublicIPaddress = function (id) {
    try {
        let element = document.getElementById(id);
        if (element == null) {
            return;
        }

        GetInternetIPAddress()
            .then((result) => {
                element.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};