package sys

import (
	"os/exec"
)

type Sys struct {
}

func (s *Sys) ExecuteCmd(cmd string, arg ...string) string {
	var err error
	var out []byte

	out, err = exec.Command(cmd, arg...).Output()

	if err != nil {
		switch /*e :=*/ err.(type) {
		case *exec.Error:
			//fmt.Println("failed executing:", err)
			return ""
		case *exec.ExitError:
			//fmt.Println("command exit rc =", e.ExitCode())
			return ""
		default:
			return ""
		}
	}

	return string(out)
}

func (s *Sys) ExecuteExternalCmdNoOutput(cmd string) bool {
	var command *exec.Cmd

	command = exec.Command("cmd.exe", "/C", cmd)

	if err := command.Run(); err != nil {
		return false
	}

	return true
}
