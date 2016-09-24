var app = app || {};

app.main = (function(){

	console.log('Loading app.');

	function matterSetup(){

		var container = document.getElementById('canvas-container');
		// console.log(container);


		/*------------- MATTER OBJECTS -------------*/
		// ALIASES
		var Engine = Matter.Engine,
			Render = Matter.Render,
			World = Matter.World,
			Bodies = Matter.Bodies,
			Events = Matter.Events,
			MouseConstraint = Matter.MouseConstraint,
			Body = Matter.Body,
			Vertices = Matter.Vertices,
			Mouse = Matter.Mouse
			;

		// SETUP WORLD

		// create an engine
		var engine = Engine.create();

		// create a renderer
		var width = window.innerWidth;
		var height = window.innerHeight;
		var render = Render.create({
			element: container,
			engine: engine,
			options: {
				wireframes: false,
				showAngleIndicator: false,
				width: width,
				height: height,
				background: "black"
			}
		});
		// console.log(render);

		// Add a mouse controlled constraint
		var mouseConstraint = MouseConstraint.create(engine, {
			element: render.canvas,
			constraint: {
				// render: {
				// 	visible: false
				// }
			}
		});

		// Add a mouse
		var mouse = Mouse.create(render.canvas);

		engine.world.gravity.y = 0;
		// engine.world.gravity.y = 0.05;

		var centerX = width/2;
		var centerY = height/2;
		var user = Bodies.circle(400, 400, 20);

		
		// LETTERS
		var letterOptions = {
			mass: 1,
			render: {
				fillStyle: 'white',
				strokeStyle: 'white',
				lineWidth: 1
			}
		};

		var letters = [
			Bodies.rectangle(centerX - 427, centerY - 89, 170, 35, letterOptions),	// T
			Bodies.rectangle(centerX - 427, centerY + 14, 35, 170, letterOptions),
			Bodies.rectangle(centerX - 230, centerY - 89, 155, 35, letterOptions),	// E
			Bodies.rectangle(centerX - 212, centerY - 4, 120, 35, letterOptions),
			Bodies.rectangle(centerX - 230, centerY + 82, 155, 35, letterOptions),
			Bodies.rectangle(centerX - 290, centerY - 4, 35, 135, letterOptions),

			Bodies.fromVertices(centerX - 94, centerY + 12, Vertices.fromPath("0 0 0 0 0 205 35 205 35 57 0 0"), letterOptions),		// M
			Bodies.fromVertices(centerX - 46, centerY - 32, Vertices.fromPath("0 0 41 0 111 113 111 180 0 0"), letterOptions),
			Bodies.fromVertices(centerX + 46, centerY - 32, Vertices.fromPath("0 180 112 0 71 0 0 113 0 180"), letterOptions),
			Bodies.fromVertices(centerX + 95, centerY + 12, Vertices.fromPath("35 0 0 56 0 205 35 205 35 0 35 0"), letterOptions),

			Bodies.rectangle(centerX + 229, centerY - 89, 155, 35, letterOptions),	// E
			Bodies.rectangle(centerX + 247, centerY - 4, 120, 35, letterOptions),
			Bodies.rectangle(centerX + 229, centerY + 82, 155, 35, letterOptions),
			Bodies.rectangle(centerX + 169, centerY - 4, 35, 135, letterOptions),

			Bodies.rectangle(centerX + 375, centerY - 4, 35, 205, letterOptions),	// R
			Bodies.rectangle(centerX + 435, centerY - 89, 85, 35, letterOptions),
			Bodies.rectangle(centerX + 435, centerY - 4, 85, 35, letterOptions),
			Bodies.rectangle(centerX + 495, centerY - 46, 35, 120, letterOptions),
			Bodies.fromVertices(centerX + 466, centerY + 57, Vertices.fromPath("0 0 41 0 93 85 52 85"), letterOptions)


		];
		console.log(letters[0]);


		// WALLS
		var wallWidth = 100;
		var walls = [
			Bodies.rectangle(-wallWidth, height/2, wallWidth, height, { isStatic: true }),
			Bodies.rectangle(width+wallWidth, height/2, wallWidth, height, { isStatic: true }),
			Bodies.rectangle(width/2, -wallWidth, width, wallWidth, { isStatic: true }),
			Bodies.rectangle(width/2, height+wallWidth, width, wallWidth, { isStatic: true })
		];

		// add all of the bodies to the world
		World.add(engine.world, letters);
		World.add(engine.world, mouseConstraint);
		World.add(engine.world, user);
		World.add(engine.world, walls);


		var pMouse = {x: 0, y: 0};
		var xOffset, yOffset;
		Events.on(engine, 'tick', function(event) {
			Body.setPosition(user, {x: mouse.position.x, y: mouse.position.y})
			xOffset = -(mouse.position.x - pMouse.x)/1000;
			yOffset = -(mouse.position.y - pMouse.y)/1000;
			// Body.applyForce(user,
			// 	{ x: mouse.position.x, y: mouse.position.y },
			// 	// { x: 1, y: 1 }
			// 	{ x: xOffset, y: yOffset }
			// );
			pMouse.x = mouse.position.x;
			pMouse.y = mouse.position.y;
			// console.log(xOffset);
		});

// {
//             x: 0,
//             y: 0
//         }, {
//             x: force.x / 10000,
//             y: force.y / 10000
//         });

		// FOLLOW MOUSE
		Events.on(mouseConstraint, "mousemove", function(event){
			// console.log(mouse);
			// Body.applyForce(user, )
			// console.log(event);
			// console.log(mouseConstraint.body);

			// mouseConstraint.constraint.pointA = mouse.position;
			// mouseConstraint.constraint.pointB = user.position;
			// mouseConstraint.body = user;
			

			// mouseConstraint.constraint.bodyB = mouseConstraint.body = user;
			// mouseConstraint.constraint.pointB = { x: mouse.position.x - user.position.x, y: mouse.position.y - user.position.y };
			// mouseConstraint.constraint.angleB = user.angle;

			// Body.setPosition(user, mouseConstraint.constraint.pointA);
			// Body.setAngle(user, mouseConstraint.constraint.angleA);
			// mouseConstraint.pointA = user.position;
			// console.log(mouseConstraint.constraint);

	        // if (mouse.button === 0) {
	        // 	// Not dragging...
	        //     if (!mouseConstraint.constraint.bodyB) {
	        //     	// console.log('yeah');
	        //         for (var i = 0; i < bodies.length; i++) {
	        //             body = bodies[i];
	        //             if (Bounds.contains(body.bounds, mouse.position) 
	        //                     && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
	        //                 for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
	        //                     var part = body.parts[j];
	        //                     if (Vertices.contains(part.vertices, mouse.position)) {
	        //                         constraint.pointA = mouse.position;
	        //                         constraint.bodyB = mouseConstraint.body = body;
	        //                         constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
	        //                         constraint.angleB = body.angle;

	        //                         Sleeping.set(body, false);
	        //                         Events.trigger(mouseConstraint, 'startdrag', { mouse: mouse, body: body });

	        //                         break;
	        //                     }
	        //                 }
	        //             }
	        //         }
	        //     // } else {
	        //     //     Sleeping.set(constraint.bodyB, false);
	        //     //     constraint.pointA = mouse.position;
	        //     // }
	        // // } else {
	        //     // constraint.bodyB = mouseConstraint.body = null;
	        //     // constraint.pointB = null;

	        //     // if (body) Events.trigger(mouseConstraint, 'enddrag', { mouse: mouse, body: body });
	        // 	}
	        // }

		});

		// // ROTATE ON COLLISION
		Events.on(engine, 'collisionStart', function(event) {

			var pairs = event.pairs;

			for (var i = 0; i < pairs.length; i++) {

				var pair = pairs[i];
				// console.log(pair);

				// detect collision with user
				if(pair.bodyA.id === user.id || pair.bodyB.id === user.id){
					var otherObj = (pair.bodyA.id === user.id) ? (pair.bodyB) : (pair.bodyA);
					Body.applyForce(otherObj,
						{ x: mouse.position.x, y: mouse.position.y },
						// { x: 1, y: 1 }
						{ x: xOffset, y: yOffset }
					);
				}
			}
		});

		// run the engine
		Engine.run(engine);

		// run the renderer
		Render.run(render);	
	
	}

	var init = function(){
		matterSetup();
	};

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);