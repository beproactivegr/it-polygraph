package nmap

import "itpolygraph/sys"

type Nmap struct{}

func (n *Nmap) NmapExists() string {

	sys := &sys.Sys{}

	res := sys.ExecuteCmd("nmap", "--version")

	if res == "" {
		return "false"
	}

	return "true"
}
