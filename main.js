const { app, BrowserWindow, Menu } = require('electron');
const discord = require('discord-rpc');
const path = require('path');

const discordClientId = "1322661381513674802";
discord.register(discordClientId);

const rpc = new discord.Client({ transport: "ipc" });
const startTimestamp = new Date();

let pluginName;
switch (process.platform) {
    case 'win32':
        pluginName = process.arch === 'x64' ? 'flashver/pepflashplayer64.dll' : 'flashver/pepflashplayer32.dll';
        break;
    case 'linux':
        if (process.arch === 'x64') pluginName = 'flashver/libpepflashplayer.so';
        app.commandLine.appendSwitch('no-sandbox');
        break;
    case 'darwin':
        pluginName = 'flashver/PepperFlashPlayer.plugin';
        break;
}

app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));
app.commandLine.appendSwitch('ignore-certificate-errors');

app.on('ready', () => {
    const win = new BrowserWindow({
        show: false,
        icon: "resources/logo.png",
        webPreferences: {
            plugins: true,
            contextIsolation: false,
            nodeIntegration: true
        },
        title: "The Last Stand: Dead Zone Revive",
        autoHideMenuBar: true,
        darkTheme: true
    });

    const url = "http://127.0.0.1:8000";
    const userAgent = "TLSDZLauncher";

    win.loadURL(url, { userAgent });

    win.once('ready-to-show', () => {
        win.show();
    });

    win.webContents.on('did-fail-load', () => {
        const errorHTML = `
            <html>
            <body style="background-color: black; color: white; display:flex; justify-content:center; align-items:center; height:100vh; margin:0;">
                <div style="text-align:center; font-family: Arial, sans-serif;">
                    <h1>Please ensure your game server is running.</h1>
                </div>
            </body>
            </html>
        `;
        win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(errorHTML));
        win.show();
    });

    win.maximize();
    win.webContents.session.clearCache(() => {});
    initializeBrowserMenu(win);

    rpc.login({ clientId: discordClientId });
});

rpc.on('ready', () => {
    setDiscordActivity();
    setInterval(setDiscordActivity, 15000);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

function setDiscordActivity() {
    if (!rpc) return;
    rpc.setActivity({
        details: "Play TLSDZ",
        startTimestamp,
        largeImageKey: "tl-icon",
        instance: false,
        buttons: [
            {
                label: "Play now!",
                url: "https://deadzonegame.net/"
            }
        ]
    });
}

function initializeBrowserMenu(win) {
    const url = "http://127.0.0.1:8000";
    const userAgent = "TLSDZLauncher";

    const menu = Menu.buildFromTemplate([
        {
            label: "Actions",
            submenu: [
                {
                    label: "Reload Game",
                    accelerator: process.platform === "darwin" ? "Cmd+R" : "Ctrl+R",
                    click() { win.loadURL(url, { userAgent }); }
                }
            ]
        },
        {
            label: "Options",
            submenu: [
                {
                    label: "Fullscreen",
                    accelerator: "F11",
                    click() { win.fullScreen = !win.fullScreen; }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);
}