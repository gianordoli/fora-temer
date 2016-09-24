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
			Body = Matter.Body
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

		var boxA = Bodies.rectangle(400, 200, 80, 80, { isStatic: false });
		var boxB = Bodies.rectangle(450, 300, 80, 80, { isStatic: false });

		var wallWidth = 100;
		var walls = [
			Bodies.rectangle(-wallWidth, height/2, wallWidth, height, { isStatic: true }),
			Bodies.rectangle(width+wallWidth, height/2, wallWidth, height, { isStatic: true }),
			Bodies.rectangle(width/2, -wallWidth, width, wallWidth, { isStatic: true }),
			Bodies.rectangle(width/2, height+wallWidth, width, wallWidth, { isStatic: true })
		];
		// var ground = 

		// add all of the bodies to the world
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