package sys

import (
	"os"
	"os/exec"
	"time"
)

type Sys struct {
}

func (s *Sys) ExecuteCmd(cmd string, arg ...string) string {
	var err error
	var out []byte

	if cmd == "" {
		return ""
	}

	out, err = exec.Command(cmd, arg...).Output()

	if err != nil {
		switch /*e :=*/ err.(type) {
		case *exec.Error:
			return ""
		case *exec.ExitError:
			return ""
		default:
			return ""
		}
	}

	return string(out)
}

func (s *Sys) ExecuteExternalCmdNoOutput(cmd string) bool {
	var command *exec.Cmd

	if cmd == "" {
		return false
	}

	command = exec.Command("cmd.exe", "/C", cmd)

	if err := command.Run(); err != nil {
		return false
	}

	return true
}

func (s *Sys) Restart() {

	exePath, err := os.Executable()
	if err != nil {
		return
	}

	cmd := exec.Command(exePath, os.Args[1:]...)

	err = cmd.Start()

	if err != nil {
		return
	}

	time.Sleep(1 * time.Second)

	os.Exit(0)
}
