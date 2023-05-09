package main

import (
	"embed"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options/windows"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:             "IT Polygraph",
		Width:             1280,
		Height:            720,
		MinWidth:          1280,
		MinHeight:         720,
		MaxWidth:          1280,
		MaxHeight:         720,
		DisableResize:     false,
		Fullscreen:        false,
		WindowStartState:  options.Normal,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		AlwaysOnTop:       false,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour:   &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		LogLevel:           logger.DEBUG,
		LogLevelProduction: logger.ERROR,
		OnStartup:          app.startup,
		OnDomReady:         app.domReady,
		OnShutdown:         app.shutdown,
		Bind: []interface{}{
			app,
		},

		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			//DisableWindowIcon:    false,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
