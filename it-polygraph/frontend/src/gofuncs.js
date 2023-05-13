import {Exit} from "../wailsjs/go/main/App";
import {GetHostname, GetInternetIPAddress, GetLocalIPAddress} from "../wailsjs/go/net/Net";
import {NmapExists, InstallNmap} from "../wailsjs/go/nmap/Nmap";
// import $ from 'jquery';

import {
    CreateErrorToast,
    CreateInfoToast,
    CreateRandomIDToast,
    CreateToast,
    CreateWarnToast,
    ShowToast
} from "./ui-components";

// import * as jQuery from 'jquery';

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

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
                        CreateInfoToast('Download NMAP',
                            'The nmap is not installed and it will be downloaded in the background!');
                        installnmap('https://nmap.org/dist/nmap-7.93-setup.exe');
                    } else {
                        element.innerText = "Not Installed";
                        elementIcon.innerHTML = `<i class="fas fa-xmark"></i>`;
                        CreateInfoToast('Download NMAP',
                            'The nmap is not installed and it will be downloaded in the background!');
                        installnmap('https://nmap.org/dist/nmap-7.93-setup.exe');
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

window.installnmap = function (url) {
    try {

        InstallNmap(url)
            .then(async (result) => {
                if (result === "true") {
                    CreateInfoToast('NMAP Installation', 'The nmap has been successfully installed!');
                } else {
                    CreateErrorToast('NMAP Installation', 'An error occurred during nmap installation!');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};