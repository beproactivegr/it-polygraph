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

window.gethostname = function () {
    try {
        let hostnameResult = document.getElementById("hostname-result");
        GetHostname()
            .then((result) => {
                hostnameResult.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

window.getlocalIPaddress = function () {
    try {
        let ipAddrResult = document.getElementById("ipaddress-result");
        GetLocalIPAddress()
            .then((result) => {
                ipAddrResult.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

window.getpublicIPaddress = function () {
    try {
        let publicIpAddrResult = document.getElementById("publicaddress-result");
        GetInternetIPAddress()
            .then((result) => {
                publicIpAddrResult.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};