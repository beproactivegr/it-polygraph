import {Exit} from "../wailsjs/go/main/App";
import {GetHostname, GetInternetIPAddress, GetLocalIPAddress} from "../wailsjs/go/net/Net";
import {NmapExists, InstallNmap, DownloadNmap} from "../wailsjs/go/nmap/Nmap";
// import $ from 'jquery';

import {
    CreateErrorToast,
    CreateInfoToast,
} from "./ui-components";
import {Restart} from "../wailsjs/go/sys/Sys";

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
                        element.innerHTML = 'Installed';
                        elementIcon.innerHTML = `<i class="fas fa-check"></i>`;
                    } else {
                        element.innerHTML = `Not Installed&nbsp;&nbsp;
                        <button id="nmapbtn" onclick="downloadOrInstallNmap();" class=\"btn btn-primary\">Download</button>
                        &nbsp;&nbsp;<i id="loader" class="fas fa-spinner fa-spin" hidden></i>
                        `;
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

window.downloadOrInstallNmap = function () {

    const nmapbtn = document.getElementById('nmapbtn');
    if (nmapbtn == null) {
        return;
    }

    if (nmapbtn.innerText === "Download") {
        downloadnmap('https://nmap.org/dist/nmap-7.93-setup.exe');
    } else if (nmapbtn.innerText === "Install") {
        installnmap();
    } else if (nmapbtn.innerText === "Restart") {
        restart();
    }
}

window.downloadnmap = function (url) {
    try {

        const nmapbtn = document.getElementById('nmapbtn');
        if (nmapbtn == null) {
            return;
        }
        nmapbtn.disabled = true;
        nmapbtn.innerText = "Downloading";

        const loader = document.getElementById('loader');
        if (loader == null) {
            return;
        }

        loader.hidden = false;

        DownloadNmap(url)
            .then(async (result) => {
                if (result === "true") {
                    CreateInfoToast('Download NMAP', 'NMAP setup download has successfully completed!');
                    nmapbtn.disabled = false;
                    nmapbtn.innerText = "Install";
                    loader.hidden = true;
                } else {
                    CreateErrorToast('Download NMAP', 'An error occurred during NMAP setup downloading!');
                    nmapbtn.disabled = false;
                    nmapbtn.innerText = "Download";
                    loader.hidden = true;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

window.installnmap = function () {
    try {

        const nmapbtn = document.getElementById('nmapbtn');
        if (nmapbtn == null) {
            return;
        }
        nmapbtn.disabled = true;
        nmapbtn.innerText = "Installing";

        const loader = document.getElementById('loader');
        if (loader == null) {
            return;
        }

        loader.hidden = false;

        InstallNmap()
            .then(async (result) => {
                if (result === "true") {
                    CreateInfoToast('NMAP Installation', 'NMAP installation has successfully completed! Please restart the application.');
                    nmapbtn.disabled = false;
                    nmapbtn.innerText = "Restart";
                    loader.hidden = true;
                } else {
                    CreateErrorToast('NMAP Installation', 'An error occurred during NMAP installation!');
                    nmapbtn.disabled = false;
                    nmapbtn.innerText = "Install";
                    loader.hidden = true;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

window.restart = function (url) {
    try {

        const nmapbtn = document.getElementById('nmapbtn');
        if (nmapbtn == null) {
            return;
        }
        nmapbtn.innerText = "Restarting";

        Restart()
            .then(async (result) => {
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};