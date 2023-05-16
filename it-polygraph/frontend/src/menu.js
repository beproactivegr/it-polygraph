import $ from "jquery";
// import * as jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;
// import 'jquery-ui-dist';
// window.$ = window.jQuery = $;
// import 'jquery-ui/ui/widgets/tooltip.js';
// import jQuery from 'jquery';
// window.jQuery = jQuery;
// await import("jquery-ui-dist/jquery-ui");

function loadDashboard() {

    document.querySelector('#topmenucontainer').innerHTML = ``;
    document.querySelector('#main-body').innerHTML = `
    <div class="container">
        <div class="row">
            <div class="col-4 title">
                <h3>System Information</h3>
            </div>
        </div>
        <div class="row dashboard-main">
            <div class="col-12">
                <div class="row">
                    <div class="col-6 border border-dark infobox">
                        <div class="row">
                            <div class="col-5">
                              <b>Computer Hostname</b>&nbsp;
                              <i class="fa-regular fa-circle-question mytooltip" data-toggle="tooltip" data-placement="right" title="The name of your computer."></i><br>
                              <i class="fas fa-computer"></i><span class="data-result" id="hostname-result"></span>
                            </div>
                            <div class="col-5">

                            </div>
                            <div class="col-2">
                              <i class="fas fa-check"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 border border-dark infobox">
                        <div class="row">
                            <div class="col-5">
                              <b>Local IP Address</b>&nbsp
                              <i class="fa-regular fa-circle-question mytooltip" data-toggle="tooltip" data-html="true" data-placement="right" title="A Local IP address is the unique identifier that is assigned to &#013;your device within your local network. It is not visible to the outer world, &#013;but it is required in order to use the network."></i><br>
                              <i class="fas fa-network-wired"></i><span class="data-result" id="ipaddress-result"></span>
                            </div>
                            <div class="col-5">

                            </div>
                            <div class="col-2">
                              <i class="fas fa-check"></i>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-6 border border-dark infobox">
                        <div class="row">
                            <div class="col-5">
                              <b>Internet IP Address</b>&nbsp
                              <i class="fa-regular fa-circle-question mytooltip" data-toggle="tooltip" data-html="true" data-placement="right" title="An Internet (IP) address is a unique numerical identifier for &#013;every device or network that connects to the internet."></i><br>
                              <i class="fas fa-globe"></i><span class="data-result" id="publicaddress-result"></span>
                            </div>
                            <div class="col-5">

                            </div>
                            <div class="col-2">
                              <i class="fas fa-check"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 border border-dark infobox">
                        <div class="row">
                            <div class="col-8">
                              <b>NMAP Status</b>&nbsp
                              <i class="fa-regular fa-circle-question mytooltip" data-toggle="tooltip" data-html="true" data-placement="right" title="Nmap ('Network Mapper') is a free and open source utility for network discovery and security auditing. &#013;Many systems and network administrators also find it useful for tasks such as network inventory, &#013;managing service upgrade schedules, and monitoring host or service uptime."></i><br>
                              <i class="fas fa-cube"></i>
                                <span class="data-result" id="nmap-result"></span>
<!--                                <span id="nmap-download-result"></span>-->
                            </div>
                            <div class="col-2">

                            </div>
                            <div class="col-2">
                              <span id="nmap-result-icon"></span>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-6 border border-dark infobox">
                        <div class="col-8">
                              <b>User Account Type</b>&nbsp
                              <i class="fa-regular fa-circle-question mytooltip" data-toggle="tooltip" data-html="true" data-placement="right" title="The user account type controls what tasks you can perform on your computer, in some cases you may need &#013;administrative rights to perform some tasks."></i><br>
                              <i class="fas fa-user"></i>
                                <span class="data-result" id="acc-type-result"></span>
                            </div>
                            <div class="col-2">

                            </div>
                            <div class="col-2">
                              <span id="acc-type-result-icon"></span>
                            </div>
                    </div>
                    <div class="col-6 border border-dark infobox">

                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    nmapinstalled("nmap-result", "nmap-result-icon");
    gethostname("hostname-result");
    getlocalIPaddress("ipaddress-result");
    getpublicIPaddress("publicaddress-result");
}

export function OnLoad() {
    $(document).ready(function () {

        loadDashboard();

        $('.dashboard-nav .dashboard-nav-list a').on('click', function () {
            $('.dashboard-nav .dashboard-nav-list').find('a.active').removeClass('active');
            $(this).addClass('active');
        });

        $('#dashboard').on('click', function () {
            loadDashboard();
        });

        $('#net-scan').on('click', function () {

            document.querySelector('#topmenucontainer').innerHTML = `
              <div class="result"><i class="fas fa-computer"></i><span class="data-result" id="hostname-result"></span></div>
              <div class="result"><i class="fas fa-network-wired"></i><span class="data-result" id="ipaddress-result"></span></div>
              <div class="result"><i class="fas fa-globe"></i><span class="data-result" id="publicaddress-result"></span></div>`;

            document.querySelector('#main-body').innerHTML = ``;

            gethostname("hostname-result");
            getlocalIPaddress("ipaddress-result");
            getpublicIPaddress("publicaddress-result");
        });
    });
}
