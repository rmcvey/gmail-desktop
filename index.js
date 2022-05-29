const electron = require('electron');
const path = require('path');

const {app, BrowserWindow, ipcMain, Menu} = electron;
let win;

function handleSetBadge (_, badge) {
  app.setBadgeCount(badge);
}


app.on('ready', (_) => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
    icon: path.join(__dirname, '_icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
	});
	const template = [
		{
			label: 'Help',
			submenu: [
				{
					label: 'Quit',
					role: 'quit' // closes app when clicked
				}
			]
		},
		{
			label: 'Refresh', // Refreshes or reloads the page when clicked
			role: 'reload'
		},
		{
			label: 'ZoomIn', // zooms the page when clicked
			role: 'ZoomIn'
		}
	];
	const menu = Menu.buildFromTemplate(template); // sets the menu
	Menu.setApplicationMenu(menu);

  ipcMain.on('set-badge', handleSetBadge);

  win.webContents.on('did-finish-load', function() {
    const js = `
    function wrapperGetBadge() {
      const el = document.querySelector('[href="https://mail.google.com/mail/u/0/#inbox"]').parentElement.nextElementSibling;
      if (el) {
        const count = parseInt(el.textContent, 10);
        window.electronAPI.setBadge(count);
      }
    }

    wrapperGetBadge();
    setInterval(() => wrapperGetBadge, 15000);
`
    win.webContents.executeJavaScript(js);
  });

	win.on('swipe', (e, direction) => {
		// Navigate the window back when the user hits their mouse back button
		if (win.webContents.canGoBack() && direction === 'left') {
			win.webContents.goBack()
		} else if (win.webContents.canGoForward()) {
			win.webContents.goForward();
		}
	});

	win.loadURL('https://mail.google.com'); // loads this URL
});
