/*
 * Drawing Game JS
 * Landon Dorrier, 2022
 */


/* 
 * Canvases
 */ 

const canvases = document.querySelectorAll('canvas');
const ctx = [];
let i = 0;
canvases.forEach(canvas => {
    ctx[i] = canvas.getContext('2d');
    ctx[i].strokeStyle = 'teal';
    ctx[i].lineJoin = 'round';
    ctx[i].lineCap = 'round';
    ctx[i].lineWidth = 12;
    i++;
});


// Drawing Variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let drawX = 0;
let drawY = 0;

let hexArray = [];
let selectedHex = '';
let defaultHex = '';
let hex = '';
let hue = 0;


// Canvas Controls
const colorBtn = document.querySelectorAll('.colors button');
function selectColor() {
    selectedHex = this.dataset.hex; 
    this.classList.add('animate__bounce');
    setTimeout(() => {this.classList.remove('animate__bounce')}, 300);
}
colorBtn.forEach(btn => btn.addEventListener('click', selectColor));

const clearBtn = document.querySelectorAll('.btn-clear');
function clearCanvas() {
    let i = this.dataset.index - 1;
    ctx[i].clearRect(0, 0, 600, 400);
    this.classList.add('animate__headshake');
    setTimeout(() => {this.classList.remove('animate__headshake')}, 800);
}
clearBtn.forEach(btn => btn.addEventListener('click', clearCanvas));

// Draw
function draw(e) {
    if (!isDrawing) return;

    let i = this.dataset.index - 1;

    if (e.target == ctx[i].canvas) {
        e.preventDefault();
    }

    switch (i) {
        case 0: // Ivy Group new
            hexArray = ['#034638'];
            break;
        case 1: // Ivy Group old
            hexArray = ['#1A8C7E'];
            break;
        case 2: // Virginia Flavor
            hexArray = ['#DF2E1E', '#00752F', '#B4CE23', '#F7A60E', '#FAD107'];
            break;
        case 3: // Carter Mountain
            hexArray = ['#006B35', '#78BE20'];
            break;
        case 4: // Clore Furniture
            hexArray = ['#004E38', '#FCF6CC'];
            break;
        // 90s CATEGORY
        case 5: // Nickelodeon
            hexArray = ['#FF7E00', '#ffffff'];
            break;
        case 6: // All That
            hexArray = ['#000000', '#F6D20A', '#E92926'];
            break;
        case 7: // Blockbuster
            hexArray = ['#353C94', '#D9CE50'];
            break;
        case 8: // MTV
            hexArray = ['#FBAF14', '#BE1A20', '#018BD4'];
            break;
        case 9: // Disney Channel
            hexArray = ['#2B8FD5'];
            break;
        default:
            hexArray = ['#000000']
    }
    hexArray.includes(selectedHex) ? hex = selectedHex : hex = hexArray[0];

    // For Touch Events
    if (typeof e.touches !== 'undefined') {
        let touch = e.touches[0];
        var rect = e.target.getBoundingClientRect();
        drawX = touch.clientX - rect.left;
        drawY = touch.clientY - rect.top;
    }
    // For Mouse Events
    else {
        drawX = e.offsetX;
        drawY = e.offsetY;
    }
    
    ctx[i].strokeStyle = `${hex}`;
    ctx[i].beginPath();
    // Start from
    ctx[i].moveTo(lastX, lastY);
    // Go to
    ctx[i].lineTo(drawX, drawY);
    ctx[i].stroke();
    [lastX, lastY] = [drawX, drawY];

    console.log({'x' : lastX, 'y' : lastY});
}

// Drawing with a mouse
canvases.forEach(canvas => canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];    
}));
canvases.forEach(canvas => canvas.addEventListener('mousemove', draw));
canvases.forEach(canvas => canvas.addEventListener('mouseup', () => isDrawing = false));
canvases.forEach(canvas => canvas.addEventListener(('mouseout'), () => isDrawing = false));

// Drawing with a touch device
canvases.forEach(canvas => canvas.addEventListener('touchstart', (e) => {
    if (e.target == canvas) {
        e.preventDefault();
    }
    isDrawing = true;
    let touch = e.changedTouches[0]
    let rect = e.target.getBoundingClientRect();
    drawX = touch.clientX - rect.left;
    drawY = touch.clientY - rect.top;
    [lastX, lastY] = [drawX, drawY];
}));
canvases.forEach(canvas => canvas.addEventListener('touchmove', draw));
canvases.forEach(canvas => canvas.addEventListener('touchend', (e) => {
    if (e.target == canvas) {
        e.preventDefault();
    }
    isDrawing = false;
}));
canvases.forEach(canvas => canvas.addEventListener(('touchcancel'), (e) => {
    if (e.target == canvas) {
        e.preventDefault();
    }
    isDrawing = false;
}));


/*
 * Reveal Real Logo
 */
const revealBtn = document.querySelectorAll('.btn-reveal');
const realLogo = document.querySelectorAll('.real-logo');
function toggleLogo() {
    
    let i = this.dataset.index - 1;
    
    realLogo[i].classList.toggle('active');
    if (revealBtn[i].innerText == 'Reveal Logo') {
        revealBtn[i].innerText = 'Hide Logo';
    } else {
      revealBtn[i].innerText = 'Reveal Logo';  
    } 
    revealBtn[i].classList.add('animate__bounce');
    setTimeout(() => {revealBtn[i].classList.remove('animate__bounce')}, 300);
}
revealBtn.forEach(btn => btn.addEventListener('click', toggleLogo));