const canvasContainer = document.querySelector('.start-container')


window.onload = () => {
    document.getElementById('btn-start').onclick = () => {
        Game.init()
        setStart()
    }
}

function setStart() {
    canvasContainer.classList.toggle('invisible')
}
function setCanvas() {

}
