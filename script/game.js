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

let ground = document.querySelector('.ground');
let groundStyle = getComputedStyle(ground);
let groundHeight = parseInt(groundStyle.height);

let ceiling = document.querySelector('.ceiling');
let ceilingStyle = getComputedStyle(ceiling);
let ceilingHeight = parseInt(ceilingStyle.height);


const lastPoint = {x: null, y: null}


let sensitivity = 3;


field.addEventListener('mousemove', function(event) {
    // let cursorLeft = event.offsetX;
    // let cursorTop = event.offsetY;
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
    moveWalls(leftOrRight, upOrDown);
    lastPoint.x = event.clientX;
    lastPoint.y = event.clientY;
});
// cursorTop <= 500 + parseInt(fieldStyle.top) && cursorTop >= parseInt(fieldStyle.top) && cursorLeft >= parseInt(fieldStyle.left) && cursorLeft <= parseInt(fieldStyle.left) + 800

function moveWalls(leftOrRight, upOrDown) {
    if (leftOrRight == 'left' && !(parseInt(leftWallStyle.width) + sensitivity > 380)) {
            leftWallWidth += sensitivity;
            leftWall.style.width = leftWallWidth + 'px';
            rightWall.style.width = (800 - (leftWallWidth + 600)) + 'px';
            if (gunWidth !== 150) {
                gunWidth += 0.1;
                gun.style.width = gunWidth + 'px';
            }
    } else if (leftOrRight == 'right' && !(parseInt(rightWallStyle.width) + sensitivity > 380)) {
            leftWallWidth -= sensitivity;
            leftWall.style.width = leftWallWidth + 'px';
            rightWall.style.width = (800 - (leftWallWidth + 600)) + 'px';
            if (gunWidth !== 130) {
                gunWidth -= 0.1;
                gun.style.width = gunWidth + 'px';
            }
    }
    if (upOrDown == 'down' && groundHeight + sensitivity <= 225) {
        groundHeight += sensitivity;
        ceilingHeight -= sensitivity;
        ground.style.height = groundHeight + 'px';
        if (parseInt(rightWallStyle.height) <= 500) {
            rightWall.style.height = (500 - groundHeight) + 'px';
            leftWall.style.height = (500 - groundHeight) + 'px';
        }
        ceiling.style.height = (500 - (groundHeight + 380)) + 'px';

    }
    if (upOrDown == 'up' && parseInt(ceilingStyle.height) + sensitivity <= 240) {
        groundHeight -= sensitivity;
        ground.style.height = groundHeight + 'px';
        if (parseInt(rightWallStyle.height) <= 500) {
            rightWall.style.height = (500 - groundHeight) + 'px';
            leftWall.style.height = (500 - groundHeight) + 'px';
        }
        ceiling.style.height = (500 - (groundHeight + 380)) + 'px';
    }
}

