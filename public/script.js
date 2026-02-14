var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

var hearts = [];

function createFloatingHeart(x, y) {
    hearts.push({
        x: x,
        y: y,
        size: Math.random() * 20 + 8,
        speedY: Math.random() * 1.5 + 0.5,
        drift: (Math.random() - 0.5) * 0.8,
        opacity: 1,
        life: 120 + Math.random() * 60,
        age: 0,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05
    });
}

function spawnHeartsEverywhere() {
    var amount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000));
    for (var i = 0; i < amount; i++) {
        createFloatingHeart(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        );
    }
}

function updateHearts() {
    for (var i = hearts.length - 1; i >= 0; i--) {
        var h = hearts[i];
        h.y -= h.speedY;
        h.x += h.drift;
        h.rotation += h.rotationSpeed;
        h.age++;
        h.opacity = 1 - (h.age / h.life);
        if (h.age >= h.life) {
            hearts.splice(i, 1);
        }
    }
}

function drawHeartShape(x, y, size, rotation, alpha) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.scale(size / 12, size / 12);
    context.beginPath();
    context.moveTo(0, -6);
    context.bezierCurveTo(6, -18, 24, -6, 0, 18);
    context.bezierCurveTo(-24, -6, -6, -18, 0, -6);
    context.closePath();
    context.fillStyle = "rgba(255, 80, 150, " + alpha + ")";
    context.fill();
    context.restore();
}

function drawHearts() {
    for (var i = 0; i < hearts.length; i++) {
        var h = hearts[i];
        drawHeartShape(h.x, h.y, h.size, h.rotation, h.opacity);
    }
}

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
    spawnHeartsEverywhere();
    var prev = button.textContent;
    button.textContent = "💖";
    setTimeout(function() {
        button.textContent = prev;
    }, 600);
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;

    if(frameNumber < 250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("cada día no puedo creer lo afortunado que soy", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("cada día no puedo creer lo afortunado que soy", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    if(frameNumber == 500){ opacity = 0; }

    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["entre trillones y trillones de estrellas,", "a lo largo de miles de millones de años"], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        } else {
            context.fillText("entre trillones y trillones de estrellas, a lo largo de miles de millones de años", canvas.width/2, canvas.height/2);
        }
        opacity += 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["entre trillones y trillones de estrellas,", "a lo largo de miles de millones de años"], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        } else {
            context.fillText("entre trillones y trillones de estrellas, a lo largo de miles de millones de años", canvas.width/2, canvas.height/2);
        }
        opacity -= 0.01;
    }

    if(frameNumber == 1000){ opacity = 0; }

    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("estar vivo y poder compartir esta vida contigo", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("estar vivo y poder compartir esta vida contigo", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    if(frameNumber == 1500){ opacity = 0; }

    if(frameNumber > 1500 && frameNumber < 1750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("es algo increíblemente e inimaginablemente improbable", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }
    if(frameNumber >= 1750 && frameNumber < 2000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("es algo increíblemente e inimaginablemente improbable", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    if(frameNumber == 2000){ opacity = 0; }

    if(frameNumber > 2000 && frameNumber < 2250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("y aun así aquí estoy, con la oportunidad imposible de conocerte", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }
    if(frameNumber >= 2250 && frameNumber < 2500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("y aun así aquí estoy, con la oportunidad imposible de conocerte", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    if(frameNumber == 2500){ opacity = 0; }

    if(frameNumber > 2500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("te amo tanto Jade, más de lo que el tiempo y el universo pueden contener", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }

    if(frameNumber >= 2750){
        context.fillStyle = `rgba(45, 45, 255, ${secondOpacity})`;
        context.fillText("y quiero pasar cada instante del mundo compartiendo ese amor contigo", canvas.width/2, canvas.height/2 + 60);
        secondOpacity += 0.01;
    }

    if(frameNumber >= 3000){
        context.fillStyle = `rgba(45, 45, 255, ${thirdOpacity})`;
        context.fillText("Feliz Día de San Valentín ❤️", canvas.width/2, canvas.height/2 + 120);
        thirdOpacity += 0.01;
        button.style.display = "block";
    }

    context.shadowBlur = 0;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    updateStars();
    updateHearts();
    drawHearts();
    drawText();
    let speed = window.innerWidth < 600 ? 1 : 0.4;
    frameNumber += speed;
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.requestAnimationFrame(draw);
