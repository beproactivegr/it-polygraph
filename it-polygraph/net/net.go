package net

import (
	"fmt"
	goip "github.com/FairyTale5571/go-ip-api"
	"io"
	"net"
	"net/http"
	"net/mail"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
)

type Net struct {
}

func (n *Net) DownloadFile(fileUrl string) string {

	var wg sync.WaitGroup
	var fileName string

	if fileUrl == "" {
		return ""
	}

	wg.Add(1)

	go func(fileUrl string) {
		defer wg.Done()

		var err error
		var furl *url.URL
		var file *os.File
		var resp *http.Response

		furl, err = url.Parse(fileUrl)
		if err != nil {
			return
		}

		path := furl.Path
		segments := strings.Split(path, "/")
		fileName = segments[len(segments)-1]

		fileName = filepath.Join(os.TempDir(), fileName)

		file, err = os.Create(fileName)

		if err != nil {
			return
		}

		defer file.Close()

		client := http.Client{
			CheckRedirect: func(r *http.Request, via []*http.Request) error {
				r.URL.Opaque = r.URL.Path
				return nil
			},
		}

		resp, err = client.Get(fileUrl)

		if err != nil {
			return
		}

		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			return
		}

		_, err = io.Copy(file, resp.Body)

		if err != nil {
			return
		}

	}(fileUrl)

	wg.Wait()

	return fileName
}

func (n *Net) OpenEmail(email string) bool {
	var command *exec.Cmd
	var err error

	if email == "" {
		return false
	}

	_, err = mail.ParseAddress(email)

	if err != nil {
		return false
	}

	emailLink := fmt.Sprintf("mailto:%s", email)
	command = exec.Command("cmd.exe", "/C", "start", emailLink)

	if err := command.Start(); err != nil {
		return false
	}

	return true
}

func (n *Net) OpenURL(url2open string) bool {
	var command *exec.Cmd
	var err error

	if url2open == "" {
		return false
	}

	_, err = url.Parse(url2open)
	if err != nil {
		return false
	}

	command = exec.Command("cmd.exe", "/C", "start", url2open)

	if err := command.Start(); err != nil {
		return false
	}

	return true
}

//func isPrivateIP(ip net.IP) bool {
//	var privateIPBlocks []*net.IPNet
//	for _, cidr := range []string{
//		// don't check loopback ips
//		//"127.0.0.0/8",    // IPv4 loopback
//		//"::1/128",        // IPv6 loopback
//		//"fe80::/10",      // IPv6 link-local
//		"10.0.0.0/8",     // RFC1918
//		"172.16.0.0/12",  // RFC1918
//		"192.168.0.0/16", // RFC1918
//	} {
//		_, block, _ := net.ParseCIDR(cidr)
//		privateIPBlocks = append(privateIPBlocks, block)
//	}
//
//	for _, block := range privateIPBlocks {
//		if block.Contains(ip) {
//			return true
//		}
//	}
//
//	return false
//}

func (n *Net) GetHostname() string {

	hostname, err := os.Hostname()

	if err != nil {
		return ""
	}

	return hostname
}

func (n *Net) GetLocalIPAddress() string {

	conn, err := net.Dial("udp", "8.8.8.8:80")
	defer conn.Close()

	if err != nil {
		return ""
	}

	localAddr := conn.LocalAddr().(*net.UDPAddr)

	return localAddr.IP.String()
}

func (n *Net) GetInternetIPAddress() string {
	var err error
	var result *goip.Location

	client := goip.NewClient()
	result, err = client.GetLocation()

	if err != nil {
		return ""
	}

	return result.Query
}

//func (n *Net) GetLocalIPAddress() string {
//
//	var err error
//	var ifaces []net.Interface
//	ifaces, err = net.Interfaces()
//
//	if err != nil {
//		return ""
//	}
//
//	for _, i := range ifaces {
//
//		var addrs []net.Addr
//		addrs, err = i.Addrs()
//
//		if err != nil {
//			return ""
//		}
//
//		for _, addr := range addrs {
//			var ipAddr net.IP
//			if ip, ok := addr.(*net.IPNet); ok && !ip.IP.IsLoopback() {
//				if ip.IP.To4() != nil {
//					ipAddr = ip.IP
//					if isPrivateIP(ipAddr) {
//						return ip.IP.String()
//					}
//				}
//			}
//		}
//	}
//	return ""
//}
