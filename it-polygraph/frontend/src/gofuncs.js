import {Exit} from "../wailsjs/go/main/App";
import {GetHostname, GetInternetIPAddress, GetLocalIPAddress} from "../wailsjs/go/net/Net";
import {NmapExists, InstallNmap} from "../wailsjs/go/nmap/Nmap";
// import $ from 'jquery';
import * as bootstrap from 'bootstrap';

// import * as jQuery from 'jquery';

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
                        installnmap('https://nmap.org/dist/nmap-7.93-setup.exe');
                    } else {
                        element.innerText = "Not Installed";
                        elementIcon.innerHTML = `<i class="fas fa-xmark"></i>`;
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
        // let element = document.getElementById(id);
        // if (element == null) {
        //     return;
        // }

        InstallNmap(url)
            .then((result) => {
                if (result === "true") {
                    document.body.innerHTML += `
<div aria-live="polite" aria-atomic="true" class="position-relative">
<div class="toast-container position-absolute top-0 end-0 p-3">
<!--                    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">-->
                      <div id="liveToast1" data-bs-delay="10000" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
<!--                          <img src="..." class="rounded me-2" alt="...">-->
                          <strong class="me-auto">Bootstrap</strong>
                          <small>11 mins ago</small>
                          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                          Hello, world! This is a toast message.1
                        </div>
                      </div>
                      <div id="liveToast2" data-bs-delay="10000" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
<!--                          <img src="..." class="rounded me-2" alt="...">-->
                          <strong class="me-auto">Bootstrap</strong>
                          <small>11 mins ago</small>
                          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                          Hello, world! This is a toast message.2
                        </div>
                      </div>
<!--                    </div>-->
</div></div>`;

                    // const toastLiveExample1 = document.getElementById('liveToast1')
                    // const toast1 = new bootstrap.Toast(toastLiveExample1)
                    // toast1.show()
                    // // toast1.show()
                    //
                    //
                    // const toastLiveExample2 = document.getElementById('liveToast2')
                    // const toast2 = new bootstrap.Toast(toastLiveExample2)
                    // toast2.show()

                } else {
                    document.body.innerHTML += `
<!-- <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">&ndash;&gt;-->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="toast1" class="toast" data-bs-delay="10000" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
<!--        <img src="..." class="rounded me-2" alt="...">-->
        <strong class="me-auto">Bootstrap</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        See? Just like this.
      </div>
    </div>

    <div id="toast2" class="toast" data-bs-delay="10000" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
<!--        <img src="..." class="rounded me-2" alt="...">-->
        <strong class="me-auto">Bootstrap</strong>
        <small class="text-muted">2 seconds ago</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Heads up, toasts will stack automatically
      </div>
    </div>
</div>`;


                    const toastLiveExample1 = document.getElementById('toast1')
                    const toast1 = new bootstrap.Toast(toastLiveExample1)
                    toast1.show()

                    //
                    //
                    const toastLiveExample2 = document.getElementById('toast2')
                    const toast2 = new bootstrap.Toast(toastLiveExample2)
                    toast2.show()
                }
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};