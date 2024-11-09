// Создание сцены -----------------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 40, window.innerHeight - 40);
document.getElementById('game').appendChild(renderer.domElement);
//  -----------------------------------


// Создание геометрии -------------------------------
const geometry = new THREE.BoxGeometry(1., 1, 1);
const material = new THREE.MeshPhongMaterial({ color: '#1c06f9' });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 2;
scene.add(cube);

camera.position.z = 6;


// -------------------------------

// Создание освещения


const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

//хелпер с осями
//const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);



//----------------------------------------------------
//Движение и контроль камеры
const clock = new THREE.Clock();
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.screenSpacePanning = true;
controls.target.set(0, 1.1, 0);
camera.position.x = 2;
camera.position.z = 5;
camera.position.y = 2;


      
var loaderF = new THREE.FBXLoader();
const textureLoader = new THREE.TextureLoader();
			  

//Загрузка самолета и текстур
//https://discourse.threejs.org/t/i-have-to-apply-multiple-texture-in-loop-which-is-in-jpg-format-i-have-to-apply-it-on-fbx-or-obj-modal-i-created-modal-it-is-visible-but-texture-is-not-applied-into-it/21499
let img_normal = textureLoader.load("piper_refl.jpg");
let img_diffuse = textureLoader.load("piper_diffuse.jpg");
let img_bump = textureLoader.load("piper_bump.jpg");

loaderF.load("piper_pa18.fbx", function (fbx) {
	fbx.scale.set(.0022,.0022,.0022);
	fbx.traverse( function ( child ) {

		if ( child.isMesh ) {
			child.castShadow    = true;
			child.receiveShadow = true;
			if ( child.isMesh ) {
				child.material['map'] = img_diffuse;
				child.material['bumpMap'] = img_bump;
				child.material['normalMap'] = img_normal;
				child.material.needsUpdate = true;
			}
		}

		fbx.translateX(0.01);
		scene.add( fbx );

});




}, function (e) {
	//vm.progress(a.type + " " + a.id, e.loaded, e.total, a.id);

}, function (er) {
	console.log("Error loading animation")
	console.log(er.message)
});

//Лодка
const url = "boat.fbx";
loaderF.load(url, function (fbx) {
		fbx.scale.set(.0022,.0022,.0022);
		fbx.traverse( function ( child ) {

			if ( child.isMesh ) {
				child.castShadow    = true;
				child.receiveShadow = true;
			}

		} );


		//центрирование вращения лодки
		//https://stackoverflow.com/questions/28848863/threejs-how-to-rotate-around-objects-own-center-instead-of-world-center
		var box = new THREE.Box3().setFromObject( fbx );
		box.getCenter( fbx.position ); // this re-sets the mesh position
		fbx.position.multiplyScalar( - 1 );

		window.PIVOT  = new THREE.Group();
		scene.add( PIVOT );
		PIVOT.add( fbx );

	}, function (e) {
		//vm.progress(a.type + " " + a.id, e.loaded, e.total, a.id);

	}, function (er) {
		console.log("Error loading animation")
		console.log(er.message)
});


// Рендер сцены -----------------------------------


// создание анимации
const anim = () => {
	cube.rotation.y += 0.01;
	cube.rotation.x += 0.01;
	
	if (typeof PIVOT !== 'undefined') {
		PIVOT.rotation.y += 0.01;
		//FBX.rotation.x += 0.01;
	}

	const delta = clock.getDelta();
	controls.target.set(scene.position.x, scene.position.y + 1, scene.position.z);
	
	
	renderer.render(scene, camera);


	window.requestAnimationFrame(anim)

}
anim();
// ---------------------------------------------