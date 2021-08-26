const canvasContainer = document.querySelector('.canvas-container')
const startContainer = document.querySelector('.start-container')


window.onload = () => {
    console.log(document.querySelector("#btn-start"))
    document.querySelector('#btn-start').onclick = () => {
        setStart()
        setCanvas()
        Game.init()
    }
}

function setStart() {
    startContainer.classList.toggle('invisible')
    // startContainer.classList.toggle('invisible')
}
function setCanvas() {
    canvasContainer.classList.toggle('canvas-container')
    // canvasContainer.classList.toggle('invisible')

}
