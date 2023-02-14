/* <script type="module">

        import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.115.0/build/three.module.js';
        import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.115.0/examples/jsm/controls/OrbitControls.js';
      
        //
        // Set up the ThreeJS environment.
        //
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
      
        var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );
      
        var scene = new THREE.Scene();
        
        let controls = new OrbitControls(camera, renderer.domElement);
      
        //
        // Create the points.
        //
        function rose( xLo, xHi, xCount, thetaLo, thetaHi, thetaCount ){
          let vertex = [];
          let colors = [];
          let radius = [];
          for( let x = xLo; x <= xHi; x += ( xHi - xLo ) / xCount ) {
            for( let theta = thetaLo; theta <= thetaHi; theta += ( thetaHi - thetaLo ) / thetaCount ) {
              let phi = ( Math.PI / 2 ) * Math.exp( -theta / ( 8 * Math.PI ) );
              let X = 1 - ( 1 / 2 ) * ( ( 5 / 4 ) * ( 1 - ( ( 3.6 * theta ) % ( 2 * Math.PI ) ) / Math.PI ) ** 2 - 1 / 4 ) ** 2;
              let y = 1.95653 * ( x ** 2 ) * ( (1.27689 * x - 1) ** 2 ) * Math.sin( phi );
              let r = X * ( x * Math.sin( phi ) + y * Math.cos( phi ) ); 
      
              //
              // Fix: Ensure radius is positive, and scale up accordingly...
              //
              if ( 0 < r ) {
              
                const factor = 20;
                
                r = r * factor;
                radius.push( r );
                X = X * factor;
      
                vertex.push( r * Math.sin( theta ), r * Math.cos( theta ), X * ( x * Math.cos( phi ) - y * Math.sin( phi ) ) );
              }
            }
          }
          
          //
          // For the fun of it, lets adjust the color of the points based on the radius
          // of the point such that the larger the radius, the deeper the red.
          //
          let rLo = Math.min( ...radius );
          let rHi = Math.max( ...radius );
          for ( let i = 0; i < radius.length; i++ ) {
            let clr = new THREE.Color( Math.floor( 0x22 + ( 0xff - 0x22 ) * ( ( radius[ i ] - rLo ) / ( rHi - rLo ) ) ) * 0x10000 + 0x002222 );
            colors.push( clr.r, clr.g, clr.b );
          }
          
          return [ vertex, colors, radius ];
        }
      
        //
        // Create the geometry and mesh, and add to the THREE scene.
        //
        const geometry = new THREE.BufferGeometry();
        
        
        let [ positions, colors, radius ] = rose( 0, 1, 20, -2 * Math.PI, 15 * Math.PI, 2000 );
        
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
        geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
      
        const material = new THREE.PointsMaterial( { size: 4, vertexColors: true, depthTest: false, sizeAttenuation: false } );
      
        const mesh = new THREE.Points( geometry, material );
        scene.add( mesh );
              
        //
        // Render...
        // 
        var animate = function () {
          requestAnimationFrame( animate );
          renderer.render( scene, camera );
        };
      
        animate();
      </script> */
const text = 'For You My Jas';
let i = 0;
const typing = () => {
    if (i < text.length) {
        document.getElementById("for-you").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 70);
    }
}
let i2 = 0;
const text2 = 'Happy Valentine\'s Day ';
const typing2 = () => {
    if (i2 < text2.length) {
      document.getElementById("hvalen").innerHTML += text2.charAt(i2);
      i2++;
      setTimeout(typing2, 70);
    }
}
function rose(theta, n, d, amplitude) {
    var k = n / d;
    var x = amplitude * Math.cos(k * theta) * Math.cos(theta);
    var y = amplitude * Math.cos(k * theta) * Math.sin(theta);
    return { "x": x, "y": y };
}

function point(x, y, context) {
    context.beginPath();
    context.arc(x, y, 1, 0, 2 * Math.PI, true);
    context.stroke();
}

var canvas, context, width, height, nodes;
var t = 0;

function setup() {
    // initialize canvas.
    canvas = document.getElementById('c');
    context = canvas.getContext('2d');
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // bloom.
    context.shadowBlur = 15;
    context.shadowColor = '#fff';

    // point style
    context.strokeStyle = 'rgba(255,255,255, 255)';
}

function loop() {
    window.requestAnimationFrame(loop);

    context.translate(width / 2, height / 2); // (0, 0) set to screen center position.

    var n = 7;
    var d = 2;
    var p = rose(t, n, d, 100.0);
    point(p.x, p.y, context);

    p = rose(t, 3, 2, 100.0);
    point(p.x + 200, p.y, context);

    p = rose(t, 4, 7, 100.0);
    point(p.x - 200, p.y, context);


    context.translate(-width / 2, -height / 2); // reset screen

    t += 0.05;
}
setTimeout(typing,0);
setTimeout(typing2,3500);
setup();
loop();