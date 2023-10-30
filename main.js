async function fetchWeatherData() {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=40.74256%2C%20-73.986415';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd445c97b8cmsha3e99f0eaab65f1p1a7e98jsn5ea5a03645dc',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        console.log("Location: " + result.location.name);
        console.log("cloud: " + result.current.cloud);
        console.log("temp_c: " + result.current.temp_c);
      
        const myValue = result.current.temp_c;
        console.log("My Value: " + myValue);
      
        const nowTemp = document.createElement('h2');
        nowTemp.textContent = `Current Temperature: ${myValue}°C`;
        document.body.appendChild(nowTemp);

    
        const fontWeight = result.current.temp_c * 50;
        console.log("Font Weight: " + fontWeight); 
        const styleSheetContent = `
        h1 {
            font-variation-settings: "wght" 100;
            animation: breathe 10000ms infinite forwards;
        }
        @keyframes breathe {
            0% {
                font-variation-settings: "wght" 100;
            }
            60% {
                font-variation-settings: "wght" ${fontWeight};
            }
            100% {
                font-variation-settings: "wght" 100;
            }
        }
    `;
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styleSheetContent;
        document.head.appendChild(styleSheet);

    } catch (error) {
        console.error(error);
    }
}

fetchWeatherData();

var canvas;

var sunVertexResolution = 260;
var sunRadius = 100;

var sunTime = 0;
var sunTimeChange = .005;

var sunX = 0;
var sunY = 0;
var nSunVal;
var nSunInt = 0;
var nSunAmp = 0;

var sunGradient;
var sunGradientAnim = 1;

// New gradient color array
var gradientColors = [
    "#FDBA15", "#FDBA15", "#FDBA15", "#FFBF10", "#FFC310",
    "#FEBD12", "#FFC310", "#FFC30B", "#FFCE04", "#FFD602",
    "#FFDB01", "#FFE501", "#FFE802", "#FFE802", "#FFE802",
    "#FFE501", "#FFE103", "#FFD800", "#FFCE04", "#FBA91A",
    "#FAA31B", "#F7961E", "#F68D20", "#FBA21C"
];

function setup() {
    canvas = createCanvas(220, 220);
    canvas.parent('canvasContainer');
    sunGradient = canvas.drawingContext;
    noStroke();
    noiseDetail(5);
}

function draw() {
    translate(width/2, height/2);
    var filled = !filled;

    if (filled) {
        var gradX = -mouseX/4 - width / 2;
        var gradY = -mouseY/4 - height / 2;
        var gradient = sunGradient.createRadialGradient(0, 0, 150, gradX, gradY, 0);
        rotate(map(sin(sunGradientAnim), -1, 1, -PI/4, PI/4));

        // Set up gradient colors using lerpColor()
        for (var i = 0; i < gradientColors.length - 1; i++) {
            var color1 = color(gradientColors[i]);
            var color2 = color(gradientColors[i + 1]);
            var lerpCol = lerpColor(color1, color2, 0.5);
            gradient.addColorStop(i / (gradientColors.length - 1), lerpCol);
        }

        sunGradient.fillStyle = gradient;
        sunGradientAnim += 0.025;
    }

    nSunInt = 0.1;
    nSunAmp = 0.1;

    beginShape();

    for (var a=0; a<=TWO_PI; a+=TWO_PI/sunVertexResolution) {
        nSunVal = map(noise(cos(a)*nSunInt+0.1, sin(a)*nSunInt+0.1, sunTime), 0.0, 1.0, 0.9, 1.1);
        sunX = cos(a) * sunRadius * nSunVal;
        sunY = sin(a) * sunRadius * nSunVal;
        vertex(sunX, sunY);
    }

    endShape(CLOSE);

    sunTime += sunTimeChange;
}

// let lastMouseMoveTime = Date.now();
// let scrollingInterval;

// function stopAutoScroll() {
//     if (scrollingInterval) {
//         clearTimeout(scrollingInterval);
//         scrollingInterval = null;
//     }
// }

// // Track when the mouse was last moved
// document.addEventListener('mousemove', function() {
//     lastMouseMoveTime = Date.now();
//     stopAutoScroll();

//     // Restart the check for user inactivity
//     setTimeout(checkUserInactivity, 7000); // 5 seconds after last mouse move
// });

// function checkUserInactivity() {
//     if (Date.now() - lastMouseMoveTime > 5000) {
//         autoScroll();
//     } else {
//         setTimeout(checkUserInactivity, 1000);
//     }
// }

// function autoScroll() {
//     let hasClickedLink = false;

//     function isInViewport(element) {
//         const rect = element.getBoundingClientRect();
//         return (
//             rect.top >= 0 &&
//             rect.left >= 0 &&
//             rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//             rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//         );
//     }

//     function scrollAndCheckLinks() {
//         if (Date.now() - lastMouseMoveTime < 5000) {
//             return;
//         }

//         window.scrollTo({
//             top: window.scrollY + 500,
//             behavior: 'smooth'
//         });

//         const links = document.querySelectorAll('a');
        
//         links.forEach(link => {
//             if (isInViewport(link) && !hasClickedLink) {
//                 if (Math.random() < 0.15) {
//                     sessionStorage.setItem('linkClicked', 'true');
//                     link.click();
//                     hasClickedLink = true;
//                 }
//             }
//         });

//         if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !hasClickedLink) {
//             sessionStorage.setItem('linkClicked', 'true');
//             links[links.length - 1].click();
//             hasClickedLink = true;
//         }

//         if (!hasClickedLink) {
//             scrollingInterval = setTimeout(scrollAndCheckLinks, 4000);
//         }
//     }

//     scrollAndCheckLinks();
// }

// document.addEventListener('DOMContentLoaded', function() {
//     if (sessionStorage.getItem('linkClicked') === 'true') {
//         sessionStorage.removeItem('linkClicked');
//         setTimeout(autoScroll, 3000);
//     }

//     checkUserInactivity();
// });




// Your async function
// async function fetchData() {
//     const url = 'https://solcast.p.rapidapi.com/radiation/forecasts?api_key=hZhoTkHP7eC1yE9qbEETD3E7GD0rA8h1&latitude=40.74256&longitude=-73.986415&format=json';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'd445c97b8cmsha3e99f0eaab65f1p1a7e98jsn5ea5a03645dc',
//             'X-RapidAPI-Host': 'solcast.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);

//         const airTemp = result.forecasts[0].air_temp;
//         console.log("Air Temperature: " + airTemp);

//     } catch (error) {
//         console.error(error);
//     }
// }

// Call the function
// fetchData();



