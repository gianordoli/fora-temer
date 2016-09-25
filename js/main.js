var app = app || {};

app.main = (function(){

	console.log('Loading app.');

	function dist(x1, y1, x2, y2){
		var angle = Math.atan2(y1 - y2, x1 - x2);
		var dist;
		if( (y1 - y2) == 0 ){
			dist = (x1 - x2) / Math.cos( angle );
		}else{
			dist = (y1 - y2) / Math.sin( angle );
		}
		return dist;
	};	

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

		var initPos = {
			x: centerX - 427,
			y: centerY - 89
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
			Bodies.fromVertices(centerX + 47, centerY - 32, Vertices.fromPath("0 180 112 0 71 0 0 113 0 180"), letterOptions),
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
			var distX = (initPos.x - letters[0].position.x)/100000;
			var distY = (initPos.y - letters[0].position.y)/100000;
			Body.applyForce(
				letters[0],
				{x: letters[0].position.x, y: letters[0].position.y},
				{x: distX, y: distY}
			);
			// Body.setPosition(letters[0], {x: initPos.x, y: initPos.y});
			// Body.setAngle(letters[0], Math.PI/4);
			// console.log(letters[0].angle % (2*(Math.PI)));
			// console.log(letters[0].angle);
			var angleDist = - (letters[0].angle)/1000000000;
			// Body.setAngle(letters[0], angleDist)
			Body.setAngularVelocity(letters[0], angleDist)
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