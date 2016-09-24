var app = app || {};

app.main = (function(){

	console.log('Loading app.');

	function matterSetup(){

		/*------------- MATTER OBJECTS -------------*/
		// Matter module aliases
		var Engine = Matter.Engine,
		    Render = Matter.Render,
		    World = Matter.World,
		    Bodies = Matter.Bodies,
			Events = Matter.Events,
			MouseConstraint = Matter.MouseConstraint,
			Mouse = Matter.Mouse
			;

		/*------------- WORLD SETUP -------------*/
		//Matter.js canvas
		var container = document.getElementById('canvas-container');
		console.log(container);

		// create an engine
		var engine = Engine.create();

		// create a renderer
		var render = Render.create({
		    element: container,
		    engine: engine,
		    options: {
		    	wireframes: false,
		    	showAngleIndicator: false
		    }
		});

		// add a mouse controlled constraint
        var mouseConstraint = MouseConstraint.create(engine, {
            element: render.canvas,
            constraint: {
            	render: {
            		visible: false
            	}
            }
        });
		World.add(engine.world, mouseConstraint);
		engine.world.gravity.y = 0;

		var boxA = Bodies.rectangle(400, 200, 80, 80, { isStatic: false });
		var boxB = Bodies.rectangle(450, 50, 80, 80, { isStatic: false });
		var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

		// add all of the bodies to the world
		World.add(engine.world, [boxA, boxB, ground]);

		
		// console.log(mouseConstraint);
		// console.log(boxA);

Events.on(mouseConstraint, "mousemove", function(event){
	// mouseConstraint.constraint.pointA = boxA.position;
	// mouseConstraint.constraint.pointB = boxA.position;
	console.log('A', mouseConstraint.constraint.pointA);
	console.log('B', mouseConstraint.constraint.pointB);
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