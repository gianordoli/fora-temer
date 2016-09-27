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
			Vertices = Matter.Vertices
			;

		// SETUP WORLD

		// create an engine
		var engine = Engine.create();

		// create a renderer
		var width = window.innerWidth;
		var height = window.innerHeight;
		var un = width/40;

		var render = Render.create({
			element: container,
			engine: engine,
			options: {
				wireframes: false,
				showAngleIndicator: false,
				width: width,
				height: height,
				background: "rgb(220, 0, 30)"
			}
		});
		// console.log(render);

		var user = Bodies.circle(0, 0, 40, {
			frictionAir: 1,
			render: {
				fillStyle: "rgba(0, 0, 0, 0)",
				strokeStyle: "rgba(0, 0, 0, 0)"
			}
		});		

		// Add a mouse controlled constraint
		var mouseConstraint = MouseConstraint.create(engine, {
			element: render.canvas,
			constraint: {
				render: {
					visible: false
				}
			}
		}, user);

		engine.world.gravity.y = 0;


		var centerX = width/2;
		var centerY = height/2;
		
		// LETTERS
		var letterOptions = {
			frictionAir: 0.05,
			render: {
				fillStyle: 'white',
				strokeStyle: 'white',
				lineWidth: 1
			}
		};

		var letters = [
			Bodies.rectangle(centerX - 12.2*un,	centerY - 2.5*un,	4.9*un,	1*un,	letterOptions),	// T
			Bodies.rectangle(centerX - 12.2*un,	centerY + 0.5*un,	1*un,	4.9*un,	letterOptions),
			Bodies.rectangle(centerX - 6.6*un,	centerY - 2.5*un,	4.4*un,	1*un,	letterOptions),	// E
			Bodies.rectangle(centerX - 6*un,	centerY - 0.1*un,	3.4*un,	1*un,	letterOptions),
			Bodies.rectangle(centerX - 6.6*un,	centerY + 2.3*un,	4.4*un,	1*un,	letterOptions),
			Bodies.rectangle(centerX - 8.3*un,	centerY - 0.1*un,	1*un,	3.9*un,	letterOptions),

			// Bodies.fromVertices(centerX - 94, centerY + 12, Vertices.fromPath("0 0 0 0 0 205 35 205 35 57 0 0"), letterOptions),		// M
			// Bodies.fromVertices(centerX - 46, centerY - 32, Vertices.fromPath("0 0 41 0 111 113 111 180 0 0"), letterOptions),
			// Bodies.fromVertices(centerX + 47, centerY - 32, Vertices.fromPath("0 180 112 0 71 0 0 113 0 180"), letterOptions),
			// Bodies.fromVertices(centerX + 95, centerY + 12, Vertices.fromPath("35 0 0 56 0 205 35 205 35 0 35 0"), letterOptions),

			// Bodies.rectangle(centerX + 229, centerY - 2.5*un, 4.4*un, 1*un, letterOptions),	// E
			// Bodies.rectangle(centerX + 247, centerY - 4, 120, 1*un, letterOptions),
			// Bodies.rectangle(centerX + 229, centerY + 82, 4.4*un, 1*un, letterOptions),
			// Bodies.rectangle(centerX + 169, centerY - 4, 1*un, 135, letterOptions),

			// Bodies.rectangle(centerX + 375, centerY - 4, 1*un, 205, letterOptions),	// R
			// Bodies.rectangle(centerX + 435, centerY - 2.5*un, 85, 1*un, letterOptions),
			// Bodies.rectangle(centerX + 435, centerY - 4, 85, 1*un, letterOptions),
			// Bodies.rectangle(centerX + 495, centerY - 46, 1*un, 120, letterOptions),
			// Bodies.fromVertices(centerX + 466, centerY + 57, Vertices.fromPath("0 0 41 0 93 85 52 85"), letterOptions)
		];

		var initPos = [];
		for(var i = 0; i < letters.length; i++){
			initPos.push({
				x: letters[i].position.x,
				y: letters[i].position.y
			});
		}


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
		World.add(engine.world, walls);

		// run the engine
		Engine.run(engine);

		// run the renderer
		Render.run(render);

		var canvas = document.getElementsByTagName("canvas")[0];

		// Update the user position so that it doesn't jump from 0, 0
		var hasStarted = false;
		Events.on(mouseConstraint, "mousemove", function(event){
			if(!hasStarted){
				World.add(engine.world, user);				
				Body.setPosition(user, {
					x: mouseConstraint.mouse.position.x,
					y: mouseConstraint.mouse.position.y
				});
				hasStarted = true;
			}

			// console.log(canvas);

			// var dataURL = canvas.toDataURL();
			// var img = document.createElement("img");
			// img.src = dataURL;
			// console.log(img);
			// document.body.appendChild(img);

		});

		Events.on(engine, "tick", function(event){

			for(var i = 0; i < letters.length; i++){

				var dist = {
					x: initPos[i].x - letters[i].position.x,
					y: initPos[i].y - letters[i].position.y
				};
				// console.log(dist.x, dist.y);

				if(Math.abs(dist.x) > 5 || Math.abs(dist.y) > 5){
					// console.log("moving");
					var accel = 0.00001;
					// var accel = 0.001;
					var force = {
						x: dist.x * accel,
						y: dist.y * accel
					};

					Body.applyForce(
						letters[i],
						{x: letters[i].position.x, y: letters[i].position.y},
						{x: force.x, y: force.y}
					);
				}
				else{
					// console.log("static");
					if(Math.abs(letters[i].angle) % (2*(Math.PI)) > 0.05){
						// console.log("spinning");
						var angleDist = - (letters[i].angle)/100;
						Body.setAngularVelocity(letters[i], angleDist);
					}
				}
			}
		});
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