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

/**
 * If you want to read up on JavaScript classes, check out your favorite book or...
 * the chapter in the Exploring JS book: http://exploringjs.com/es6/ch_classes.html
 * 
 */
class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     * @param {boolean} hit   - boolean to check if the shape hit anything
     * @param {number} center   - center position for creating a line pointing to shape's front
     * @param {number} radius   - radius of the circle 
     */
    constructor(x, y, vx=1, vy=0, hit, center, radius) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.hit = hit;
        this.center = center;
        this.radius = radius;
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        let r = 0;
        context.save();
            context.translate(this.x, this.y);
            // Set the rotate angle of the line which points to the front
            if (this.vx == 1) r = Math.PI/2;
            else if (this.vx == -1) r = -Math.PI/2;
            else if (this.vy == 1) r = Math.PI;
            else r = 0;
            context.beginPath(); 
            context.arc(this.center, this.center, this.radius, 0, Math.PI * 2, true);
            context.closePath();        
            if (this.hit) {
                context.fillStyle = "#E91E63";
            }
            else {
                context.fillStyle = "#9E9E9E";
            }
            context.fill();
            context.save();
                // Translate coordinate to the center of the circle
                context.translate(this.center, this.center);
                context.rotate(r);  // The "front line" rotates around the center
                context.translate(-this.center, -this.center);
                // Draw the line pointing to the front
                context.beginPath();
                context.moveTo(10, 10);
                context.lineTo(10, 0);
                context.closePath();
                context.strokeStyle = "#E8EAF6";
                context.lineWidth = 2;
                context.stroke();
            context.restore();
        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
		/*
		// Note - this sample behavior is just to help you understand
		// what a steering function might  do
		// all this one does is have things go in circles, rather than
		// straight lines
		// Something this simple would not count for the bonus points:
		// a "real" steering behavior must consider other boids,
		// or at least obstacles.
		*/
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        // 2 degrees per time step
        // const angle = 2 * Math.PI / 180;
        // const s = Math.sin(angle);
        // const c = Math.cos(angle);

        // let ovx = this.vx;
        // let ovy = this.vy;

        // this.vx =  ovx * c + ovy * s;
        // this.vy = -ovx * s + ovy * c;
        for (let i = 0; i < flock.length; i++) {
            if (!(this === flock[i])) {  // The "ball" cannot hit itself
                let c_dx = flock[i].x - this.x;  // distance of x position of the center
                let c_dy = flock[i].y - this.y;  // distance of y position of the center
                let c_dist = Math.sqrt(Math.pow(c_dx, 2) + Math.pow(c_dy, 2));  // distance between centers
                if (c_dist <=10) {
                    flock[i].hit = this.hit = true;
                    flock[i].vx *= -1;
                    flock[i].vy *= -1;
                    setTimeout(function() {
                        flock[i].hit = this.hit_c = false;
                    }, 700);
                }
            }
        }
    }
}
/**
 * The circle-shaped obstacles
 * @param {number} x   - x position of the center
 * @param {number} y   - y position of the center
 * @param {number} r   - radius of the obstacles
 */
class Obstacles_c {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.closePath();
        context.strokeStyle = "#00796B";
        context.lineWidth = 3.5;
        context.stroke();
    }
}
/**
 * The rectangle-shaped obstacles
 * @param {number} x   - x position of the top left corner
 * @param {number} y   - y position of the top left corner
 * @param {number} w   - width of the obstacle
 * @param {number} h   - height of the obstacle
 */
class Obstacles_r {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.w, this.y);
        context.lineTo(this.x + this.w, this.y + this.h);
        context.lineTo(this.x, this.y + this.h);
        context.lineTo(this.x, this.y);
        context.closePath();
        context.strokeStyle = "#00796B";
        context.lineWidth = 3.5;
        context.stroke();
    }
}
window.onload = function() {
    /** @type Array<Boid> */
    let theBoids = [];
    /** @type Array<Obstacles_c> */
    let obsList_c = [];
    /** @type Array<Obstacles_r> */
    let obsList_r = [];
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
    let context = canvas.getContext("2d");

    let speedSlider =/** @type {HTMLInputElement} */ (document.getElementById("speed"));

    function draw() {
        context.clearRect(0,0,canvas.width,canvas.height);
        theBoids.forEach(boid => boid.draw(context));
        obsList_c.forEach(obs => obs.draw(context));
        obsList_r.forEach(obs => obs.draw(context));
    }

    /**
     * Create some initial boids
     * STUDENT: may want to replace this
     */
    theBoids.push(new Boid(100, 100, 1, 0, false, 10, 10));
    theBoids.push(new Boid(200, 200, -1, 0, false, 10, 10));
    theBoids.push(new Boid(300, 300, 0, -1, false, 10, 10));
    theBoids.push(new Boid(400, 400, 0, 1, false, 10, 10));

    /**
     * Handle the buttons
     */
    document.getElementById("add").onclick = function () {
        // Students Fill This In
        // Create 10 new circles
        for (let i = 0; i < 10; i++) {
            /** 
             * Randonly get the position of new adding shapes
             * and avoid creating a shape located on the edge of the window
            */
            let rand_xpos = Math.floor(Math.random() * (canvas.width - 22)) + 1;
            let rand_ypos = Math.floor(Math.random() * (canvas.height - 22)) + 1;
            // Randomly get speed of new shapes
            let rand_vx = Math.floor(Math.random() * 3) - 1;
            let rand_vy = Math.floor(Math.random() * 3) - 1;
            // Make circles move either vertically or horizontally
            if (rand_vx == 1 || rand_vx == -1)
                rand_vy = 0;
            else if (rand_vy == 1 || rand_vy == -1)
                rand_vx = 0;
            // Circles move randomly just one direction
            else if (rand_vx == 0 && rand_vy == 0) {
                if (i < 5) {
                    if (i % 2 == 0)
                        rand_vx = 1;
                    else
                        rand_vy = 1;
                }
                else {
                    if (i % 2 == 0)
                        rand_vx = -1;
                    else
                        rand_vy = -1;
                }
            }
            theBoids.push(new Boid(rand_xpos, rand_ypos, rand_vx, rand_vy, false, 10, 10));
        }
    };
    document.getElementById("clear").onclick = function() {
        // Student Fill This In
        theBoids.splice(0, theBoids.length);
    };
    /**
     * When click on "Place Circle Obstacles" button
     * Randomly creating a circle-shaped obstacle on the screen
     */
    document.getElementById("obstacles_c").onclick = function() {
        obsList_c.splice(0, obsList_c.length);
        obsList_r.splice(0, obsList_r.length);
        let maxx = canvas.width - 100;
        let maxy = canvas.height - 100;
        let rand_xpos = Math.floor(Math.random() * (maxx + 1));
        let rand_ypos = Math.floor(Math.random() * (maxy + 1));
        let rand_r = Math.floor(Math.random() * 31 + 20);
        obsList_c.push(new Obstacles_c(rand_xpos, rand_ypos, rand_r));
        
    };
    /**
     * When click on "Place Rect Obstacles" button
     * Randomly creating a rectangle-shaped obstacle on the screen
     */
    document.getElementById("obstacles_r").onclick = function() {
        obsList_c.splice(0, obsList_c.length);
        obsList_r.splice(0, obsList_r.length);
        let maxx = canvas.width - 100;
        let maxy = canvas.height - 100;
        let randx = Math.floor(Math.random() * (maxx + 1));
        let randy = Math.floor(Math.random() * (maxy + 1));
        let randw = Math.floor(Math.random() * 50 + 50);
        let randh = Math.floor(Math.random() * 50 + 50);
        obsList_r.push(new Obstacles_r(randx, randy, randw, randh));
    };
    /**
     * Clear any obsacles on the screen
     */
    document.getElementById("clearobs").onclick = function() {
        obsList_c.splice(0, obsList_c.length);
        obsList_r.splice(0, obsList_r.length);
    };

    /**
     * The Actual Execution
     */
    function loop() {
        // change directions
        theBoids.forEach(boid => boid.steer(theBoids));
        // move forward
        let speed = Number(speedSlider.value);
        theBoids.forEach(function(boid) {
            boid.x += boid.vx * speed;
            boid.y += boid.vy * speed;
        });
        // make sure that we stay on the screen
        theBoids.forEach(function(boid) {
            /**
             * Students should replace this with collision code
             */
            boid.x = boid.x % canvas.width;
            boid.y = boid.y % canvas.height;
            let diam = boid.radius * 2;
            /**
             * When the cirle hit the edge, it turns movement direction to
             * opposite direction;
             * change color after hitting but change back to original color
             * after few seconds
             */
            // When circle move towards left hitting the edge
            if ((boid.x + diam) >= canvas.width) {
                boid.vx = -boid.vx;
                boid.hit = true;
                setTimeout(function() {
                   boid.hit = false;
                }, 700);
            }
            // When circle move towards top hitting the edge
            if (boid.y <= 0) {
                boid.vy *= -1;
                boid.hit = true;
                setTimeout(function() {
                   boid.hit = false;
                }, 700);
            }
            // When circle move towards right hitting the edge
            if (boid.x <= 0) {
                boid.vx *= -1;
                boid.hit = true;
                setTimeout(function() {
                   boid.hit = false;
                }, 700);
            }
            // When circle move towards bottom hitting the edge
            if ((boid.y + diam) >= canvas.height) {
                boid.vy *= -1;
                boid.hit = true;
                setTimeout(function() {
                   boid.hit = false;
                }, 700);
            }
            // When there is a circle-shaped obstracle on the screen
            obsList_c.forEach(function(obs) {
                // Calculate the distance bewteen shapes' center and the obstracle's center
                let x_dist = boid.x - obs.x;
                let y_dist = boid.y - obs.y;
                let c_dist = Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2));
                let r_sum = boid.radius + obs.r;
                // Hit
                if (c_dist <= r_sum) {
                    boid.hit = true;
                    boid.vx *= -1;
                    boid.vy *= -1;
                    setTimeout(function() {
                        boid.hit = false;
                    }, 700);
                }
            });
            // When there is a rectangle-shaped obstracle on the screen
            obsList_r.forEach(function(obs) {
                // set the point on the rectangle which is the closest point to the center of the shape
                let close_point = {"x": 0, "y": 0};
                // Set x position
                if 
                    (boid.x < obs.x) close_point.x = obs.x;
                else if 
                    (boid.x > obs.x + obs.w) close_point.x = obs.x + obs.w;
                else 
                    close_point.x = boid.x;
                // Set y position
                if (boid.y < obs.y)
                    close_point.y = obs.y;
                else if (boid.y > obs.y + obs.h)
                    close_point = obs.y + obs.h;
                else
                    close_point.y = boid.y;
                // Calculate the distance between shape center to its closest point
                let dist = Math.round(Math.sqrt(Math.pow(close_point.x - boid.x, 2) 
                        + Math.pow(close_point.y - boid.y, 2)));
                // Hit
                if (dist <= boid.radius) {
                    boid.hit = true;
                    boid.vx *= -1;
                    boid.vy *= -1;
                    setTimeout(function() {
                        boid.hit = false;
                    }, 700);
                }
            });
        });
        // now we can draw
        draw();
        // and loop
        window.requestAnimationFrame(loop);
    }
    loop();
};