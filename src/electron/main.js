const {app, BrowserWindow}=require('electron') //引入electron
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// 指定 flash 路径，假定它与 main.js 放在同一目录中。
let pluginName
switch (process.platform) {
    case 'win32':
        pluginName = '/../../dist/static/flash/pepflashplayer_64.dll'
        break
    case 'win64':
        pluginName = '/../../dist/static/flash/pepflashplayer_64.dll'
        break
    case 'darwin':
        pluginName = '/Users/user/Library/Application Support/Google/Chrome/PepperFlash/32.0.0.433/PepperFlashPlayer.plugin'
        break
    default: {
        pluginName = '/Users/user/Library/Application Support/Google/Chrome/PepperFlash/32.0.0.433/PepperFlashPlayer.plugin'
        break
    }
}
// app.commandLine.appendSwitch('ppapi-flash-path', pluginName)
console.log("file:/"+pluginName);     //file://Users/user/Library/Application Support/Google/Chrome/PepperFlash/32.0.0.433/PepperFlashPlayer.plugin

console.log( path.join(  __dirname, pluginName));
console.log(app.getPath('pepperFlashSystemPlugin'));


// let plugins = `file://${__dirname}/../../dist/static/flash/pepflashplayer_64.dll`;
// app.commandLine.appendSwitch('ppapi-flash-path',plugins);
// app.commandLine.appendSwitch('ppapi-flash-version',`32.0.0.255`);

let win;
let windowConfig = {
    width:990,
    height:620,
    webPreferences: {
        plugins:true,//添加插件
        webSecurity: false,
        enableLargerThanScreen:false,
    }

};//窗口配置程序运行窗口的大小
function createWindow(){
    win = new BrowserWindow(windowConfig);//创建一个窗口
    win.loadURL(`file://${__dirname}/../../dlist/index.html`);//在窗口内要展示的内容index.html 就是打包生成的index.html
    // win.webContents.openDevTools();  //开启调试工具
    win.on('close',() => {
        //回收BrowserWindow对象
        win = null;
    });
    win.on('resize',() => {
        win.reload();
    })
}
app.on('ready',createWindow);
app.on('window-all-closed',() => {
    app.quit();
});
app.on('activate',() => {
    if(win == null){
        createWindow();
    }
});

