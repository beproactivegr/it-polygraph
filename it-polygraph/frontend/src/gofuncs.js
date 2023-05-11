import {Exit} from "../wailsjs/go/main/App";
import {GetHostname, GetInternetIPAddress, GetLocalIPAddress} from "../wailsjs/go/net/Net";
import {NmapExists} from "../wailsjs/go/nmap/Nmap";

export function SetupGoFunctions() {
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

    window.nmapinstalled = function (id, iconId) {
        try {
            let element = document.getElementById(id);
            if (element == null) {
                return;
            }

            let elementIcon = document.getElementById(iconId);
            if (elementIcon == null) {
                return;
            }

            NmapExists()
                .then((result) => {
                    if (result === "true") {
                        element.innerText = "Installed";
                        elementIcon.innerHTML = `<i class="fas fa-check"></i>`;
                    } else {
                        element.innerText = "Not Installed";
                        elementIcon.innerHTML = `<i class="fas fa-xmark"></i>`;
                    }

                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err);
        }
    };
}