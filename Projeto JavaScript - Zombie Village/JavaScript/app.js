//Variables for scenes, camera, lights, meshes and textures
var scene, camera, renderer, clock, camaraOrtografica, c;
var meshFloor, ambientLight, light;
var floorTexture, floorNormalMap, floorBumpMap;
var skyTexture;
var loadPavimento, texturaPavimento, pavimento;
var zombieAndarFrente = true;
var zombie2AndarFrente = true;
var zombie3AndarFrente = true;
var zombie4AndarFrente = true;
var zombie5AndarFrente = true;
var zombie6AndarFrente = true;
var loadTerra, texturaTerra, terra;
var loadEstacionamento, texturaEstacionamento, estacionamento;
var c = 0;
var posicaoZombie, posicaoZombie2, posicaoZombie3, posicaoZombie4, posicaoZombie5, posicaoZombie6, posicaoBala;
var nZombiesMortos = 0;
var velocidadeZombies = 0.02;

//Cena
scene = new THREE.Scene();

//Clock for animations
clock = new THREE.Clock();

//Loading Screen
var loadingScreen = { 
    scene: new THREE.Scene(), 
    camera: new THREE.PerspectiveCamera(90, 1600/920, 0.1, 1000), //1280/720       (window.innerHeight - 50)/(window.innerHeight - 50)
    box: tree = Arvore(),
    luzLoading: new THREE.AmbientLight(0xFFFFFF, 1)
};

var RESOURCES_LOADED = false;
var loadingManager = null;

//Ecrã de Vitória
var vitoria = new THREE.Scene();
var cameraVitoria = new THREE.PerspectiveCamera(90, 1600/920, 0.1, 1000);
var loadTexturaVitoria = new THREE.TextureLoader();
var texturaVitoria = loadTexturaVitoria.load('Textures/Fim.png');
var caixaVitoria = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 0.1),
    new THREE.MeshBasicMaterial({map: texturaVitoria})
);
var ambientVitoria = new THREE.AmbientLight(0xFFFFFF, 1);

//Camera Cinematica
var cameraCinematica = new THREE.PerspectiveCamera(90, 1600/920, 0.1, 1000);
cameraCinematica.position.set(0, 25, 0);

/*//Importar Zombie
function _LoadAnimatedModel(path, modelFile, animFile) {
    const loader = new THREE.FBXLoader();
    //loader.setPath('./3D Objects/');
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.01);
      fbx.position.set(2, 0, 4);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      //Animação
      const anim = new THREE.FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      scene.add(fbx);
    });
  }*/

//Zombies
var importer = new THREE.FBXLoader();
var mixerAnimacao, objetoImportado;
importer.load('./3D Objects/Walking.fbx', function(object){
      mixerAnimacao = new THREE.AnimationMixer(object);
      var action = mixerAnimacao.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.01;
      object.scale.y = 0.01; 
      object.scale.z = 0.01;  
      object.position.set(0, 0.1, 6);
  
      //Guardar o objeto importado na variável objetoImportado
      objetoImportado = object;
});

var mixerAnimacao2, zombieAndar;
importer.load('./3D Objects/Walking.fbx', function(object){
    mixerAnimacao2 = new THREE.AnimationMixer(object);
      var action = mixerAnimacao2.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.01;
      object.scale.y = 0.01; 
      object.scale.z = 0.01;   
      object.position.set(-6, 0.1, 0);
      object.rotation.set(0, -Math.PI/2, 0);
  
      zombieAndar = object;
});

var mixerAnimacao3, zombie3;
importer.load('./3D Objects/Walking.fbx', function(object){
    mixerAnimacao3 = new THREE.AnimationMixer(object);
      var action = mixerAnimacao3.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.01;
      object.scale.y = 0.01; 
      object.scale.z = 0.01;   
      object.position.set(-62, 0.1, -62);
      object.rotation.set(0, Math.PI/2, 0);
  
      zombie3 = object;
});

var mixerAnimacao4, zombie4;
importer.load('./3D Objects/Walking.fbx', function(object){
    mixerAnimacao4 = new THREE.AnimationMixer(object);
      var action = mixerAnimacao4.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.01;
      object.scale.y = 0.01; 
      object.scale.z = 0.01;   
      object.position.set(37, 0.1, 1);
      object.rotation.set(0, Math.PI, 0);
  
      zombie4 = object;
});

var mixerAnimacao5, zombie5;
importer.load('./3D Objects/Walking.fbx', function(object){
    mixerAnimacao5 = new THREE.AnimationMixer(object);
      var action = mixerAnimacao5.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.01;
      object.scale.y = 0.01; 
      object.scale.z = 0.01;   
      object.position.set(-62, 0.1, 37);
      object.rotation.set(0, Math.PI, 0);
  
      zombie5 = object;
});

var mixerAnimacao6, zombie6;
importer.load('./3D Objects/Walking.fbx', function(object){
    mixerAnimacao6 = new THREE.AnimationMixer(object);
      var action = mixerAnimacao6.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.01;
      object.scale.y = 0.01; 
      object.scale.z = 0.01;   
      object.position.set(18, 0.1, 62);
      object.rotation.set(0, -Math.PI/2, 0);
  
      zombie6 = object;
});

//Carros
var texturaCarroLoader = new THREE.TextureLoader();
var texturaCarro = texturaCarroLoader.load("Textures/Carro/carroTextura.png");
var carroPartido;
importer.load('./3D Objects/oldcarwreck.fbx', function(object){
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.map = texturaCarro;
            }
        });
      scene.add(object);
      object.scale.x = 0.04;
      object.scale.y = 0.04; 
      object.scale.z = 0.04;   
      object.position.set(44, -0.2, -25);
      object.rotation.set(0, Math.PI/4, 0);

      carroPartido = object;
});

var texturaCarro2 = texturaCarroLoader.load("Textures/Carro/carroTextura.png");
var carroPartido2;
importer.load('./3D Objects/oldcarwreck.fbx', function(object){
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.map = texturaCarro;
            }
        });
      scene.add(object);
      object.scale.x = 0.04;
      object.scale.y = 0.04; 
      object.scale.z = 0.04;   
      object.position.set(54, -0.2, -12);
      object.rotation.set(0, -Math.PI/2, 0);

      carroPartido2 = object;
});

//Gas Station
var gasStat;
var texturaStation = texturaCarroLoader.load("Textures/Carro/gasstation.png");
importer.load('./3D Objects/gas.fbx', function(object){
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.map = texturaStation;
            }
        });
      scene.add(object);
      object.scale.x = 0.011;
      object.scale.y = 0.011; 
      object.scale.z = 0.011;   
      object.position.set(12, -0.3, -4);
      object.rotation.set(0, 7 * Math.PI/4, 0);

      gasStat = object;
});

//Galinhas
var mixerAnimacaoGalinha, chicken;
importer.load('./3D Objects/Chicken.fbx', function(object){
    mixerAnimacaoGalinha = new THREE.AnimationMixer(object);
      var action = mixerAnimacaoGalinha.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.005;
      object.scale.y = 0.005; 
      object.scale.z = 0.005;   
      object.position.set(9, 0, 55);
  
      chicken = object;
});

var mixerAnimacaoGalinha2, chicken2;
importer.load('./3D Objects/Chicken.fbx', function(object){
    mixerAnimacaoGalinha2 = new THREE.AnimationMixer(object);
      var action = mixerAnimacaoGalinha2.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.005;
      object.scale.y = 0.005; 
      object.scale.z = 0.005;   
      object.position.set(7, 0, 57);
      object.rotation.y += Math.PI/4;
  
      chicken2 = object;
});

var mixerAnimacaoGalinha3, chicken3;
importer.load('./3D Objects/Chicken.fbx', function(object){
    mixerAnimacaoGalinha3 = new THREE.AnimationMixer(object);
      var action = mixerAnimacaoGalinha3.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.005;
      object.scale.y = 0.005; 
      object.scale.z = 0.005;   
      object.position.set(11, 0, 53);
      object.rotation.set(0, (6 * Math.PI)/4 ,0);
  
      chicken3 = object;
});

var mixerAnimacaoGalinha4, chicken4;
importer.load('./3D Objects/Chicken.fbx', function(object){
    mixerAnimacaoGalinha4 = new THREE.AnimationMixer(object);
      var action = mixerAnimacaoGalinha4.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child){
          if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(object);
      object.scale.x = 0.005;
      object.scale.y = 0.005; 
      object.scale.z = 0.005;   
      object.position.set(7, 0, 52);
      object.rotation.set(0, Math.PI, 0);
  
      chicken4 = object;
});

//Models
var models = {
    tent: {
        obj:"3D Objects/tent_detailedOpen.obj",
        mtl:"Textures/Tent/tent_detailedOpen.mtl",
        mesh:null
    },
    campfire: {
        obj:"3D Objects/Campfire_01.obj",
        mtl:"Textures/Campfire/Campfire_01.mtl",
        mesh:null
    }, 
    weapon:{
        obj:"3D Objects/blasterL.obj",
        mtl:"Textures/Weapon/blasterL.mtl",
        mesh:null,
        castShadow: false
    },
    rocketLauncherAmmo:{
        obj:"3D Objects/ammo_rocket.obj",
        mtl:"Textures/RocketLauncher/ammo_rocket.mtl",
        mesh:null
    },
    rotunda:{
        obj:"3D Objects/road_roundabout.obj",
        mtl:"Textures/Road/road_roundabout.mtl",
        mesh:null
    },
    rotundaBarreira:{
        obj:"3D Objects/road_roundaboutBarrier.obj",
        mtl:"Textures/Road/road_roundaboutBarrier.mtl",
        mesh:null
    },
    estradaReta:{
        obj:"3D Objects/road_straight.obj",
        mtl:"Textures/Road/road_straight.mtl",
        mesh:null
    },
    estradaRetaBarreira:{
        obj:"3D Objects/road_straightBarrier.obj",
        mtl:"Textures/Road/road_straightBarrier.mtl",
        mesh:null
    },
    casa1:{
        obj:"3D Objects/house_type01.obj",
        mtl:"Textures/Casas/house_type01.mtl",
        mesh:null
    },
    estradaIntersecao:{
        obj:"3D Objects/road_intersection.obj",
        mtl:"Textures/Road/road_intersection.mtl",
        mesh:null
    },
    estradaIntersecaoBarreira:{
        obj:"3D Objects/road_intersectionBarrier.obj",
        mtl:"Textures/Road/road_intersectionBarrier.mtl",
        mesh:null
    },
    estradaCurva:{
        obj:"3D Objects/road_bend.obj",
        mtl:"Textures/Road/road_bend.mtl",
        mesh:null
    },
    estradaCurvaBarreira:{
        obj:"3D Objects/road_bendBarrier.obj",
        mtl:"Textures/Road/road_bendBarrier.mtl",
        mesh:null
    },
    intersecao:{
        obj:"3D Objects/road_crossroad.obj",
        mtl:"Textures/Road/road_crossroad.mtl",
        mesh:null
    },
    intersecaoBarreira:{
        obj:"3D Objects/road_crossroadBarrier.obj",
        mtl:"Textures/Road/road_crossroadBarrier.mtl",
        mesh:null
    },
    rotunda2:{
        obj:"3D Objects/road_split.obj",
        mtl:"Textures/Road/road_split.mtl",
        mesh:null
    },
    rotunda2Barreira:{
        obj:"3D Objects/road_splitBarrier.obj",
        mtl:"Textures/Road/road_splitBarrier.mtl",
        mesh:null
    },
    ponte:{
        obj:"3D Objects/road_slantCurve.obj",
        mtl:"Textures/Road/road_slantCurve.mtl",
        mesh:null
    },
    ponteBarreira:{
        obj:"3D Objects/road_slantCurveBarrier.obj",
        mtl:"Textures/Road/road_slantCurveBarrier.mtl",
        mesh:null
    },
    casaGrande:{
        obj:"3D Objects/house_type06.obj",
        mtl:"Textures/Casas/house_type06.mtl",
        mesh:null
    },
    jardimCasaGrande:{
        obj:"3D Objects/fence_large.obj",
        mtl:"Textures/Casas/fence_large.mtl",
        mesh:null
    },
    sopa:{
        obj:"3D Objects/potStew.obj",
        mtl:"Textures/Campfire/potStew.mtl",
        mesh:null
    },
    flores:{
        obj:"3D Objects/flowers.obj",
        mtl:"Textures/Campfire/flowers.mtl",
        mesh:null
    },
    cova:{
        obj:"3D Objects/grave.obj",
        mtl:"Textures/Cova/grave.mtl",
        mesh:null
    },
    covaBorder:{
        obj:"3D Objects/graveBorder.obj",
        mtl:"Textures/Cova/graveBorder.mtl",
        mesh:null
    },
    cruz1:{
        obj:"3D Objects/gravestoneCross.obj",
        mtl:"Textures/Cova/gravestoneCross.mtl",
        mesh:null
    },
    cruz2:{
        obj:"3D Objects/cross.obj",
        mtl:"Textures/Cova/cross.mtl",
        mesh:null,
        receiveShadow: true
    },
    pa:{
        obj:"3D Objects/shovelDirt.obj",
        mtl:"Textures/Cova/shovelDirt.mtl",
        mesh:null
    },
    grades:{
        obj:"3D Objects/ironFence.obj",
        mtl:"Textures/Cova/ironFence.mtl",
        mesh:null
    },
    gradesEstragadas:{
        obj:"3D Objects/ironFenceDamaged.obj",
        mtl:"Textures/Cova/ironFenceDamaged.mtl",
        mesh:null
    },
    lanterna:{
        obj:"3D Objects/lanternGlass.obj",
        mtl:"Textures/Cova/lanternGlass.mtl",
        mesh:null
    },
    casa2:{
        obj:"3D Objects/house_type13.obj",
        mtl:"Textures/Casas/house_type13.mtl",
        mesh:null
    },
    casa3:{
        obj:"3D Objects/house_type20.obj",
        mtl:"Textures/Casas/house_type20.mtl",
        mesh:null
    }
};

var meshes = {};

//Bullets
var bullets = [];

//Logic
var keyboard = {};
var teclado = {};
var player = {height: 1.8, speed:0.32, turnSpeed: Math.PI * 0.05, canShoot: 0}
var USE_WIREFRAME = false;

/*---------------Tree---------------*/
function Arvore(){

    const arvore = new THREE.Group();

    const folhasLoader = new THREE.TextureLoader(loadingManager);
    var folhasTexture = folhasLoader.load("Textures/Cercas/leaves.jpg");
    const folhas = new THREE.Mesh(
        new THREE.SphereGeometry(1, 3, 3),
       new THREE.MeshLambertMaterial({map: folhasTexture})
    );

    folhas.position.y = 1.4;

    const cercaTexturaLoader = new THREE.TextureLoader(loadingManager);
    var texturaCerca = cercaTexturaLoader.load("Textures/Cercas/cerca.jpg");
    const tronco = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1,0.2,1),
        new THREE.MeshLambertMaterial({map: texturaCerca})
    );

    folhas.castShadow = true;
    folhas.receiveShadow = false;
    tronco.castShadow = true;
    tronco.receiveShadow = true;

    arvore.add(folhas);
    arvore.add(tronco);

    return arvore;
}
/*---------------Tree---------------*/

/*---------------Cerca---------------*/
function Cerca(){
    const cerca  = new THREE.Group();
    const cercaTexturaLoader = new THREE.TextureLoader(loadingManager);
    var texturaCerca = cercaTexturaLoader.load("Textures/Cercas/cerca.jpg");

    const tabuaVertical1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.02, 1),
        new THREE.MeshPhongMaterial({map: texturaCerca}) //0x9E5D14
    );
    tabuaVertical1.position.set(0, 0, 0);
    tabuaVertical1.rotation.set(Math.PI/2, 0, 0);
    const tabuaVertical2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.02, 1),
        new THREE.MeshPhongMaterial({map: texturaCerca})
    );
    tabuaVertical2.position.set(0.5, 0, 0);
    tabuaVertical2.rotation.set(Math.PI/2, 0, 0);
    const tabuaVertical3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.02, 1),
        new THREE.MeshPhongMaterial({map: texturaCerca})
    );
    tabuaVertical3.position.set(1, 0, 0);
    tabuaVertical3.rotation.set(Math.PI/2, 0, 0);
    const tabuaVertical4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.02, 1),
        new THREE.MeshPhongMaterial({map: texturaCerca })
    );
    tabuaVertical4.position.set(1.5, 0, 0);
    tabuaVertical4.rotation.set(Math.PI/2, 0, 0);
    const tabuaHorizontal1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.02, 1.6),
        new THREE.MeshPhongMaterial({map: texturaCerca})
    );
    tabuaHorizontal1.position.set(0.75, 0.13, -0.019);
    tabuaHorizontal1.rotation.set(Math.PI/2, Math.PI/2, 0);
    const tabuaHorizontal2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.02, 1.6),
        new THREE.MeshPhongMaterial({map: texturaCerca})
    );
    tabuaHorizontal2.position.set(0.75, 0.34, -0.019);
    tabuaHorizontal2.rotation.set(Math.PI/2, Math.PI/2, 0);

    cerca.add(tabuaVertical1);
    cerca.add(tabuaVertical2);
    cerca.add(tabuaVertical3);
    cerca.add(tabuaVertical4);
    cerca.add(tabuaHorizontal1);
    cerca.add(tabuaHorizontal2);
    return cerca;
}
/*---------------Cerca---------------*/

/*---------------Banco---------------*/
function Banco(){
    const banco = new THREE.Group();
    var loadTexturaBanco = new THREE.TextureLoader(loadingManager);
    var texturaBanco = loadTexturaBanco.load("Textures/Cercas/cerca.jpg");

    //Suporte Esquerdo
    const suporteEsquerdo = new THREE.Group();
    const paralelepipedo1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({color: 0xB3B3B3})
    );
    const paralelepipedo2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({color: 0xB3B3B3})
    );
    const paralelepipedo3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({color: 0xB3B3B3})
    );
    const paralelepipedo4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({color: 0xB3B3B3})
    );
    suporteEsquerdo.add(paralelepipedo1);
    suporteEsquerdo.add(paralelepipedo2);
    suporteEsquerdo.add(paralelepipedo3);
    suporteEsquerdo.add(paralelepipedo4);
    paralelepipedo1.position.set(0, 2, 0);
    paralelepipedo2.position.set(0 ,1.6 ,0);
    paralelepipedo3.position.set(0 ,1.9 ,0.5);
    paralelepipedo3.scale.set(1, 1, 1.7);
    paralelepipedo3.rotation.set(Math.PI/2,0 ,0 );
    paralelepipedo4.position.set(0 ,1.55 ,-0.5);
    paralelepipedo4.rotation.set(Math.PI/2,0 ,0 );
    //Suporte Direito
    const suporteDireito = new THREE.Group();
    const paralelepipedo5 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({color: 0xB3B3B3})
    );
    const paralelepipedo6 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({color: 0xB3B3B3})
    );
    const paralelepipedo7 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({color: 0xB3B3B3})
    );
    const paralelepipedo8 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({color: 0xB3B3B3})
    );
    suporteDireito.add(paralelepipedo5);
    suporteDireito.add(paralelepipedo6);
    suporteDireito.add(paralelepipedo7);
    suporteDireito.add(paralelepipedo8);
    paralelepipedo5.position.set(0, 2, 0);
    paralelepipedo6.position.set(0 ,1.6 ,0);
    paralelepipedo7.position.set(0 ,1.9 ,0.5);
    paralelepipedo7.scale.set(1, 1, 1.7);
    paralelepipedo7.rotation.set(Math.PI/2,0 ,0 );
    paralelepipedo8.position.set(0 ,1.55 ,-0.5);
    paralelepipedo8.rotation.set(Math.PI/2,0 ,0 );
    suporteDireito.position.set(2, 0, 0);
    //Base
    const base = new THREE.Group();
    const tabua1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({map: texturaBanco})
    );
    const tabua2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({map: texturaBanco})
    );
    const tabua3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({map: texturaBanco})
    );
    base.add(tabua1);
    base.add(tabua2);
    base.add(tabua3);
    tabua1.rotation.set(0, Math.PI / 2, 0);
    tabua1.scale.set(2.1, 0.4, 2.05);
    tabua1.position.set(1, 1.6, 0);
    tabua2.rotation.set(0, Math.PI / 2, 0);
    tabua2.scale.set(2.1, 0.4, 2.05);
    tabua2.position.set(1, 1.6, 0.3);
    tabua3.rotation.set(0, Math.PI / 2, 0);
    tabua3.scale.set(2.1, 0.4, 2.05);
    tabua3.position.set(1, 1.6, -0.3);
    base.position.set(0, 0, 0);
    //Encosto
    const encosto = new THREE.Group();
    const tabua4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({map: texturaBanco})
    );
    const tabua5 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({map: texturaBanco})
    );
    const tabua6 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({map: texturaBanco}) //0x9E5D14
    );
    encosto.add(tabua4);
    encosto.add(tabua5);
    encosto.add(tabua6);
    tabua4.rotation.set(0, Math.PI / 2, 0);
    tabua4.scale.set(2.1, 0.4, 2.05);
    tabua4.position.set(1, 1.6, 0);
    tabua5.rotation.set(0, Math.PI / 2, 0);
    tabua5.scale.set(2.1, 0.4, 2.05);
    tabua5.position.set(1, 1.6, 0.3);
    tabua6.rotation.set(0, Math.PI / 2, 0);
    tabua6.scale.set(2.1, 0.4, 2.05);
    tabua6.position.set(1, 1.6, -0.3);
    encosto.position.set(0, 2.2, -1.1);
    encosto.rotation.set(Math.PI/2, 0, 0);

    banco.add(suporteEsquerdo);
    banco.add(suporteDireito);
    banco.add(encosto);
    banco.add(base);
    return banco;
}
/*---------------Banco---------------*/

/*---------------Carro---------------*/
function Carro(){
    const carro = new THREE.Group();
    const carroTextureLoader = new THREE.TextureLoader(loadingManager);
    var texturaCarro= carroTextureLoader.load("Textures/Carro/carroMetal.jpg");
    var vidroCarro= carroTextureLoader.load("Textures/Carro/glass.jpg");

    //BasePreta
    const basePreta = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.5, 5.6),
        new THREE.MeshPhongMaterial({color: 0x424140})
    );
    basePreta.position.set(0, 1, 0.7);
    const baseRosa = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.4, 1.6),
        new THREE.MeshPhongMaterial({map: texturaCarro})
    );
    baseRosa.position.set(0, 1.4, -1.2);
    const baseRosaMeio = new THREE.Mesh(
        new THREE.BoxGeometry(1.75, 1.6, 1.95),
        new THREE.MeshPhongMaterial({map: texturaCarro}) //0x8B8A89
    );
    baseRosaMeio.position.set(0, 1.7, 0);
    const traseira1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.4, 3.1),
        new THREE.MeshPhongMaterial({map: texturaCarro})
    );
    traseira1.position.set(0.8, 1.4, 1.948);
    const traseira2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.4, 3.1),
        new THREE.MeshPhongMaterial({map: texturaCarro})
    );
    traseira2.position.set(-0.8, 1.4, 1.948);
    const traseira3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.4, 1.4),
        new THREE.MeshPhongMaterial({map: texturaCarro})
    );
    traseira3.position.set(0, 1.4, 3.348);
    traseira3.rotation.set(0, Math.PI/2, 0);
    const farol1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.37, 1.4),
        new THREE.MeshPhongMaterial({color: 0xEAED98})
    );
    farol1.position.set(0.74, 1.4, -1.35);
    const farol2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.37, 1.4),
        new THREE.MeshPhongMaterial({color: 0xEAED98})
    );
    farol2.position.set(-0.74, 1.4, -1.35);
    const radiador = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.15, 0.5),
        new THREE.MeshPhongMaterial({color: 0x424140})
    );
    radiador.position.set(0, 1.3, -1.8);
    const retrovisor1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.15, 0.2),
        new THREE.MeshPhongMaterial({color: 0x8B8A89})
    );
    retrovisor1.position.set(0.9, 1.55, -0.8);
    const retrovisor2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.15, 0.2),
        new THREE.MeshPhongMaterial({color: 0x8B8A89})
    );
    retrovisor2.position.set(-0.9, 1.55, -0.8);
    const rodaTraseira = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 2.4, 30),
        new THREE.MeshPhongMaterial({color: 0xFFFFFF})
    );
    rodaTraseira.position.set(0, 1, -1.2);
    rodaTraseira.rotation.set(Math.PI/2, 0, Math.PI/2);
    const rodaDianteira = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 2.4, 30),
        new THREE.MeshPhongMaterial({color: 0xFFFFFF})
    );
    rodaDianteira.position.set(0, 1, 2.3);
    rodaDianteira.rotation.set(Math.PI/2, 0, Math.PI/2);
    const pneu1 = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.15, 30, 100),
        new THREE.MeshPhongMaterial({color: 0x000000})
    );
    pneu1.position.set(1.1, 0.97, -1.19);
    pneu1.rotation.set(0, Math.PI/2,0);
    const pneu2 = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.15, 30, 100),
        new THREE.MeshPhongMaterial({color: 0x000000})
    );
    pneu2.position.set(-1.1, 0.97, -1.19);
    pneu2.rotation.set(0, Math.PI/2,0);
    const pneu3 = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.15, 30, 100),
        new THREE.MeshPhongMaterial({color: 0x000000})
    );
    pneu3.position.set(1.1, 0.97, 2.3);
    pneu3.rotation.set(0, Math.PI/2,0);
    const pneu4 = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.15, 30, 100),
        new THREE.MeshPhongMaterial({color: 0x000000})
    );
    pneu4.position.set(-1.1, 0.97, 2.3);
    pneu4.rotation.set(0, Math.PI/2,0);
    const paraBrisas = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.8, 0.1),
        new THREE.MeshPhongMaterial({map: vidroCarro})
    );
    paraBrisas.position.set(0, 1.95, -0.96);
    const vidro1 = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.65, 0.1),
        new THREE.MeshPhongMaterial({map: vidroCarro})
    );
    vidro1.position.set(0.86, 2, 0);
    vidro1.rotation.set(0, Math.PI / 2, 0);
    const vidro2 = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.65, 0.1),
        new THREE.MeshPhongMaterial({map:vidroCarro})
    );
    vidro2.position.set(-0.86, 2, 0);
    vidro2.rotation.set(0, Math.PI / 2, 0);
    const retrovisorVidro1 = new THREE.Mesh(
        new THREE.PlaneGeometry(0.18, 0.1, 10, 10),
        new THREE.MeshPhongMaterial({map:vidroCarro})
    );
    retrovisorVidro1.position.set(-1, 1.55, -0.69);
    const retrovisorVidro2 = new THREE.Mesh(
        new THREE.PlaneGeometry(0.18, 0.1, 10, 10),
        new THREE.MeshPhongMaterial({map:vidroCarro})
    );
    retrovisorVidro2.position.set(1, 1.55, -0.69);
    const farolTras1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.3, 0.3),
        new THREE.MeshPhongMaterial({color: 0xFF0000})
    );
    farolTras1.position.set(-0.74, 1.415, 3.35);
    const farolTras2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.3, 0.3),
        new THREE.MeshPhongMaterial({color: 0xFF0000})
    );
    farolTras2.position.set(0.74, 1.415, 3.35);

    const targetFarol1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.001, 0.001, 0.001),
        new THREE.MeshBasicMaterial({color: 0xffffff})
    );
    farol1.add(targetFarol1);
    targetFarol1.position.set(0, 0, -2);

    const targetFarol2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.001, 0.001, 0.001),
        new THREE.MeshBasicMaterial({color: 0xffffff})
    );
    farol2.add(targetFarol2);
    targetFarol2.position.set(0, 0, -2);

    const farolLuz1 = new THREE.SpotLight(0xFFFFFF, 2, 18, Math.PI/5);
    farolLuz1.castShadow = true;
    farolLuz1.target = targetFarol1;

    const farolLuz2 = new THREE.SpotLight(0xFFFFFF, 2, 18, Math.PI/5);
    farolLuz2.castShadow = true;
    farolLuz2.target = targetFarol2;
    
    carro.add(farolTras2)
    carro.add(farolTras1);
    carro.add(retrovisorVidro1);
    carro.add(retrovisorVidro2);
    carro.add(vidro1);
    carro.add(vidro2);
    carro.add(paraBrisas);
    carro.add(pneu1);
    carro.add(pneu2);
    carro.add(pneu3);
    carro.add(pneu4);
    carro.add(rodaDianteira);
    carro.add(rodaTraseira);
    carro.add(retrovisor1);
    carro.add(retrovisor2);
    carro.add(radiador);
    carro.add(farol1);
    farol1.add(farolLuz1);
    farol2.add(farolLuz2);
    carro.add(farol2);
    carro.add(traseira1);
    carro.add(traseira2);
    carro.add(traseira3);
    carro.add(baseRosaMeio);
    carro.add(baseRosa);
    carro.add(basePreta);

    farolLuz1.position.set(0, 0, 0.2);
    farolLuz2.position.set(0, 0, 0.2);
    return carro;
}
/*---------------Carro---------------*/

/*---------------Cenoura---------------*/
function Cenoura(){
    const texturaCenouraLoader = new THREE.TextureLoader(loadingManager);
    var texturaCenoura;
    texturaCenoura = texturaCenouraLoader.load("Textures/Crops/cenouraTextura.jpg");
    const cenoura = new THREE.Group();
    const base = new THREE.Mesh(
        new THREE.ConeGeometry(0.7, 5, 50),
        new THREE.MeshPhongMaterial({map:texturaCenoura })
    );
    base.rotation.set(Math.PI, 0, 0);
    const baseRedonda = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 30, 30, 0, 2 * Math.PI, Math.PI/2, Math.PI/2),
        new THREE.MeshPhongMaterial({map: texturaCenoura}) //0xE35D11
    );
    baseRedonda.position.set(0, 2.5, 0);
    baseRedonda.rotation.set(Math.PI, 0, 0);
    const folha1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 1, 0.2),
        new THREE.MeshPhongMaterial({color: 0x16AF1B})
    );
    folha1.position.set(0, 3.5, 0);
    const folha2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 1, 0.2),
        new THREE.MeshPhongMaterial({color: 0x16AF1B})
    );
    folha2.position.set(-0.3, 4.2, 0);
    folha2.rotation.set(0, 0, Math.PI/4);
    const folha3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 1, 0.2),
        new THREE.MeshPhongMaterial({color: 0x16AF1B})
    );
    folha3.position.set(0.3, 4.2, 0);
    folha3.rotation.set(0, 0, -Math.PI/4);

    cenoura.add(folha3);
    cenoura.add(folha1);
    cenoura.add(folha2);
    cenoura.add(baseRedonda);
    cenoura.add(base); 
    return cenoura;
}
/*---------------Cenoura---------------*/

/*---------------Vaso---------------*/
function Vaso(){
    const vaso = new THREE.Group();
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.6, 2),
        new THREE.MeshPhongMaterial({color: 0xFFFFFF})
    );
    const terra = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.1, 1.8),
        new THREE.MeshPhongMaterial({color: 0x743B06})
    );
    terra.position.set(0, 0.27, 0);

    var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("Textures/Campfire/flowers.mtl", function(materials){
		
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		
		objLoader.load("3D Objects/flowers.obj", function(mesh){
		
			mesh.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
			vaso.add(mesh);
            mesh.position.set(0, 0.2, 0);
		});
	});

    vaso.add(terra);
    vaso.add(box);
    return vaso;
}
/*---------------Vaso---------------*/

/*---------------Cruz---------------*/
function Cruz(){
    const cruz  = new THREE.Group();
    const cercaTexturaLoader = new THREE.TextureLoader(loadingManager);
    var texturaCerca = cercaTexturaLoader.load("Textures/Cercas/cerca.jpg");

    const tabuaVertical = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.02, 1.7),
        new THREE.MeshPhongMaterial({map: texturaCerca}) //0x9E5D14
    );
    tabuaVertical.position.set(0, 0, 0);
    const tabuaHorizontal = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.02, 1.6),
        new THREE.MeshPhongMaterial({map: texturaCerca})
    );
    tabuaHorizontal.position.set(0, 0.02, -0.35);
    tabuaHorizontal.rotation.set(0, Math.PI/2, 0);

    cruz.add(tabuaVertical);
    cruz.add(tabuaHorizontal);
    return cruz;
}
/*---------------Cruz---------------*/

//Sound Effects (SFX)
var listenerSFX = new THREE.AudioListener();
var sfx1 = new THREE.Audio(listenerSFX);

var sfxLoader = new THREE.AudioLoader();
sfxLoader.load( 'Music/laser1.ogg', function( buffer ) {
sfx1.setBuffer( buffer );
sfx1.setLoop( false );
sfx1.setVolume( 0.5 );
});

function Start(){
    c = 0;
    zombieAndarFrente = true;
    zombie2AndarFrente = true;
    zombie3AndarFrente = true;
    zombie4AndarFrente = true;
    zombie5AndarFrente = true;

    //Skybox
    var skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    var skyboxMaterials = [
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("Textures/Skybox/front.bmp"), side:THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("Textures/Skybox/back.bmp"), side:THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("Textures/Skybox/up.bmp"), side:THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("Textures/Skybox/bottom.bmp"), side:THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("Textures/Skybox/right.bmp"), side:THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("Textures/Skybox/left.bmp"), side:THREE.DoubleSide} )
    ];

    var skyboxMaterial = new THREE.MeshFaceMaterial(skyboxMaterials);
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);
    
    //Camera
    camera = new THREE.PerspectiveCamera(90, 1600/920, 0.1, 1000); //1280/720
    camaraOrtografica = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.1, 1000); 
    camaraOrtografica.position.set(0, 10, 0);
    camaraOrtografica.rotation.set(-Math.PI/2, 0, 0);
    
    //Loading Screen
    loadingScreen.box.position.set(0, 0, 5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);
    loadingScreen.scene.add(loadingScreen.luzLoading);
    
    caixaVitoria.position.set(0, 0, 5);
    cameraVitoria.lookAt(caixaVitoria.position);
    vitoria.add(caixaVitoria);
    vitoria.add(ambientVitoria);

    loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = function(item, loaded, total){
        console.log(item, loaded, total);
    }
    loadingManager.onLoad = function(){
        console.log("Loaded all resources");
        RESOURCES_LOADED = true;
        onResourcesLoaded();
    }

    //Floor
    var textLoadFloor = new THREE.TextureLoader(loadingManager);
    floorTexture = textLoadFloor.load("Textures/Floor/grass.png");
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(20, 20);
    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500, 10, 10),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map:floorTexture,
        })
    );
    meshFloor.rotation.x += (3 * Math.PI) / 2; //270º
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    //Music
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio( listener );

    const audioLoader = new THREE.AudioLoader(loadingManager);
    audioLoader.load( 'Music/puipui3.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
    });

    //Lights
    ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    light = new THREE.PointLight(0xffffff, 0.8, 18);
    light.position.set(6, 5, -3);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);

    luzLanterna = new THREE.PointLight(0xFFFFFF, 3, 18);
    luzLanterna.position.set(49.6, 0.65, -54.5);
    luzLanterna.castShadow = true;
    luzLanterna.shadow.camera.near = 0.1;
    luzLanterna.shadow.camera.far = 25;
    scene.add(luzLanterna);

    //Load multiple models
    for( var _key in models ){
		(function(key){
			var mtlLoader = new THREE.MTLLoader(loadingManager);
			mtlLoader.load(models[key].mtl, function(materials){
				materials.preload();

				var objLoader = new THREE.OBJLoader(loadingManager);
				objLoader.setMaterials(materials);
				objLoader.load(models[key].obj, function(mesh){
					
					mesh.traverse(function(node){
						if( node instanceof THREE.Mesh ){
                            if('castShadow' in models[key])
							node.castShadow = models[key].castShadow;
                            else
                            node.castShadow = true;

                            if('receiveShadow' in models[key])
							node.receiveShadow = models[key].receiveShadow;
                            else
							node.receiveShadow = true;
						}
					});
					models[key].mesh = mesh;
					
				});
			});
			
		})(_key);
	}

    //Trees
    var i, randX, randZ;
    for(i = 0; i < 7; i++){
        randX = THREE.Math.randInt(-12, -22);
        randZ = THREE.Math.randInt(37, 44);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0.3, randZ);
    }
    for(var i = 0; i < 20; i++){
        randX = THREE.Math.randInt(-7, -57);
        randZ = THREE.Math.randInt(-7, -57);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0.3, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }
    for(var i = 0; i < 50; i++){
        randX = THREE.Math.randInt(70, 250);
        randZ = THREE.Math.randInt(-250, 250);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }
    for(var i = 0; i < 50; i++){
        randX = THREE.Math.randInt(-70, -250);
        randZ = THREE.Math.randInt(-250, 250);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }
    for(var i = 0; i < 10; i++){
        randX = THREE.Math.randInt(-70, 70);
        randZ = THREE.Math.randInt(-70, -250);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }
    for(var i = 0; i < 10; i++){
        randX = THREE.Math.randInt(-70, 70);
        randZ = THREE.Math.randInt(70, 250);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }

    //Vasos
    var vaso = new Vaso();
    scene.add(vaso);
    vaso.position.set(-49.5, 0.2, 18);
    vaso.scale.set(3, 3.5, 2);
    vaso.rotation.set(0, Math.PI/2, 0);
    var vaso = new Vaso();
    scene.add(vaso);
    vaso.position.set(-44.5, 0.2, 18);
    vaso.scale.set(3, 3.5, 2);
    vaso.rotation.set(0, Math.PI/2, 0);
    var vaso = new Vaso();
    scene.add(vaso);
    vaso.position.set(-54.5, 0.2, 18);
    vaso.scale.set(3, 3.5, 2);
    vaso.rotation.set(0, Math.PI/2, 0);

    //Cenouras
    for(var i = 5; i <= 31; i++){
        var cenoura = Cenoura();
        scene.add(cenoura);
        cenoura.position.set(i, 0, -57.5);
        cenoura.scale.set(0.2, 0.2, 0.2);

        var cenoura = Cenoura();
        scene.add(cenoura);
        cenoura.position.set(i, 0, -55.5);
        cenoura.scale.set(0.2, 0.2, 0.2);

        var cenoura = Cenoura();
        scene.add(cenoura);
        cenoura.position.set(i, 0, -53.5);
        cenoura.scale.set(0.2, 0.2, 0.2);

        var cenoura = Cenoura();
        scene.add(cenoura);
        cenoura.position.set(i, 0, -51.5);
        cenoura.scale.set(0.2, 0.2, 0.2);

        var cenoura = Cenoura();
        scene.add(cenoura);
        cenoura.position.set(i, 0, -49.5);
        cenoura.scale.set(0.2, 0.2, 0.2);

        var cenoura = Cenoura();
        scene.add(cenoura);
        cenoura.position.set(i, 0, -47.5);
        cenoura.scale.set(0.2, 0.2, 0.2);

        var cenoura = Cenoura();
        scene.add(cenoura);
        cenoura.position.set(i, 0, -45.5);
        cenoura.scale.set(0.2, 0.2, 0.2);

        var cenoura = Cenoura();
        scene.add(cenoura);
        cenoura.position.set(i, 0, -43.5);
        cenoura.scale.set(0.2, 0.2, 0.2);

        var cenoura = Cenoura();
        scene.add(cenoura);
        cenoura.position.set(i, 0, -41.5);
        cenoura.scale.set(0.2, 0.2, 0.2);
    }
    
    //Bancos
    var banco = Banco();
    scene.add(banco);
    banco.position.set(-52.5, -1.5, 26);
    banco.scale.set(1.6, 1.6, 1.6);
    var banco = Banco();
    scene.add(banco);
    banco.position.set(-49.25, -1.5, 26);
    banco.scale.set(1.6, 1.6, 1.6);
    var banco = Banco();
    scene.add(banco);
    banco.position.set(-46.25, -1.5, 9.5);
    banco.scale.set(1.6, 1.6, 1.6);
    banco.rotation.set(0, Math.PI, 0);
    var banco = Banco();
    scene.add(banco);
    banco.position.set(-49.5, -1.5, 9.5);
    banco.scale.set(1.6, 1.6, 1.6);
    banco.rotation.set(0, Math.PI, 0);

    //Carro
    var car = Carro();
    scene.add(car);
    car.position.set(15, -0.3, 0);
    car.scale.set(0.95, 0.95, 0.95);
    car.rotation.set(0, -Math.PI/2, 0);

    //Cerca
    for(var i = 20; i <= 60; i = i + 4.5){
        var cerca = Cerca();
        scene.add(cerca);
        cerca.scale.set(3, 8, 3);
        cerca.position.set(-i, 0, -5);
    }
    var cerca2 = Cerca();
    scene.add(cerca2);
    cerca2.scale.set(3, 8, 3);
    cerca2.position.set(-57.5, 0, -5);
    for(var i = 9.65; i <= 55; i = i + 4.5){
        var cerca3 = Cerca();
        scene.add(cerca3);
        cerca3.scale.set(3, 8, 3);
        cerca3.position.set(-57.65, 0, -i);
        cerca3.rotation.set(0, -Math.PI/2, 0);
    }
    var cerca4 = Cerca();
    scene.add(cerca4);
    cerca4.scale.set(3, 8, 3);
    cerca4.position.set(-57.65, 0, -57.7);
    cerca4.rotation.set(0, -Math.PI/2, 0);
    for(var i = 5; i <= 50; i = i + 4.5){
        var cerca5 = Cerca();
        scene.add(cerca5);
        cerca5.scale.set(3, 8, 3);
        cerca5.position.set(-i, 0, -57.85);
        cerca5.rotation.set(0, Math.PI, 0);
    }
    var cerca6 = Cerca();
    scene.add(cerca6);
    cerca6.scale.set(3, 8, 3);
    cerca6.position.set(-53, 0, -57.85);
    cerca6.rotation.set(0, Math.PI, 0);
    for(var i = 17.2; i <= 50; i = i + 4.5){
        var cerca7 = Cerca();
        scene.add(cerca7);
        cerca7.scale.set(3, 8, 3);
        cerca7.position.set(-4.82, 0, -i);
        cerca7.rotation.set(0, Math.PI/2, 0);
    }
    var cerca8 = Cerca();
    scene.add(cerca8);
    cerca8.scale.set(3, 8, 3);
    cerca8.position.set(-4.82, 0, -53.2);
    cerca8.rotation.set(0, Math.PI/2, 0);

    //Cruzes
    var cruz = Cruz();
    scene.add(cruz);
    cruz.rotation.set(Math.PI/2, 0, 0);
    cruz.position.set(44.6, 0.9, -56.5);
    cruz.scale.set(1.25, 4, 1);

    var cruz = Cruz();
    scene.add(cruz);
    cruz.rotation.set(Math.PI/2, 0, 0); 
    cruz.position.set(54.6, 0.9, -56.5);
    cruz.scale.set(1.25, 4, 1);

    var cruz = Cruz();
    scene.add(cruz);
    cruz.rotation.set(Math.PI/2, 0, 0);
    cruz.position.set(49.6, 0.9, -47.5);
    cruz.scale.set(1.25, 4, 1);

    //Cerca Campo Cenouras
    for(var i = 4.75; i < 30; i += 4.4){
        var cercaCenouras = new Cerca();
        cercaCenouras.rotation.set(0, Math.PI, 0);
        cercaCenouras.position.set(i + 4.4, 0, -58);
        cercaCenouras.scale.set(3, 8, 3);
        scene.add(cercaCenouras); 

        var cercaCenouras = new Cerca();
        cercaCenouras.position.set(i, 0, -41);
        cercaCenouras.scale.set(3, 8, 3);
        scene.add(cercaCenouras);  
    }
    
    for(var i = 57.7; i > 45; i -= 4.5){
        var cercaCenouras = new Cerca();
        cercaCenouras.position.set(4.8, 0, -i);
        cercaCenouras.scale.set(3, 8, 3);
        cercaCenouras.rotation.set(0, -Math.PI/2, 0);
        scene.add(cercaCenouras); 

        var cercaCenouras = new Cerca();
        cercaCenouras.position.set(31.3, 0, -i + 4.5);
        cercaCenouras.scale.set(3, 8, 3);
        cercaCenouras.rotation.set(0, Math.PI/2, 0);
        scene.add(cercaCenouras); 
    }
    var cercaCenouras = new Cerca();
    cercaCenouras.position.set(31.3, 0, -i + 3);
    cercaCenouras.scale.set(3, 8, 3);
    cercaCenouras.rotation.set(0, Math.PI/2, 0);
    scene.add(cercaCenouras);

    var cercaCenouras = new Cerca();
    cercaCenouras.position.set(4.8, 0, -i - 1.5);
    cercaCenouras.scale.set(3, 8, 3);
    cercaCenouras.rotation.set(0, -Math.PI/2, 0);
    scene.add(cercaCenouras);  

    //Cercas Galinhas
    var cercaGalinhas = new Cerca();
    cercaGalinhas.position.set(4.65, 0, 50.1);
    cercaGalinhas.scale.set(5.2, 8, 3);
    cercaGalinhas.rotation.set(0, -Math.PI/2, 0);
    scene.add(cercaGalinhas);  

    var cercaGalinhas = new Cerca();
    cercaGalinhas.position.set(13.3, 0, 57.85);
    cercaGalinhas.scale.set(5.2, 8, 3);
    cercaGalinhas.rotation.set(0, Math.PI/2, 0);
    scene.add(cercaGalinhas);  

    var cercaGalinhas = new Cerca();
    cercaGalinhas.position.set(5.1, 0, 58.3);
    cercaGalinhas.scale.set(5.2, 8, 3);
    scene.add(cercaGalinhas); 

    var cercaGalinhas = new Cerca();
    cercaGalinhas.position.set(12.9, 0, 49.6);
    cercaGalinhas.scale.set(5.2, 8, 3);
    cercaGalinhas.rotation.set(0, Math.PI, 0);
    scene.add(cercaGalinhas); 

    //Cameras
    camera.position.set(0,player.height,-5);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));

    //Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1600, 920); //1280/720      window.innerWidth - 50, window.innerHeight - 50
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    //Pavimento
    loadPavimento = new THREE.TextureLoader(loadingManager);
    texturaPavimento = loadPavimento.load("Textures/Floor/pavimento.jpg");
    pavimento = new THREE.Mesh(
        new THREE.PlaneGeometry(18.9, 27.9, 10, 10),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map:texturaPavimento,
        })
    );
    pavimento.rotation.x += (3 * Math.PI) / 2; //270º
    pavimento.receiveShadow = true;
    pavimento.position.set(-49.9, 0.1, 17.6);
    scene.add(pavimento);

    //Terra Cenouras
    loadTerra = new THREE.TextureLoader(loadingManager);
    texturaTerra = loadTerra.load("Textures/Floor/floorTexture2.jpg");
    terra = new THREE.Mesh(
        new THREE.PlaneGeometry(27.5, 18.15, 10, 10),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map:texturaTerra,
        })
    );
    terra.rotation.x += (3 * Math.PI) / 2; //270º
    terra.receiveShadow = true;
    terra.position.set(18, 0.5, -49.5);
    scene.add(terra);

    //Chão Bomba de Gasolina
    var chaoGasolina = new THREE.Mesh(
        new THREE.PlaneGeometry(13, 17.2, 10, 10),
        new THREE.MeshPhongMaterial({
            color: 0xa5a5a5,
        })
    );
    chaoGasolina.position.set(12, 0.01, -12);
    chaoGasolina.receiveShadow = true;
    chaoGasolina.rotation.x += (3 * Math.PI) / 2; //270º
    chaoGasolina.rotation.z += Math.PI/4;
    scene.add(chaoGasolina);

    //Estacionamento
    loadEstacionamento = new THREE.TextureLoader(loadingManager);
    texturaEstacionamento = loadEstacionamento.load("Textures/Floor/estacionamento.png");
    estacionamento = new THREE.Mesh(
        new THREE.PlaneGeometry(27, 18.15, 10, 10),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map:texturaEstacionamento,
        })
    );
    estacionamento.rotation.x += (3 * Math.PI) / 2; //270º
    estacionamento.rotation.z = Math.PI/2;
    estacionamento.receiveShadow = true;
    estacionamento.position.set(49.5, 0.1, -18);
    scene.add(estacionamento);

    //Controls
    controls = new THREE.PointerLockControls(camera, renderer.domElement);

    document.body.appendChild(renderer.domElement);
    Update();
}

//MouseClick event
var isClicked = 0;
document.addEventListener('mousedown', ev =>{
    if(player.canShoot <= 0){
        isClicked = 1;
    }
    
    controls.lock();
});

//Runs when all resources are loaded
function onResourcesLoaded(){
    meshes["tent1"] = models.tent.mesh.clone();
    meshes["tent2"] = models.tent.mesh.clone();
    meshes["tent3"] = models.tent.mesh.clone();
    meshes["tent4"] = models.tent.mesh.clone();
    meshes["campfire1"] = models.campfire.mesh.clone();

    meshes["tent1"].position.set(-20, 0, -30);
    meshes["tent1"].rotation.y += Math.PI/4;
    meshes["tent1"].scale.set(9, 9 ,9);
    scene.add(meshes["tent1"]);

    meshes["tent2"].position.set(-35, 0, -15);
    meshes["tent2"].rotation.y += Math.PI / 3;
    meshes["tent2"].scale.set(9, 9, 9);
    scene.add(meshes["tent2"]);

    meshes["tent3"].position.set(-15, 0, -45);
    meshes["tent3"].scale.set(9, 9, 9);
    scene.add(meshes["tent3"]);

    meshes["tent4"].position.set(-40, 0, -35);
    meshes["tent4"].rotation.y += (2 * Math.PI ) / 6;
    meshes["tent4"].scale.set(9, 9, 9);
    scene.add(meshes["tent4"]);

    meshes["campfire1"].position.set(-29, 0.1, -25);
    meshes["campfire1"].scale.set(2, 2, 2);
    scene.add(meshes["campfire1"]);
    
    //Player Weapon
    meshes["weapon"] = models.weapon.mesh.clone();
    meshes["weapon"].position.set(0, 0.1, 0);
    meshes["weapon"].scale.set(1, 1, 1);
    scene.add(meshes["weapon"]);

    meshes["rotunda"] = models.rotunda.mesh.clone();
    meshes["rotunda"].position.set(0, 0, 0);
    meshes["rotunda"].scale.set(9, 9, 9);
    scene.add(meshes["rotunda"]);

    meshes["rotundaBarreira"] = models.rotundaBarreira.mesh.clone();
    meshes["rotundaBarreira"].position.set(0, 0, 0);
    meshes["rotundaBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["rotundaBarreira"]);

    //Estrada Reta Interior
    for(var i = 18; i <= 54; i = i + 9){
        if(i == 36){
            
        }
        else{
            meshes["estradaReta"] = models.estradaReta.mesh.clone();
            meshes["estradaReta"].position.set(i, 0, 0);
            meshes["estradaReta"].scale.set(9, 9, 9);
            scene.add(meshes["estradaReta"]);
    
            meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
            meshes["estradaRetaBarreira"].position.set(i, 0, 0);
            meshes["estradaRetaBarreira"].rotation.set(0, Math.PI/2, 0);
            meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
            scene.add(meshes["estradaRetaBarreira"]);
    
            meshes["estradaReta"] = models.estradaReta.mesh.clone();
            meshes["estradaReta"].position.set(-i, 0, 0);
            meshes["estradaReta"].scale.set(9, 9, 9);
            scene.add(meshes["estradaReta"]);
    
            meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
            meshes["estradaRetaBarreira"].position.set(-i, 0, 0);
            meshes["estradaRetaBarreira"].rotation.set(0, Math.PI/2, 0);
            meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
            scene.add(meshes["estradaRetaBarreira"]);
            if(i == 45){
                meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
                meshes["estradaIntersecao"].position.set(0, 0, i);
                meshes["estradaIntersecao"].scale.set(9, 9, 9);
                meshes["estradaIntersecao"].rotation.set(0, Math.PI/2, 0);
                scene.add(meshes["estradaIntersecao"]);
        
                meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
                meshes["estradaIntersecaoBarreira"].position.set(0, 0, i);
                meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
                meshes["estradaIntersecaoBarreira"].rotation.set(0, Math.PI/2, 0);
                scene.add(meshes["estradaIntersecaoBarreira"]);

                meshes["estradaReta"] = models.estradaReta.mesh.clone();
                meshes["estradaReta"].position.set(0, 0, -i);
                meshes["estradaReta"].scale.set(9, 9, 9);
                meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
                scene.add(meshes["estradaReta"]);
        
                meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
                meshes["estradaRetaBarreira"].position.set(0, 0, -i);
                meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
                scene.add(meshes["estradaRetaBarreira"]);
            }else{
                meshes["estradaReta"] = models.estradaReta.mesh.clone();
                meshes["estradaReta"].position.set(0, 0, i);
                meshes["estradaReta"].scale.set(9, 9, 9);
                meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
                scene.add(meshes["estradaReta"]);
        
                meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
                meshes["estradaRetaBarreira"].position.set(0, 0, i);
                meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
                scene.add(meshes["estradaRetaBarreira"]);
        
                meshes["estradaReta"] = models.estradaReta.mesh.clone();
                meshes["estradaReta"].position.set(0, 0, -i);
                meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
                meshes["estradaReta"].scale.set(9, 9, 9);
                scene.add(meshes["estradaReta"]);
        
                meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
                meshes["estradaRetaBarreira"].position.set(0, 0, -i);
                meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
                scene.add(meshes["estradaRetaBarreira"]);
            }
        } 
    }

    //Interseções
    meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
    meshes["estradaIntersecao"].position.set(0, 0, 63);
    meshes["estradaIntersecao"].rotation.set(0, Math.PI, 0);
    meshes["estradaIntersecao"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecao"]);

    meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
    meshes["estradaIntersecaoBarreira"].position.set(0, 0, 63);
    meshes["estradaIntersecaoBarreira"].rotation.set(0, Math.PI, 0);
    meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecaoBarreira"]);

    meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
    meshes["estradaIntersecao"].position.set(0, 0, -63);
    meshes["estradaIntersecao"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecao"]);

    meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
    meshes["estradaIntersecaoBarreira"].position.set(0, 0, -63);
    meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecaoBarreira"]);

    meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
    meshes["estradaIntersecao"].position.set(63, 0, 0);
    meshes["estradaIntersecao"].rotation.set(0, -Math.PI/2, 0);
    meshes["estradaIntersecao"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecao"]);

    meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
    meshes["estradaIntersecaoBarreira"].position.set(63, 0, 0);
    meshes["estradaIntersecaoBarreira"].rotation.set(0, -Math.PI/2, 0);
    meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecaoBarreira"]);

    meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
    meshes["estradaIntersecao"].position.set(-63, 0, 0);
    meshes["estradaIntersecao"].rotation.set(0, Math.PI/2, 0);
    meshes["estradaIntersecao"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecao"]);

    meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
    meshes["estradaIntersecaoBarreira"].position.set(-63, 0, 0);
    meshes["estradaIntersecaoBarreira"].rotation.set(0, Math.PI/2, 0);
    meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecaoBarreira"]);

    //4º Quadrante
    for(var i = -9; i >= -54; i = i -9){
        meshes["estradaReta"] = models.estradaReta.mesh.clone();
        meshes["estradaReta"].position.set(i, 0, -63);
        meshes["estradaReta"].scale.set(9, 9, 9);
        scene.add(meshes["estradaReta"]);
    
        meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
        meshes["estradaRetaBarreira"].position.set(i, 0, -63);
        meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
        meshes["estradaRetaBarreira"].rotation.set(0, Math.PI/2, 0);
        scene.add(meshes["estradaRetaBarreira"]);
    }
    for(var i = -9; i >= -54; i = i -9){
        meshes["estradaReta"] = models.estradaReta.mesh.clone();
        meshes["estradaReta"].position.set(-63, 0, i);
        meshes["estradaReta"].scale.set(9, 9, 9);
        meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
        scene.add(meshes["estradaReta"]);
    
        meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
        meshes["estradaRetaBarreira"].position.set(-63, 0, i);
        meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
        scene.add(meshes["estradaRetaBarreira"]);
    }
    meshes["estradaCurva"] = models.estradaCurva.mesh.clone();
    meshes["estradaCurva"].position.set(-63, 0, -63);
    meshes["estradaCurva"].scale.set(9, 9, 9);
    meshes["estradaCurva"].rotation.set(0, Math.PI/2, 0);
    scene.add(meshes["estradaCurva"]);

    meshes["estradaCurvaBarreira"] = models.estradaCurvaBarreira.mesh.clone();
    meshes["estradaCurvaBarreira"].position.set(-63, 0, -63);
    meshes["estradaCurvaBarreira"].scale.set(9, 9, 9);
    meshes["estradaCurvaBarreira"].rotation.set(0, Math.PI/2, 0);
    scene.add(meshes["estradaCurvaBarreira"]);

    //3º Quadrante
    meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
    meshes["estradaIntersecao"].position.set(0, 0, -36);
    meshes["estradaIntersecao"].rotation.set(0, Math.PI/2, 0);
    meshes["estradaIntersecao"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecao"]);

    meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
    meshes["estradaIntersecaoBarreira"].position.set(0, 0, -36);
    meshes["estradaIntersecaoBarreira"].rotation.set(0, Math.PI/2, 0);
    meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecaoBarreira"]);

    meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
    meshes["estradaIntersecao"].position.set(36, 0, 0);
    meshes["estradaIntersecao"].rotation.set(0, Math.PI, 0);
    meshes["estradaIntersecao"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecao"]);

    meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
    meshes["estradaIntersecaoBarreira"].position.set(36, 0, 0);
    meshes["estradaIntersecaoBarreira"].rotation.set(0, Math.PI, 0);
    meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecaoBarreira"]);

    for(var i = 9; i <= 54; i = i + 9){
        if(i == 36){
            meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
            meshes["estradaIntersecao"].position.set(63, 0, -i);
            meshes["estradaIntersecao"].scale.set(9, 9, 9);
            meshes["estradaIntersecao"].rotation.set(0, -Math.PI/2, 0);
            scene.add(meshes["estradaIntersecao"]);
        
            meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
            meshes["estradaIntersecaoBarreira"].position.set(63, 0, -i);
            meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
            meshes["estradaIntersecaoBarreira"].rotation.set(0, -Math.PI/2, 0);
            scene.add(meshes["estradaIntersecaoBarreira"]);

            meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
            meshes["estradaIntersecao"].position.set(i, 0, -63);
            meshes["estradaIntersecao"].scale.set(9, 9, 9);
            scene.add(meshes["estradaIntersecao"]);
        
            meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
            meshes["estradaIntersecaoBarreira"].position.set(i, 0, -63);
            meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
            scene.add(meshes["estradaIntersecaoBarreira"]);
        }else{
            meshes["estradaReta"] = models.estradaReta.mesh.clone();
            meshes["estradaReta"].position.set(36, 0, -i);
            meshes["estradaReta"].scale.set(9, 9, 9);
            meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
            scene.add(meshes["estradaReta"]);
        
            meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
            meshes["estradaRetaBarreira"].position.set(36, 0, -i);
            meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
            scene.add(meshes["estradaRetaBarreira"]);

            meshes["estradaReta"] = models.estradaReta.mesh.clone();
            meshes["estradaReta"].position.set(63, 0, -i);
            meshes["estradaReta"].scale.set(9, 9, 9);
            meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
            scene.add(meshes["estradaReta"]);
        
            meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
            meshes["estradaRetaBarreira"].position.set(63, 0, -i);
            meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
            scene.add(meshes["estradaRetaBarreira"]);
    
            meshes["estradaReta"] = models.estradaReta.mesh.clone();
            meshes["estradaReta"].position.set(i, 0, -36);
            meshes["estradaReta"].scale.set(9, 9, 9);
            scene.add(meshes["estradaReta"]);
        
            meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
            meshes["estradaRetaBarreira"].position.set(i, 0, -36);
            meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
            meshes["estradaRetaBarreira"].rotation.set(0, Math.PI/2, 0);
            scene.add(meshes["estradaRetaBarreira"]);

            meshes["estradaReta"] = models.estradaReta.mesh.clone();
            meshes["estradaReta"].position.set(i, 0, -63);
            meshes["estradaReta"].scale.set(9, 9, 9);
            scene.add(meshes["estradaReta"]);
        
            meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
            meshes["estradaRetaBarreira"].position.set(i, 0, -63);
            meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
            meshes["estradaRetaBarreira"].rotation.set(0, Math.PI/2, 0);
            scene.add(meshes["estradaRetaBarreira"]);
        }
    }
    meshes["estradaCurva"] = models.estradaCurva.mesh.clone();
    meshes["estradaCurva"].position.set(63, 0, -63);
    meshes["estradaCurva"].scale.set(9, 9, 9);
    scene.add(meshes["estradaCurva"]);

    meshes["estradaCurvaBarreira"] = models.estradaCurvaBarreira.mesh.clone();
    meshes["estradaCurvaBarreira"].position.set(63, 0, -63);
    meshes["estradaCurvaBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaCurvaBarreira"]);

    meshes["estradaInterssecao"] = models.intersecao.mesh.clone();
    meshes["estradaInterssecao"].position.set(36, 0, -36);
    meshes["estradaInterssecao"].scale.set(9, 9, 9);
    scene.add(meshes["estradaInterssecao"]);

    meshes["estradaInterssecao"] = models.intersecaoBarreira.mesh.clone();
    meshes["estradaInterssecao"].position.set(36, 0, -36);
    meshes["estradaInterssecao"].scale.set(9, 9, 9);
    scene.add(meshes["estradaInterssecao"]);

    //1º Quadrante
    meshes["estradaReta"] = models.estradaReta.mesh.clone();
    meshes["estradaReta"].position.set(0, 0, 36);
    meshes["estradaReta"].rotation.set(0, -Math.PI/2, 0);
    meshes["estradaReta"].scale.set(9, 9, 9);
    scene.add(meshes["estradaReta"]);

    meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
    meshes["estradaRetaBarreira"].position.set(0, 0, 36);
    meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaRetaBarreira"]);

    meshes["estradaIntersecao2"] = models.estradaIntersecao.mesh.clone();
    meshes["estradaIntersecao2"].position.set(-36, 0, 0);
    meshes["estradaIntersecao2"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecao2"]);

    meshes["estradaIntersecaoBarreira2"] = models.estradaIntersecaoBarreira.mesh.clone();
    meshes["estradaIntersecaoBarreira2"].position.set(-36, 0, 0);
    meshes["estradaIntersecaoBarreira2"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecaoBarreira2"]);

    for(var i = 9; i <= 54; i = i + 9){
        if(i == 36){
            meshes["estradaCurva"] = models.estradaCurva.mesh.clone();
            meshes["estradaCurva"].position.set(-i, 0, 63);
            meshes["estradaCurva"].scale.set(9, 9, 9);
            meshes["estradaCurva"].rotation.set(0, Math.PI, 0);
            scene.add(meshes["estradaCurva"]);
        
            meshes["estradaCurvaBarreira"] = models.estradaCurvaBarreira.mesh.clone();
            meshes["estradaCurvaBarreira"].position.set(-i, 0, 63);
            meshes["estradaCurvaBarreira"].scale.set(9, 9, 9);
            meshes["estradaCurvaBarreira"].rotation.set(0, Math.PI, 0);
            scene.add(meshes["estradaCurvaBarreira"]);

            meshes["estradaIntersecao2"] = models.estradaIntersecao.mesh.clone();
            meshes["estradaIntersecao2"].position.set(-i, 0, i);
            meshes["estradaIntersecao2"].scale.set(9, 9, 9);
            meshes["estradaIntersecao2"].rotation.set(0, -Math.PI/2, 0);
            scene.add(meshes["estradaIntersecao2"]);

            meshes["estradaIntersecaoBarreira2"] = models.estradaIntersecaoBarreira.mesh.clone();
            meshes["estradaIntersecaoBarreira2"].position.set(-i, 0, i);
            meshes["estradaIntersecaoBarreira2"].scale.set(9, 9, 9);
            meshes["estradaIntersecaoBarreira2"].rotation.set(0, -Math.PI/2, 0);
            scene.add(meshes["estradaIntersecaoBarreira2"]);
        }else{
            if(i >= 36){
                meshes["estradaReta"] = models.estradaReta.mesh.clone();
                meshes["estradaReta"].position.set(-36, 0, i);
                meshes["estradaReta"].scale.set(9, 9, 9);
                meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
                scene.add(meshes["estradaReta"]);
            
                meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
                meshes["estradaRetaBarreira"].position.set(-36, 0, i);
                meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
                scene.add(meshes["estradaRetaBarreira"]);

                meshes["estradaReta"] = models.estradaReta.mesh.clone();
                meshes["estradaReta"].position.set(-i, 0, 36);
                meshes["estradaReta"].scale.set(9, 9, 9);
                scene.add(meshes["estradaReta"]);
            
                meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
                meshes["estradaRetaBarreira"].position.set(-i, 0, 36);
                meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
                meshes["estradaRetaBarreira"].rotation.set(0, Math.PI/2, 0);
                scene.add(meshes["estradaRetaBarreira"]); 
            }else{
                meshes["estradaReta"] = models.estradaReta.mesh.clone();
                meshes["estradaReta"].position.set(-36, 0, i);
                meshes["estradaReta"].scale.set(9, 9, 9);
                meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
                scene.add(meshes["estradaReta"]);
            
                meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
                meshes["estradaRetaBarreira"].position.set(-36, 0, i);
                meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
                scene.add(meshes["estradaRetaBarreira"]);
    
                meshes["estradaReta"] = models.estradaReta.mesh.clone();
                meshes["estradaReta"].position.set(-i, 0, 63);
                meshes["estradaReta"].scale.set(9, 9, 9);
                scene.add(meshes["estradaReta"]);
            
                meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
                meshes["estradaRetaBarreira"].position.set(-i, 0, 63);
                meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
                meshes["estradaRetaBarreira"].rotation.set(0, Math.PI/2, 0);
                scene.add(meshes["estradaRetaBarreira"]);
                
                meshes["estradaReta"] = models.estradaReta.mesh.clone();
                meshes["estradaReta"].position.set(-63, 0, i);
                meshes["estradaReta"].scale.set(9, 9, 9);
                meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
                scene.add(meshes["estradaReta"]);
            
                meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
                meshes["estradaRetaBarreira"].position.set(-63, 0, i);
                meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
                scene.add(meshes["estradaRetaBarreira"]);
            }
        }
    }
    meshes["estradaCurva"] = models.estradaCurva.mesh.clone();
    meshes["estradaCurva"].position.set(-63, 0, 36);
    meshes["estradaCurva"].scale.set(9, 9, 9);
    meshes["estradaCurva"].rotation.set(0, Math.PI, 0);
    scene.add(meshes["estradaCurva"]);

    meshes["estradaCurvaBarreira"] = models.estradaCurvaBarreira.mesh.clone();
    meshes["estradaCurvaBarreira"].position.set(-63, 0, 36);
    meshes["estradaCurvaBarreira"].scale.set(9, 9, 9);
    meshes["estradaCurvaBarreira"].rotation.set(0, Math.PI, 0);
    scene.add(meshes["estradaCurvaBarreira"]);

    //2º Quadrante
    for(i = 9; i <= 36; i = i + 9){
        if(i == 18){
            meshes["rotunda2"] = models.rotunda2.mesh.clone();
            meshes["rotunda2"].position.set(63, 0, i);
            meshes["rotunda2"].scale.set(9, 9, 9);
            meshes["rotunda2"].rotation.set(0, Math.PI/2, 0);
            scene.add(meshes["rotunda2"]);

            meshes["rotunda2Barreira"] = models.rotunda2Barreira.mesh.clone();
            meshes["rotunda2Barreira"].position.set(63, 0, i);
            meshes["rotunda2Barreira"].scale.set(9, 9, 9);
            meshes["rotunda2Barreira"].rotation.set(0, Math.PI/2, 0);
            scene.add(meshes["rotunda2Barreira"]);
        }else if(i == 27){
            meshes["rotunda2"] = models.rotunda2.mesh.clone();
            meshes["rotunda2"].position.set(63, 0, i);
            meshes["rotunda2"].scale.set(9, 9, 9);
            meshes["rotunda2"].rotation.set(0, -Math.PI/2, 0);
            scene.add(meshes["rotunda2"]);

            meshes["rotunda2Barreira"] = models.rotunda2Barreira.mesh.clone();
            meshes["rotunda2Barreira"].position.set(63, 0, i);
            meshes["rotunda2Barreira"].scale.set(9, 9, 9);
            meshes["rotunda2Barreira"].rotation.set(0, -Math.PI/2, 0);
            scene.add(meshes["rotunda2Barreira"]);
        }else{
            meshes["estradaReta"] = models.estradaReta.mesh.clone();
            meshes["estradaReta"].position.set(63, 0, i);
            meshes["estradaReta"].scale.set(9, 9, 9);
            meshes["estradaReta"].rotation.set(0, Math.PI/2, 0);
            scene.add(meshes["estradaReta"]);
        
            meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
            meshes["estradaRetaBarreira"].position.set(63, 0, i);
            meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
            scene.add(meshes["estradaRetaBarreira"]);
        }
    }
    meshes["ponte"] = models.ponte.mesh.clone();
    meshes["ponte"].position.set(31.5, 0, 45);
    meshes["ponte"].scale.set(9, 9, 9);
    scene.add(meshes["ponte"]);

    meshes["ponteBarreira"] = models.ponteBarreira.mesh.clone();
    meshes["ponteBarreira"].position.set(31.5, 0, 45);
    meshes["ponteBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["ponteBarreira"]);

    meshes["ponte"] = models.ponte.mesh.clone();
    meshes["ponte"].position.set(49.5, 0, 45);
    meshes["ponte"].scale.set(9, 9, 9);
    meshes["ponte"].rotation.set(0, Math.PI, 0);
    scene.add(meshes["ponte"]);

    meshes["ponteBarreira"] = models.ponteBarreira.mesh.clone();
    meshes["ponteBarreira"].position.set(49.5, 0, 45);
    meshes["ponteBarreira"].scale.set(9, 9, 9);
    meshes["ponteBarreira"].rotation.set(0, Math.PI, 0);
    scene.add(meshes["ponteBarreira"]);

    meshes["curva"] = models.estradaCurva.mesh.clone();
    meshes["curva"].position.set(63, 0, 45);
    meshes["curva"].scale.set(9, 9, 9);
    meshes["curva"].rotation.set(0, -Math.PI/2, 0);
    scene.add(meshes["curva"]);

    meshes["curvaBarreira"] = models.estradaCurvaBarreira.mesh.clone();
    meshes["curvaBarreira"].position.set(63, 0, 45);
    meshes["curvaBarreira"].scale.set(9, 9, 9);
    meshes["curvaBarreira"].rotation.set(0, -Math.PI/2, 0);
    scene.add(meshes["curvaBarreira"]);

    meshes["estradaReta"] = models.estradaReta.mesh.clone();
    meshes["estradaReta"].position.set(9, 0, 45);
    meshes["estradaReta"].scale.set(9, 9, 9);
    scene.add(meshes["estradaReta"]);

    meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
    meshes["estradaRetaBarreira"].position.set(9, 0, 45);
    meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
    meshes["estradaRetaBarreira"].rotation.set(0, -Math.PI/2, 0);
    scene.add(meshes["estradaRetaBarreira"]);

    meshes["estradaReta"] = models.estradaReta.mesh.clone();
    meshes["estradaReta"].position.set(9, 0, 63);
    meshes["estradaReta"].scale.set(9, 9, 9);
    scene.add(meshes["estradaReta"]);

    meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
    meshes["estradaRetaBarreira"].position.set(9, 0, 63);
    meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
    meshes["estradaRetaBarreira"].rotation.set(0, -Math.PI/2, 0);
    scene.add(meshes["estradaRetaBarreira"]);

    meshes["estradaReta"] = models.estradaReta.mesh.clone();
    meshes["estradaReta"].position.set(18, 0, 54);
    meshes["estradaReta"].scale.set(9, 9, 9);
    meshes["estradaReta"].rotation.set(0, -Math.PI/2, 0);
    scene.add(meshes["estradaReta"]);

    meshes["estradaRetaBarreira"] = models.estradaRetaBarreira.mesh.clone();
    meshes["estradaRetaBarreira"].position.set(18, 0, 54);
    meshes["estradaRetaBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaRetaBarreira"]);

    meshes["estradaIntersecao"] = models.estradaIntersecao.mesh.clone();
    meshes["estradaIntersecao"].position.set(18, 0, 45);
    meshes["estradaIntersecao"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecao"]);

    meshes["estradaIntersecaoBarreira"] = models.estradaIntersecaoBarreira.mesh.clone();
    meshes["estradaIntersecaoBarreira"].position.set(18, 0, 45);
    meshes["estradaIntersecaoBarreira"].scale.set(9, 9, 9);
    scene.add(meshes["estradaIntersecaoBarreira"]);

    meshes["estradaCurva"] = models.estradaCurva.mesh.clone();
    meshes["estradaCurva"].position.set(18, 0, 63);
    meshes["estradaCurva"].scale.set(9, 9, 9);
    meshes["estradaCurva"].rotation.set(0, -Math.PI/2, 0);
    scene.add(meshes["estradaCurva"]);

    meshes["estradaCurvaBarreira"] = models.estradaCurvaBarreira.mesh.clone();
    meshes["estradaCurvaBarreira"].position.set(18, 0, 63);
    meshes["estradaCurvaBarreira"].scale.set(9, 9, 9);
    meshes["estradaCurvaBarreira"].rotation.set(0, -Math.PI/2, 0);
    scene.add(meshes["estradaCurvaBarreira"]);

    //Casas
    meshes["casa1"] = models.casa1.mesh.clone();
    meshes["casa1"].scale.set(9,9,9);
    meshes["casa1"].position.set(17,0,7);
    meshes["casa1"].rotation.set(0, Math.PI/4, 0);
    scene.add(meshes["casa1"]);

    meshes["casa2"] = models.casaGrande.mesh.clone();
    meshes["casa2"].scale.set(9,9,9);
    meshes["casa2"].position.set(-17,0,30);
    meshes["casa2"].rotation.set(0, Math.PI/2, 0);
    scene.add(meshes["casa2"]);
    meshes["jardimCasa2"] = models.jardimCasaGrande.mesh.clone();
    meshes["jardimCasa2"].scale.set(9,9,9);
    meshes["jardimCasa2"].position.set(-17,0,40);
    meshes["jardimCasa2"].rotation.set(0, 0, 0);
    scene.add(meshes["jardimCasa2"]);

    meshes["casa3"] = models.casa2.mesh.clone();
    meshes["casa3"].scale.set(9,9,9);
    meshes["casa3"].position.set(30,0,30);
    meshes["casa3"].rotation.set(0, 0, 0);
    scene.add(meshes["casa3"]);

    meshes["casa4"] = models.casa3.mesh.clone();
    meshes["casa4"].scale.set(9,9,9);
    meshes["casa4"].position.set(42,0,13);
    meshes["casa4"].rotation.set(0, 0, 0);
    scene.add(meshes["casa4"]);

    //Sopa
    meshes["sopa"] = models.sopa.mesh.clone();
    meshes["sopa"].position.set(-29, 0.4, -25);
    meshes["sopa"].scale.set(1.5, 1.5, 1.5);
    scene.add(meshes["sopa"]);

    //Cova
    for(var i = 44.5; i <= 55; i += 5){
        meshes["cova"] = models.cova.mesh.clone();
        meshes["cova"].position.set(i, 0, -53); 
        meshes["cova"].scale.set(5, 5, 5);
        scene.add(meshes["cova"]);
    
        meshes["covaBorder"] = models.covaBorder.mesh.clone();
        meshes["covaBorder"].position.set(i, 0, -53);
        meshes["covaBorder"].scale.set(5, 5, 5);
        scene.add(meshes["covaBorder"]);

        meshes["cova"] = models.cova.mesh.clone();
        meshes["cova"].position.set(i, 0, -44);
        meshes["cova"].scale.set(5, 5, 5);
        scene.add(meshes["cova"]);
    
        meshes["covaBorder"] = models.covaBorder.mesh.clone();
        meshes["covaBorder"].position.set(i, 0, -44);
        meshes["covaBorder"].scale.set(5, 5, 5);
        scene.add(meshes["covaBorder"]);
    }
    meshes["campa"] = models.cruz1.mesh.clone();
    meshes["campa"].position.set(44.6, 0, -47.5);
    meshes["campa"].scale.set(3, 3 ,3);
    scene.add(meshes["campa"]);

    meshes["campa"] = models.cruz1.mesh.clone();
    meshes["campa"].position.set(54.6, 0, -47.5);
    meshes["campa"].scale.set(3, 3 ,3);
    scene.add(meshes["campa"]);

    meshes["campa2"] = models.cruz2.mesh.clone();
    meshes["campa2"].position.set(49.6, 0, -56.5);
    meshes["campa2"].scale.set(3, 3 ,3);
    scene.add(meshes["campa2"]);

    meshes["pa"] = models.pa.mesh.clone();
    meshes["pa"].position.set(52.1, 0, -49.5);
    meshes["pa"].scale.set(3, 3 ,3);
    scene.add(meshes["pa"]);

    meshes["lanterna"] = models.lanterna.mesh.clone();
    meshes["lanterna"].position.set(49.6, 0.5, -54.5);
    meshes["lanterna"].scale.set(3, 3 ,3);
    scene.add(meshes["lanterna"]);

    //Grades
    for(var i = 56.51; i >= 44.51; i -= 4){
        if(i == 52.51){
            meshes["grade"] = models.gradesEstragadas.mesh.clone();
            meshes["grade"].position.set(i, 0.65, -56.85);
            meshes["grade"].scale.set(4, 4, 4);
            scene.add(meshes["grade"]);

            meshes["grade"] = models.grades.mesh.clone();
            meshes["grade"].position.set(i, 0.65, -38.50);
            meshes["grade"].scale.set(4, 4, 4);
            scene.add(meshes["grade"]);
        }else{
            meshes["grade"] = models.grades.mesh.clone();
            meshes["grade"].position.set(i, 0.65, -56.85);
            meshes["grade"].scale.set(4, 4, 4);
            scene.add(meshes["grade"]);
    
            meshes["grade"] = models.grades.mesh.clone();
            meshes["grade"].position.set(i, 0.65, -38.50);
            meshes["grade"].scale.set(4, 4, 4);
            scene.add(meshes["grade"]);
        }
    }
    meshes["grade"] = models.grades.mesh.clone();
    meshes["grade"].position.set(42.51, 0.65, -38.50);
    meshes["grade"].scale.set(4, 4, 4);
    scene.add(meshes["grade"]);

    meshes["grade"] = models.grades.mesh.clone();
    meshes["grade"].position.set(42.51, 0.65, -56.85);
    meshes["grade"].scale.set(4, 4, 4);
    scene.add(meshes["grade"]);

    for(var i = -42.15; i > -57; i -= 4){
        if(i == -42.15){
            meshes["grade"] = models.gradesEstragadas.mesh.clone();
            meshes["grade"].position.set(60.4, 0.65, i);
            meshes["grade"].rotation.set(0, Math.PI / 2, 0);
            meshes["grade"].scale.set(4, 4, 4);
            scene.add(meshes["grade"]);

            meshes["grade"] = models.grades.mesh.clone();
            meshes["grade"].position.set(42.2, 0.65, i);
            meshes["grade"].rotation.set(0, Math.PI / 2, 0);
            meshes["grade"].scale.set(4, 4, 4);
            scene.add(meshes["grade"]);
        }else{
            meshes["grade"] = models.grades.mesh.clone();
            meshes["grade"].position.set(60.4, 0.65, i);
            meshes["grade"].rotation.set(0, Math.PI / 2, 0);
            meshes["grade"].scale.set(4, 4, 4);
            scene.add(meshes["grade"]);

            meshes["grade"] = models.grades.mesh.clone();
            meshes["grade"].position.set(42.2, 0.65, i);
            meshes["grade"].rotation.set(0, Math.PI / 2, 0);
            meshes["grade"].scale.set(4, 4, 4);
            scene.add(meshes["grade"]);
        }
    }
    meshes["grade"] = models.grades.mesh.clone();
    meshes["grade"].position.set(42.2, 0.65, -56.735);
    meshes["grade"].rotation.set(0, Math.PI / 2, 0);
    meshes["grade"].scale.set(4, 4, 4);
    scene.add(meshes["grade"]);

    meshes["grade"] = models.grades.mesh.clone();
    meshes["grade"].position.set(60.4, 0.65, -56.735);
    meshes["grade"].rotation.set(0, Math.PI / 2, 0);
    meshes["grade"].scale.set(4, 4, 4);
    scene.add(meshes["grade"]);
}

function Update(){

    /*---------------Loading Screen---------------*/
    if(RESOURCES_LOADED == false){
        requestAnimationFrame(Update);

        loadingScreen.box.rotation.y += 0.05;
        loadingScreen.box.scale.set(0.8, 0.8, 0.8);
        renderer.render(loadingScreen.scene, loadingScreen.camera);
        return;
    }
    /*--------------------------------------------*/
    requestAnimationFrame(Update);

    //Clock Settings for animations
    var time = Date.now() * 0.0005;
    var delta = clock.getDelta();

    //Movimentação Zombies
    //Zombie 1
    if(zombieAndarFrente == true){
        if(objetoImportado.position.z > 59){
            zombieAndarFrente = false;
            objetoImportado.rotation.set(0, Math.PI, 0);
        }else{
            objetoImportado.position.z += velocidadeZombies;
        }
    }
    if(zombieAndarFrente == false){
        if(objetoImportado.position.z < 5){
            objetoImportado.rotation.set(0, 2 * Math.PI, 0);
            zombieAndarFrente = true;
        }else{
            objetoImportado.position.z -= velocidadeZombies;
        }
    }
    //Zombie 2
    if(zombie2AndarFrente == true){
        if(zombieAndar.position.x < -59){
            zombie2AndarFrente = false;
            zombieAndar.rotation.set(0, Math.PI/2, 0);
        }else{
            zombieAndar.position.x -= velocidadeZombies;
        }
    }
    if(zombie2AndarFrente == false){
        if(zombieAndar.position.x > -5){
            zombieAndar.rotation.set(0, -Math.PI/2, 0);
            zombie2AndarFrente = true;
        }else{
            zombieAndar.position.x += velocidadeZombies;
        }
    }
    //Zombie 3
    if(zombie3AndarFrente == true){
        if(zombie3.position.x > 60){
            zombie3AndarFrente = false;
            zombie3.rotation.set(0, -Math.PI/2, 0);
        }else{
            zombie3.position.x += velocidadeZombies;
        }
    }
    if(zombie3AndarFrente == false){
        if(zombie3.position.x < -63){
            zombie3.rotation.set(0, Math.PI/2, 0);
            zombie3AndarFrente = true;
        }else{
            zombie3.position.x -= velocidadeZombies;
        }
    }
    //Zombie 4
    if(zombie4AndarFrente == true){
        if(zombie4.position.z < -59){
            zombie4AndarFrente = false;
            zombie4.rotation.set(0, 2 * Math.PI, 0);
        }else{
            zombie4.position.z -= velocidadeZombies;
        }
    }
    if(zombie4AndarFrente == false){
        if(zombie4.position.z > 1){
            zombie4.rotation.set(0, Math.PI, 0);
            zombie4AndarFrente = true;
        }else{
            zombie4.position.z += velocidadeZombies;
        }
    }
    //Zombie 5
    if(zombie5AndarFrente == true){
        if(zombie5.position.z < -59){
            zombie5AndarFrente = false;
            zombie5.rotation.set(0, 2 * Math.PI, 0);
        }else{
            zombie5.position.z -= velocidadeZombies;
        }
    }
    if(zombie5AndarFrente == false){
        if(zombie5.position.z > 36){
            zombie5.rotation.set(0, Math.PI, 0);
            zombie5AndarFrente = true;
        }else{
            zombie5.position.z += velocidadeZombies;
        }
    }
    //Zombie 6
    if(zombie6AndarFrente == true){
        if(zombie6.position.x < -36){
            zombie6AndarFrente = false;
            zombie6.rotation.set(0, Math.PI/2, 0);
        }else{
            zombie6.position.x -= velocidadeZombies;
        }
    }
    if(zombie6AndarFrente == false){
        if(zombie6.position.x > 18){
            zombie6.rotation.set(0, -Math.PI/2, 0);
            zombie6AndarFrente = true;
        }else{
            zombie6.position.x += velocidadeZombies;
        }
    }
    
    //MixerAnimacao
    if(mixerAnimacao){
        mixerAnimacao.update(delta);
    }
    if(mixerAnimacao2){
       mixerAnimacao2.update(delta);
    }
    if(mixerAnimacao3){
        mixerAnimacao3.update(delta);
    }
    if(mixerAnimacao4){
        mixerAnimacao4.update(delta);
    }
    if(mixerAnimacao5){
        mixerAnimacao5.update(delta);
    }
    if(mixerAnimacao6){
        mixerAnimacao6.update(delta);
    }
    if(mixerAnimacaoGalinha){
        mixerAnimacaoGalinha.update(delta);
    }
    if(mixerAnimacaoGalinha){
        mixerAnimacaoGalinha.update(delta);
    }
    if(mixerAnimacaoGalinha2){
        mixerAnimacaoGalinha2.update(delta);
    }
    if(mixerAnimacaoGalinha3){
        mixerAnimacaoGalinha3.update(delta);
    }
    if(mixerAnimacaoGalinha4){
        mixerAnimacaoGalinha4.update(delta);
    }
    
    
    //Add velocity to bullets
    for(var index = 0; index < bullets.length; index+=1){
        if(bullets[index] === undefined) continue;
        if(bullets[index].alive == false){
            bullets.splice(index, 1);
            continue;
        }
        bullets[index].position.add(bullets[index].velocity)
    }
    
    //Movement
    if(keyboard[87]){ //W
        controls.moveForward(player.speed); 
    }
    if(keyboard[83]){ //S
        controls.moveForward(-player.speed);
    }
    if(keyboard[65]){ //A
        controls.moveRight(-player.speed);
    }
    if(keyboard[68]){ //D
        controls.moveRight(player.speed);
    }
    if(keyboard[16] && keyboard[87]){ //Shift + W (Run)
        controls.moveForward(player.speed * 10);   // Mudar para *2
    }

    //Fly (Testar)
    if(keyboard[32]){ //Spacebar
        camera.position.y += 0.3;
    }
    if(keyboard[67]){ //C
        camera.position.y -= 0.3;
    }

    //Rotation
    if(keyboard[37]){ //Left arrow key
        camera.rotation.y -= player.turnSpeed;
    }
    if(keyboard[39]){ //Right arrow key
        camera.rotation.y += player.turnSpeed;
    }

    //MouseClick
    if(isClicked == 1 && player.canShoot <= 0){
        //Play sfx
        sfx1.play();

        var bullet = models.rocketLauncherAmmo.mesh.clone();
        bullet.rotation.set(
            meshes["weapon"].rotation.z,
            meshes["weapon"].rotation.y,
            meshes["weapon"].rotation.x
            );

        bullet.scale.set(10, 10, 10);
        
        bullet.position.set(
            meshes["weapon"].position.x,
            meshes["weapon"].position.y,
            meshes["weapon"].position.z
        );
        //bullet.position.copy(meshes["weapon"].getWorldPosition());
        //bullet.quaternion.copy(camera.quaternion);

        bullet.velocity = new THREE.Vector3(
            -Math.sin(camera.rotation.y),
            0,
            Math.cos(camera.rotation.y)
        );

        bullet.alive = true;
        setTimeout(
            function(){
                bullet.alive = false;
                scene.remove(bullet);
            },
            1000
        );
        bullets.push(bullet);
        scene.add(bullet);
        if(bullet)
        posicaoBala = bullet.position;
        player.canShoot = 80;

        //Reset click
        isClicked = 0;
    }
        if(player.canShoot > -1)
        player.canShoot -= 1;

    //Update weapon position in relation to camera
    meshes["weapon"].position.set(
        camera.position.x - Math.sin(camera.rotation.y + Math.PI/6) * 0.3,
        camera.position.y - 0.3 + Math.sin(time * 2 + camera.position.x + camera.position.z) * 0.01,
        camera.position.z + Math.cos(camera.rotation.y + Math.PI/6) * 0.3
    );
    meshes["weapon"].rotation.set(
        camera.rotation.x,
        camera.rotation.y,
        camera.rotation.z
    );
    
    //"Colision Detection"
    posicaoZombie = zombieAndar.position;
    posicaoZombie2 = objetoImportado.position;
    posicaoZombie3 = zombie3.position;
    posicaoZombie4 = zombie4.position;
    posicaoZombie5 = zombie5.position;
    posicaoZombie6 = zombie6.position;
    if(posicaoBala){
        if(posicaoBala.distanceTo(posicaoZombie) < 2){
            if(zombieAndar.parent === scene)
            nZombiesMortos++;
            scene.remove(zombieAndar);
            scene.remove(bullet);
        }
        if(posicaoBala.distanceTo(posicaoZombie2) < 2){
            if(objetoImportado.parent === scene)
            nZombiesMortos++;
            scene.remove(objetoImportado);
            scene.remove(bullet);
        }
        if(posicaoBala.distanceTo(posicaoZombie3) < 2){
            if(zombie3.parent === scene)
            nZombiesMortos++;
            scene.remove(zombie3);
            scene.remove(bullet);
        }
        if(posicaoBala.distanceTo(posicaoZombie4) < 2){
            if(zombie4.parent === scene)
            nZombiesMortos++;
            scene.remove(zombie4);
            scene.remove(bullet);
        }
        if(posicaoBala.distanceTo(posicaoZombie5) < 2){
            if(zombie5.parent === scene)
            nZombiesMortos++;
            scene.remove(zombie5);
            scene.remove(bullet);
        }
        if(posicaoBala.distanceTo(posicaoZombie6) < 2){
            if(zombie6.parent === scene)
            nZombiesMortos++;
            scene.remove(zombie6);
            scene.remove(bullet);
        }
    }

    if(nZombiesMortos == 6){
        fimDoJogo();
    }

    //Change Cameras
    if(cameraCinematica.position.distanceTo(meshFloor.position) > 2.5){
        cameraCinematica.position.y -= 1;
        cameraCinematica.rotation.x -= Math.PI / 1000
        cameraCinematica.rotation.y -= Math.PI / 25
        renderer.render(scene, cameraCinematica);
    }else{
        if(c == 0)
        renderer.render(scene, camera);
        else if(c == 1)
        renderer.render(scene, camaraOrtografica);
        else if(c == 2)
        renderer.render(vitoria, cameraVitoria);
    }
}

//Turn off lights with button
function turnLightOff(){
    if(light.visible == true)
    light.visible = false;
    else
    light.visible = true;
}

function turnAmbientLightOff(){
    if(ambientLight.visible == true)
        ambientLight.visible = false;
    else
        ambientLight.visible = true;
}

function keyDown(event){
    keyboard[event.keyCode] = true;
}
function keyUp(event){
    keyboard[event.keyCode] = false;
}
function abrirMinimapa(evento){
    teclado[evento.keyCode] = true;
    //Minimapa/Alternar Câmara
    if(teclado[77]){ //M
        if(c == 0)
        c++;
        else
        c--;
    }

    //Disparar Alternativo
    if(teclado[70]){ //F
        if(player.canShoot <= 0){
            isClicked = 1;
        }
    }

    //Desligar Luzes
    if(teclado[80]){ //P (Point Lights)
        if(light.visible == true){
            light.visible = false;
            luzLanterna.visible = false;
        }
        else{
            light.visible = true;
            luzLanterna.visible = true;
        }
    }
    if(teclado[76]){ //L (Ambient Light)
        if(ambientLight.visible == true)
        ambientLight.visible = false;
        else
        ambientLight.visible = true;
    }
    if(teclado[79]){ //O (Directional Light)
        if(directionalLight.visible == true)
        directionalLight.visible = false;
        else
        directionalLight.visible = true;
    } 
    teclado[evento.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
window.addEventListener('keyup', abrirMinimapa);

function fimDoJogo(){
    c = 2;
}

window.onload = Start;