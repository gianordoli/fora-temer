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
			// Mouse = Matter.Mouse,
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
		    	background: "#FACADA"
		    }
		});
		// console.log(render);

		// add a mouse controlled constraint
        var mouseConstraint = MouseConstraint.create(engine, {
            element: render.canvas,
            constraint: {
            	render: {
            		visible: false
            	}
            }
        });
		engine.world.gravity.y = 0;

		var centerX = width/2;
		var centerY = height/2;
		var boxA = Bodies.rectangle(400, 200, 80, 80, { isStatic: false });
		Body.rotate(boxA, 30);
		var boxB = Bodies.rectangle(450, 300, 80, 80, { isStatic: false });

		var test = Vertices.fromPath("0 0 41 0 93 85 52 85");

		var letters = [
			Bodies.rectangle(centerX - 427, centerY - 89, 170, 35),	// T
			Bodies.rectangle(centerX - 427, centerY + 14, 35, 170),
			Bodies.rectangle(centerX - 230, centerY - 89, 155, 35),	// E
			Bodies.rectangle(centerX - 212, centerY - 4, 120, 35),
			Bodies.rectangle(centerX - 230, centerY + 82, 155, 35),
			Bodies.rectangle(centerX - 290, centerY - 4, 35, 135),

			Bodies.fromVertices(centerX - 94, centerY + 12, Vertices.fromPath("0 0 0 0 0 205 35 205 35 57 0 0")),		// M
			Bodies.fromVertices(centerX - 46, centerY - 32, Vertices.fromPath("0 0 41 0 111 113 111 180 0 0")),
			Bodies.fromVertices(centerX + 46, centerY - 32, Vertices.fromPath("0 180 112 0 71 0 0 113 0 180")),
			Bodies.fromVertices(centerX + 95, centerY + 12, Vertices.fromPath("35 0 0 56 0 205 35 205 35 0 35 0")),

			Bodies.rectangle(centerX + 229, centerY - 89, 155, 35),	// E
			Bodies.rectangle(centerX + 247, centerY - 4, 120, 35),
			Bodies.rectangle(centerX + 229, centerY + 82, 155, 35),
			Bodies.rectangle(centerX + 169, centerY - 4, 35, 135),

			Bodies.rectangle(centerX + 375, centerY - 4, 35, 205),	// R
			Bodies.rectangle(centerX + 435, centerY - 89, 85, 35),
			Bodies.rectangle(centerX + 435, centerY - 4, 85, 35),
			Bodies.rectangle(centerX + 495, centerY - 46, 35, 120),
			Bodies.fromVertices(centerX + 466, centerY + 57, Vertices.fromPath("0 0 41 0 93 85 52 85"))


		];

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
		World.add(engine.world, [boxA, boxB]);
		World.add(engine.world, walls);

		
		// console.log(mouseConstraint);
		// console.log(boxA);

		// FOLLOW MOUSE
		Events.on(mouseConstraint, "mousemove", function(event){
			Body.setPosition(boxA, mouseConstraint.constraint.pointA);
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