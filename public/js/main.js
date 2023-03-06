async function closeApp(){
    await Neutralino.app.exit()
    console.log('Close App')
}

function minimizeApp(){
    console.log('Minimize App')
}

function maximizeApp(){
    console.log('Maximize App')
}
window.NL_PORT = 1000
window.NL_ARGS = ['--neu-dev-auto-reload']
Neutralino.init()
console.log('main.js running')