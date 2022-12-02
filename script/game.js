let field = document.querySelector('.field');
let fieldStyle = getComputedStyle(field);

let cursor = document.querySelector('.cursor');

let gun = document.querySelector('.gun');
let gunStyle = getComputedStyle(gun);
let gunWidth = parseInt(gunStyle.width);


let leftWall = document.querySelector('.left-wall');
let leftWallStyle = getComputedStyle(leftWall);
let leftWallWidth =  parseInt(leftWallStyle.width);



let rightWall = document.querySelector('.right-wall');
let rightWallStyle = getComputedStyle(rightWall);
let rightWallWidth =  parseInt(rightWallStyle.width);

const lastPoint = {x: null, y: null}

let sensitivity = 2;

let leftStop = 0;
let rightStop = 0;


window.addEventListener('mousemove', function(event) {
    let cursorLeft = event.offsetX;
    let cursorTop = event.offsetY;
    const leftOrRight = (
        event.clientX > lastPoint.x ? 'right'
        : event.clientX < lastPoint.x ? 'left'
        : 'none'
     );
    const upOrDown = (
        event.clientY > lastPoint.y ? 'down'
        : event.clientY < lastPoint.y ? 'up'
        : 'none'
    );
    if (cursorTop <= 500 + parseInt(fieldStyle.top) && cursorTop >= parseInt(fieldStyle.top) && cursorLeft >= parseInt(fieldStyle.left) && cursorLeft <= parseInt(fieldStyle.left) + 800) {
        moveWalls(leftOrRight, upOrDown);
    }
    lastPoint.x = event.clientX;
});


function moveWalls(leftOrRight, upOrDown) {
    if (leftOrRight == 'left') {
        if (parseInt(leftWallStyle.width) !== 380) {
            leftWallWidth += sensitivity;
            leftWall.style.width = leftWallWidth + 'px';
            rightWall.style.width = (800 - (leftWallWidth + 600)) + 'px';
            if (gunWidth !== 150) {
                gunWidth += 0.1;
                gun.style.width = gunWidth + 'px';
            }
        }
    } else if (leftOrRight == 'right') {
        if (parseInt(rightWallStyle.width) !== 380) {
            leftWallWidth -= sensitivity;
            leftWall.style.width = leftWallWidth + 'px';
            rightWall.style.width = (800 - (leftWallWidth + 600)) + 'px';
            if (gunWidth !== 130) {
                gunWidth -= 0.1;
                gun.style.width = gunWidth + 'px';
            }
        }
    }
    if (upOrDown == 'up') {

    }
}

