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

let bullet = document.querySelector('.bullet');
let bulletStyle = getComputedStyle(bullet);

let object = document.querySelector('.object');
let objectStyle = getComputedStyle(object);
let objectTop = parseInt(objectStyle.top);
let objectLeft = parseInt(objectStyle.left);


const lastPoint = {x: null, y: null}


let sensitivity = 3;

function gameLoop() {
    return mouseMove();
}

function objectKill() {
    field.addEventListener('click', ()=>{
        bullet.classList.add('shot');
        if (parseInt(bulletStyle.top) == 255 && parseInt(bulletStyle.left) == 398) {
            if (parseInt(bulletStyle.top) >= objectTop && parseInt(bulletStyle.top) <= objectTop + parseInt(objectStyle.height)) {
                if (parseInt(bulletStyle.left) >= objectLeft && parseInt(bulletStyle.left) <= objectLeft + parseInt(objectStyle.width)) {
                    object.style.backgroundColor = 'red';
                    objectLeft = getRandomInt(parseInt(leftWallStyle.left) + parseInt(leftWallStyle.width) + 30, parseInt(rightWallStyle.left) - 30);
                    objectTop = getRandomInt(parseInt(ceilingStyle.height) + 30, parseInt(groundStyle.top) - 30);
                    setTimeout(()=>{
                        object.style.backgroundColor = 'white';
                    }, 100);
                    setTimeout(()=>{
                        object.style.top = objectTop + 'px';
                        object.style.left = objectLeft + 'px';
                    },100);
                }
            }
        }
        setTimeout(()=>{
            bullet.classList.remove('shot');
        }, 200);
    });
}

function mouseMove() {
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
        objectKill();
        lastPoint.x = event.clientX;
        lastPoint.y = event.clientY;
    });
}
// cursorTop <= 500 + parseInt(fieldStyle.top) && cursorTop >= parseInt(fieldStyle.top) && cursorLeft >= parseInt(fieldStyle.left) && cursorLeft <= parseInt(fieldStyle.left) + 800

function moveWalls(leftOrRight, upOrDown) {
    moveLeftRight(leftOrRight);
    moveUpDown(upOrDown);
    if (objectLeft > 800 || objectLeft < -parseInt(objectStyle.width) || objectTop > 500 || objectTop < -parseInt(objectStyle.width)) {
        object.style.opacity = 0;
    } else {
        object.style.opacity = 1;
    }
}

function moveLeftRight(leftOrRight) {
    if (leftOrRight == 'left' && !(parseInt(leftWallStyle.width) + sensitivity > 380)) {
        leftWallWidth += sensitivity;
        leftWall.style.width = leftWallWidth + 'px';
        rightWall.style.width = (800 - (leftWallWidth + 600)) + 'px';
        if (gunWidth !== 150) {
            gunWidth += 0.1;
            gun.style.width = gunWidth + 'px';
        }
        objectLeft += sensitivity;
        object.style.left = objectLeft + 'px';
    } else if (leftOrRight == 'right' && !(parseInt(rightWallStyle.width) + sensitivity > 380)) {
        leftWallWidth -= sensitivity;
        leftWall.style.width = leftWallWidth + 'px';
        rightWall.style.width = (800 - (leftWallWidth + 600)) + 'px';
        if (gunWidth !== 130) {
            gunWidth -= 0.1;
            gun.style.width = gunWidth + 'px';
        }
        objectLeft -= sensitivity;
        object.style.left = objectLeft + 'px';
    }
}

function moveUpDown(upOrDown) {
    if (upOrDown == 'down' && groundHeight + sensitivity <= 225) {
        groundHeight += sensitivity;
        ceilingHeight -= sensitivity;
        ground.style.height = groundHeight + 'px';
        if (parseInt(rightWallStyle.height) <= 500) {
            rightWall.style.height = (500 - groundHeight) + 'px';
            leftWall.style.height = (500 - groundHeight) + 'px';
        }
        ceiling.style.height = (500 - (groundHeight + 380)) + 'px';
            objectTop -= sensitivity;
            object.style.top = objectTop + 'px';
    } else if (upOrDown == 'up' && parseInt(ceilingStyle.height) + sensitivity <= 240) {
        groundHeight -= sensitivity;
        ground.style.height = groundHeight + 'px';
        if (parseInt(rightWallStyle.height) <= 500) {
            rightWall.style.height = (500 - groundHeight) + 'px';
            leftWall.style.height = (500 - groundHeight) + 'px';
        }
        ceiling.style.height = (500 - (groundHeight + 380)) + 'px';
        objectTop += sensitivity;
        object.style.top = objectTop + 'px';
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

setInterval(gameLoop(),1000/100);