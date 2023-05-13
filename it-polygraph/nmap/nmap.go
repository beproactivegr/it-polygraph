package nmap

import (
	"errors"
	"itpolygraph/net"
	"itpolygraph/sys"
	"os"
	"sync"
)

type Nmap struct {
	NmapFilename string
	download     sync.Mutex
	install      sync.Mutex
}

func (n *Nmap) NmapExists() string {

	mysys := &sys.Sys{}

	res := mysys.ExecuteCmd("nmap", "--version")

	if res == "" {
		return "false"
	}

	return "true"
}

func (n *Nmap) DownloadNmap(url string) string {

	n.download.Lock()
	defer n.download.Unlock()

	mynet := &net.Net{}

	n.NmapFilename = mynet.DownloadFile(url)

	if n.NmapFilename == "" {
		return "false"
	}

	return "true"
}

func (n *Nmap) InstallNmap() string {

	n.install.Lock()
	defer n.install.Unlock()

	mysys := &sys.Sys{}

	if _, err := os.Stat(n.NmapFilename); errors.Is(err, os.ErrNotExist) {
		return "false"
	}

	if !mysys.ExecuteExternalCmdNoOutput(n.NmapFilename) {
		return "false"
	}

	return "true"
}
