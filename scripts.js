window.addEventListener( 'load', function () {
  var
    options = {
      width: 300,
      height: 300,
      radius: 120,
      backgroundColor: 'white',
      clockBackgroundColor: '#A6E22E',
      clockBorderColor: '#43413E',
      clockBorderWidth: 5,
      clockCenterColor: '#43413E',
      handColor: '#43413E',
      elementId: 'canvas'
    };

  var
    canvas = document.getElementById( options.elementId ),
    ctx = canvas.getContext( '2d' ),
    centerX, centerY;

  // ustawiamy rozmiar nie przez canvas.style.width i canvas.style.height,
  // ponieważ dla canvasu rozmiar musi być określony przez atrybuty, a nie przez style)
  // z tego samego powodu nie podajemy żadnych jednostek, a podane wartości wyrażone są w pikselach
  canvas.width = options.width;
  canvas.height = options.height;
  canvas.style.backgroundColor = options.backgroundColor;
  centerX = options.width / 2;
  centerY = options.height / 2;

  function paint() {
    var
      i, angle,
      r = options.radius,
      current = new Date(),
      hours = current.getHours(),
      minutes = current.getMinutes(),
      seconds = current.getSeconds();

    // zegar jest 12-godzinny
    if ( hours > 12 ) {
      hours -= 12;
    }

    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect( 0, 0, options.width, options.height );

    // tło zegara
    ctx.beginPath();
    ctx.fillStyle = options.clockBackgroundColor;
    ctx.strokeStyle = options.clockBorderColor;
    ctx.lineWidth = options.clockBorderWidth;
    ctx.arc( centerX, centerY, r, 0, 2 * Math.PI );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    // środek
    ctx.beginPath();
    ctx.fillStyle = options.clockCenterColor;
    ctx.strokeStyle = options.clockCenterColor;
    ctx.arc( centerX, centerY, r / 15, 0, 2 * Math.PI );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    // kreski godzinowe
    ctx.lineWidth = 4;
    for ( i = 0; i < 12; i++ ) {
      angle = 2 * Math.PI / 12 * i - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(
        centerX + ( r - 9 ) * Math.cos( angle ),
        centerY + ( r - 9 ) * Math.sin( angle )
      );
      ctx.lineTo(
        centerX + ( r - 1 ) * Math.cos( angle ),
        centerY + ( r - 1 ) * Math.sin( angle )
      );
      ctx.stroke();
      ctx.closePath();
    }

    // kreski minutowe
    ctx.lineWidth = 1;
    for ( i = 0; i < 60; i++ ) {
      angle = 2 * Math.PI / 60 * i - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(
        centerX + ( r - 5 ) * Math.cos( angle ),
        centerY + ( r - 5 ) * Math.sin( angle )
      );
      ctx.lineTo(
        centerX + ( r - 1 ) * Math.cos( angle ),
        centerY + ( r - 1 ) * Math.sin( angle )
      );
      ctx.stroke();
      ctx.closePath();
    }

    // wskazówka godzinowa
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = options.handColor;
    ctx.moveTo( centerX, centerY );
    // korzystamy z wzorów na współrzędne punktu na okręgu:
    // x = x0 + r cos (alfa)
    // y = y0 + r sin (alfa)
    // gdzie (x0, y0) - współrzędne środka okręgu
    //
    // Musimy także przesunąć o PI/2 wstecz obliczoną współrzędną,
    // gdyż obliczenia są dla przypadku, gdy kąt 0 stopni oznacza linię
    // wzdłuż dodatniej części osi X, natomiast my chcemy zaczynać od dodatniej części osi Y
    ctx.lineTo(
      centerX + r * 0.8 * Math.cos( 2 * Math.PI / 12 * hours - Math.PI / 2 ),
      centerY + r * 0.8 * Math.sin( 2 * Math.PI / 12 * hours - Math.PI / 2 )
    );
    ctx.stroke();
    ctx.closePath();

    // wskazówka minutowa
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo( centerX, centerY );
    ctx.lineTo(
      centerX + r * 0.9 * Math.cos( 2 * Math.PI / 60 * minutes - Math.PI / 2 ),
      centerY + r * 0.9 * Math.sin( 2 * Math.PI / 60 * minutes - Math.PI / 2 )
    );
    ctx.stroke();
    ctx.closePath();

    // wskazówka sekundowa
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo( centerX, centerY );
    ctx.lineTo(
      centerX + r * 0.9 * Math.cos( 2 * Math.PI / 60 * seconds - Math.PI / 2 ),
      centerY + r * 0.9 * Math.sin( 2 * Math.PI / 60 * seconds - Math.PI / 2 )
    );
    ctx.stroke();
    ctx.closePath();
  }

  // pierwsze wyświetlenie zegara
  paint();

  // kolejne wyświetlenia (odświeżanie co pół sekundy, żeby nie było dziwnych skoków wskazówki sekundowej)
  setInterval( paint, 500 );
});