package nmap

import (
	"itpolygraph/net"
	"itpolygraph/sys"
)

type Nmap struct{}

func (n *Nmap) NmapExists() string {

	mysys := &sys.Sys{}

	res := mysys.ExecuteCmd("nmap", "--version")

	if res == "" {
		return "false"
	}

	return "true"
}

func (n *Nmap) InstallNmap(url string) string {

	mynet := &net.Net{}
	mysys := &sys.Sys{}

	filename := mynet.DownloadFile(url)

	if filename == "" {
		return "false"
	}

	if mysys.ExecuteExternalCmdNoOutput(filename) {
		return "true"
	}

	return "false"
}
