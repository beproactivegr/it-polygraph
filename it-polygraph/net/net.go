package net

import (
	goip "github.com/FairyTale5571/go-ip-api"
	"net"
	"os"
)

type Net struct{}

func isPrivateIP(ip net.IP) bool {
	var privateIPBlocks []*net.IPNet
	for _, cidr := range []string{
		// don't check loopback ips
		//"127.0.0.0/8",    // IPv4 loopback
		//"::1/128",        // IPv6 loopback
		//"fe80::/10",      // IPv6 link-local
		"10.0.0.0/8",     // RFC1918
		"172.16.0.0/12",  // RFC1918
		"192.168.0.0/16", // RFC1918
	} {
		_, block, _ := net.ParseCIDR(cidr)
		privateIPBlocks = append(privateIPBlocks, block)
	}

	for _, block := range privateIPBlocks {
		if block.Contains(ip) {
			return true
		}
	}

	return false
}

func (n *Net) GetHostname() string {

	hostname, err := os.Hostname()

	if err != nil {
		return ""
	}

	return hostname
}

func (n *Net) GetLocalIPAddress() string {
	conn, err := net.Dial("udp", "8.8.8.8:80")

	if err != nil {
		return ""
	}
	defer conn.Close()

	localAddr := conn.LocalAddr().(*net.UDPAddr)
	return localAddr.IP.String()

	//addr, err := net.LookupIP("ispycode.com")
	//
	//if err != nil {
	//	return ""
	//} else {
	//	return addr[0].String()
	//}
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

	//addr, err := net.LookupIP("ispycode.com")
	//
	//if err != nil {
	//	return ""
	//} else {
	//	return addr[0].String()
	//}
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
