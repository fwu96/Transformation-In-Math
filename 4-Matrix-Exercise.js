/**
 * 4-Matrix-Exercise.js - code for workbook 4 page 4
 * provides a non-working example for students to edit
 *
 * written by Michael Gleicher, January 2019
 *
 */

// see other files for explanation of these comments
 // @ts-check
/* jshint -W069, esversion:6 */

import { draggablePoints } from "./Libs/dragPoints.js";
const circRadius = 7;

/**
 * TwoDots1 - a function for the student to write
 * Notice that it gets the two points and the context as arguments
 * This function should apply a transformation
 *
 * You must write this function using rotate, translate and scale
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function twoDots1(context,x1,y1,x2,y2) {
    context.translate(x1, y1);  // make the origin to the center of red dot
    let dist_x = x2 - x1;  // the distance of x position bewteen green dot and red dot
    let dist_y = y2 - y1;  // the distance of y position bewteen green dot and red dot
    // The scale factor, which need to keep the square still being square after scaling
    let s = Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y, 2)) / 10.0;
    context.scale(s, s);
    // The angle should be used to rotate
    let angle = Math.atan2(dist_y, dist_x);
    context.rotate(angle);
}

/**
 * TwoDots2 - another function for the student to write
 *
 * fill in the expressions for a,b,c,d,e,f
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function twoDots2(context,x1,y1,x2,y2) {
    let dist_x = x2 - x1;  // the distance of x pos between two dots
    let dist_y = y2 - y1;  // the distance of y pos between two dots
    // Scale factor based on two distances
    let s = Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y, 2)) / 10.0;
    let r = Math.atan2(dist_y, dist_x);  // needed rotation angle (radiance)
    let sin = Math.sin(r);  // Sin value of the radiance
    let cos = Math.cos(r);  // Cos value of the radiance
    //  Multiple three maxtixes and get these six corrdinates
    let a = s * cos;
    let b = s * sin;
    let c = -s * sin;
    let d = s * cos;
    let e = x1;
    let f = y1;
    // please leave this line - you should CHANGE the 6 lines above
    context.transform(a,b,c,d,e,f);
}

/**
 * TwoDots3 - another function for the student to write
 *
 * this should perform some transformation - you can decide how it works
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function twoDots3(context,x1,y1,x2,y2) {
    let dist_x = x2 - x1;  // distance of x pos between two dots
    let dist_y = y2 - y1;  // distance of y pos between two dots
    // Scale factor, divided SQRT2 at the end because the scale based on the diagonal of the square
    let s = Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y, 2)) / 10.0 / Math.SQRT2;
    // Radiance needed for rotation, substract 45 degrees since when two dots on the diagonal, there is not rotation
    let r = Math.atan2(dist_y, dist_x) - Math.PI / 4;
    let sin = Math.sin(r);  // sin value of the radiance
    let cos = Math.cos(r);  // cos value of the radiance
    let a = s * cos;
    let b = s * sin;
    let c = -s * sin;
    let d = s * cos;
    let e = x1;
    let f = y1;
    context.transform(a,b,c,d,e,f);
}

/**
 * Drawing Box 2 -
 * For each square, comment out the "transformations" and put
 * the appropriate numbers in the transform. - the picture should
 * look the same.
 *
 * I did square 2 for you
 *
 * @param {CanvasRenderingContext2D} context
 */
function drawBox3(context) {
    // Square #1
    context.save();
    // transformation version (student should comment out)
    // context.translate(20,20);
    // context.scale(4,4);
    // matrix version (student should replace the numbers)
    context.transform(4, 0, 0, 4, 20, 20);
    //
    markedSquare(context);
    context.restore();

    // Square #2 - I did this one for you!
    context.save();
    // transformation version (student should comment out)
    // context.translate(20,20);
    // context.scale(4,4);
    // context.translate(15,0);
    // matrix version (student should replace the numbers)
    context.transform(4,0,0,4,80,20);
    markedSquare(context);
    //
    context.restore();

    // Square #3
    context.save();
    // transformation version (student should comment out)
    // context.translate(140,20);
    // context.scale(4,4);
    // context.rotate(Math.PI/2);
    // context.translate(0,-10);
    // matrix version (student should replace the numbers)
    context.transform(0, 4, -4, 0, 180, 20);
    //
    markedSquare(context);
    context.restore();

    // Square #4
    context.save();
    // transformation version (student should comment out)
    // context.rotate(-Math.PI/2);
    // context.translate(-60,200);
    // context.scale(4,4);
    // matrix version (student should replace the numbers)
    context.transform(0, -4, 4, 0, 200, 60);
    //
    markedSquare(context);
    context.restore();

    // Square #5
    context.save();
    // transformation version (student should comment out)
    // context.rotate(-Math.PI/2);
    // context.translate(-60,260);
    // context.scale(4,-4);
    // context.translate(0,-10);
    // matrix version (student should replace the numbers)
    context.transform(0, -4, -4, 0, 300, 60);
    //
    markedSquare(context);
    context.restore();

}

/**
 *
 * ShearX function - student should fill this in.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} s
 */
function shearX(context,s) {
    context.transform(1, 0, s, 1, 0, 0);
}

/** simple example answers - don't give to students */
function twoDotsMG(context,x1,y1,x2,y2) {
   context.translate(x1,y1);
   let dx = x2-x1;
   let dy = y2-y1;
   let d = Math.sqrt(dx*dx + dy*dy) / 10.0 / Math.SQRT2;
   context.scale(d,d);
   let a = Math.atan2(dy,dx) - Math.PI/4;
   context.rotate(a);
}
function twoDots0MG(context,x1,y1,x2,y2) {
   context.translate(x1,y1);
   let dx = x2-x1;
   let dy = y2-y1;
   let d = Math.sqrt(dx*dx + dy*dy) / 10.0;
   context.scale(d,d);
   let a = Math.atan2(dy,dx);
   context.rotate(a);
}

/** Utility function: draw a 10x10 square with markings so we know which
 * way is x and which way is Y
 * don't use rect drawing - since it doesn't always transform correctly
 * @param {CanvasRenderingContext2D} context
 */
function markedSquare(context) {
    function square(x,y,size,color) {
        context.save();
        context.translate(x,y);
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(size,0);
        context.lineTo(size,size);
        context.lineTo(0,size);
        context.closePath();
        context.fill();
        context.restore();
    }
    square(0,0,10,"goldenrod");
    square(1,1,2,"red");
    square(7,7,2,"green");
    square(7,1,2,"white");
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {string} color
 */
function circle(context,x,y,radius,color) {
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill();
    context.restore();
}

function box12()
{
    function setup(id,funct) {
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(id));
        let context = canvas.getContext("2d");
        let pts = [ [20,20], [50,50]]; // initial points
        function draw1() {
            context.clearRect(0,0,canvas.width,canvas.height);
            context.save();
            funct(context,pts[0][0],pts[0][1], pts[1][0], pts[1][1]);
            markedSquare(context);
            context.restore();
            circle(context, pts[0][0], pts[0][1], circRadius, "red");
            circle(context, pts[1][0], pts[1][1], circRadius, "green");
        }
        draggablePoints(canvas,pts,draw1,circRadius);
        draw1();
    }
    setup("twodots1",twoDots1);
    setup("twodots2",twoDots2);
    setup("twodots3",twoDots3);
}

function box3()
{
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box3canvas"));
    let context = canvas.getContext("2d");
    drawBox3(context);
}

function box4()
{
  let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box4shearX"));
  let context = canvas.getContext("2d");

  context.save();
  context.translate(20,20);
  context.scale(4,4);
  shearX(context,1);
  markedSquare(context);
  context.restore();

  context.save();
  context.translate(140,20);
  context.scale(4,4);
  shearX(context,-1);
  markedSquare(context);
  context.restore();

  context.save();
  context.translate(20,80);
  context.scale(4,4);
  shearX(context,2);
  markedSquare(context);
  context.restore();

  context.save();
  context.translate(220,80);
  context.scale(4,4);
  shearX(context,-2);
  markedSquare(context);
  context.restore();

}

/**
 * Start things up correctly
 */
window.onload = function() {
    box12();
    box3();
    box4();
};
