let table;
let counties = [];
let prevW, prevH;

function preload() {
  table = loadTable('SES_PM25_CMR_2010.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont('Helvetica');
  prevW = width;
  prevH = height;

  // map bounds
  let minLon = -125, maxLon = -66;
  let minLat = 25, maxLat = 49;

  for (let r = 0; r < table.getRowCount(); r++) {
    let qStr = table.getString(r, 'SES');
    let pmStr = table.getString(r, 'pm25');
    let cmrStr = table.getString(r, 'cmr');

    let q = parseQuintile(qStr);
    let pm = parseFloat(pmStr);
    let cmr = parseFloat(cmrStr);
    if (isNaN(q) || isNaN(pm) || isNaN(cmr)) continue;

    // fake lon/lat for layout
    let lon = random(minLon, maxLon);
    let lat = random(minLat, maxLat);

    // convert to canvas coords
    let x = map(lon, minLon, maxLon, 0, width);
    let y = map(lat, maxLat, minLat, 0, height);

    counties.push({ x, y, q, pm, cmr });
  }

  background(15);
}

function draw() {
  background(15, 15, 25, 30);
  let t = millis() * 0.001;

  let pmMin = 5, pmMax = 20;
  let cmrMin = 100, cmrMax = 400;

  for (let c of counties) {
    // SES color mapping (Q1 red → Q5 blue)
    let baseColor = color(
      map(c.q, 1, 5, 220, 40),
      map(c.q, 1, 5, 80, 180),
      map(c.q, 1, 5, 60, 255),
      180
    );

    // brightness = mortality
    let brightness = map(c.cmr, cmrMin, cmrMax, 60, 255);
    let col = color(red(baseColor), green(baseColor), blue(baseColor), brightness);
    fill(col);

    // base size = PM2.5
    let baseSize = map(c.pm, pmMin, pmMax, 4, 25);

    // pulse amplitude stronger for lower SES
    let pulseAmp = (c.q <= 3) ? map(c.pm, pmMin, pmMax, 1, 8) : 1.5;
    let pulse = sin(t * 0.5) * pulseAmp;

    ellipse(c.x, c.y, baseSize + pulse);
  }

  // labels
  fill(255, 230);
  textAlign(CENTER);
  textSize(16);
  textSize(14);
  fill(255, 220);
  text("Aali Khan", width / 2, height - 45);
  text("Breathing Map: SES, Air Pollution, and Cardiovascular Mortality Rate (2010s)", width / 2, height - 25);

  drawLegend();
}

function parseQuintile(s) {
  if (!s) return NaN;
  s = s.toString().trim();
  if (/^Q[1-5]$/i.test(s)) return Number(s.charAt(1));
  let n = Number(s);
  return isNaN(n) ? NaN : n;
}

function drawLegend() {
  push();
  let x = 20, y = 20, itemH = 22, itemW = 18, gap = 6, w = 200, h = itemH * 6 + 24;

  fill(0, 140);
  stroke(255, 30);
  rect(x - 8, y - 8, w, h, 6);

  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  
  // SES colors
  for (let i = 1; i <= 5; i++) {
    let col = color(
      map(i, 1, 5, 220, 40),
      map(i, 1, 5, 80, 180),
      map(i, 1, 5, 60, 255),
      200
    );
    fill(col);
    rect(x, y + (i - 1) * (itemH + gap), itemW, itemH, 4);

    fill(255);
    let label = 'Q' + i;
    if (i === 1) label += ' (lowest SES)';
    else if (i === 5) label += ' (highest SES)';
    text(label, x + itemW + 8, y + (i - 1) * (itemH + gap) + itemH / 2);
  }

fill(255);
fill(220, 180, 40);
text("Circle size → PM2.5 level", x, y + (itemH + gap) * 5 + 16);
fill(220, 180, 40);
text("Circle brightness → CMR (cardiovascular mortality rate)", x, y + (itemH + gap) * 5 + 34);

  pop();
}

function windowResized() {
  let newW = windowWidth, newH = windowHeight;
  let sx = newW / prevW, sy = newH / prevH;
  for (let c of counties) {
    c.x *= sx;
    c.y *= sy;
  }
  prevW = newW;
  prevH = newH;
  resizeCanvas(newW, newH);
}
