import { useState } from 'react'
import { Spinner, Box } from "@chakra-ui/react"
import SceneComponent from "../components/SceneComponent"
import GameLoading from '../components/GameLoading'
import { SideMenu } from '../components/SideMenu'
import "@babylonjs/loaders"
import {
  Color3,
  Scene,
  SceneLoader,
  Vector3,
  FreeCamera,
  Engine,
  HighlightLayer,
  ActionManager,
  ExecuteCodeAction,
  MeshBuilder,
  StandardMaterial,
  Texture,
  TransformNode,
  SceneOptimizerOptions,
  PointerEventTypes,
  Quaternion,
  Animation,
} from "@babylonjs/core"
import { useMusic } from '../hooks/useMusic'
import { useMiniplay } from '../hooks/useMiniplay'

type Office = {
  id_video?: string
  id_web?: string
  created_at: string
  updated_at: string
  id: string
  logo_left: {
    url: string
  }
  logo_right: {
    url: string
  }
  image_video: {
    url: string
  }
  image_web: {
    url: string
  }
}

export default function RenderOffice({ jwt }) {
  const [isLoading, setIsLoading] = useState(false)
  const [moveClick, setMoveClick] = useState(true)
  const { setVideoId, setVideoIsOpen } = useMiniplay()
  const { pauseMusic } = useMusic()
  var canvas // drawing paper
  var engine // the pen - deal with the low level webgl
  var camera // camera
  var useBox 
  var useRotationNotTarget

  const onSceneReady = (scene) => {//when scene is ready
    Engine.audioEngine.useCustomUnlockedButton = true 
    SceneLoader.ShowLoadingScreen = false; //retirar loading babylon
    //CAMERA
    // Get the canvas from our engine
    const canvas = scene.getEngine().getRenderingCanvas()
    camera = new FreeCamera("freeCamera", new Vector3(1, 1, 1), scene)
    camera.attachControl(canvas) 
    camera.checkCollisions = true
    camera.applyGravity = true
    camera.ellipsoid = new Vector3(1.2, 0.82, 1.2)
    camera.speed = 0.10
    //movement
    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    camera.position = new Vector3(1, 1.2, 0)//camera position
    camera.rotation = new Vector3(-0.0044657201001599145, 8.319440534657161, 0)//camera rotation
    
    
    var camSphere = MeshBuilder.CreateSphere("sphere", { diameterY: 3, diameterX: 0.1 }, scene);
    camSphere.parent = camera;
    camSphere.visibility = 0; 


    // Load our OBJ
    SceneLoader.Append("./assets/scene-2/scene.babylon", "", scene, onSceneImported, onLoading)
    function onLoading(evt) {
      // onProgress
      var loadedPercent = 0
      if (evt.lengthComputable) {
            loadedPercent = parseInt((evt.loaded * 100 / evt.total).toFixed())
      } else {
          var dlCount = evt.loaded / (1024 * 1024)
          loadedPercent = Math.floor(dlCount * 100.0) / 100.0
      }
      // assuming "loadingScreenPercent" is an existing html element
      document.getElementById("loadingScreenPercent").innerHTML = loadedPercent + "%"
    }

    var CoT = new TransformNode("root");

    function onSceneImported(){
      if(moveClick){
        // Poin n click logic
        var texturesphere = new StandardMaterial("material1", scene);
        texturesphere.diffuseTexture = new Texture("./assets/scene/pointandclick_512.png", scene);
        texturesphere.alpha = 0.5;
        var disc = MeshBuilder.CreateDisc('disc1', scene);
        disc.rotation.x = (Math.PI/2);
        disc.position.y = 0.02;
        disc.scaling = new Vector3(0.4,0.4,0.4);
        disc.isPickable = false;
        disc.material = texturesphere;
        
       window.addEventListener("mousemove", function() {
         var pickResult = scene.pick(scene.pointerX, scene.pointerY, scene.pointerZ);
         disc.position.x = pickResult.pickedPoint.x;
         disc.position.z = pickResult.pickedPoint.z;
         
       });
       
     var PISO = scene.getMeshByName("col_piso");
     PISO.parent = CoT;
     PISO.freezeWorldMatrix();
     PISO.convertToUnIndexedMesh(); 
     scene.onPointerObservable.add(function (pointerInfo) {
     switch (pointerInfo.type) {
       case PointerEventTypes.POINTERPICK:
         let m = pointerInfo.pickInfo.pickedMesh;
     
         if (m.name === "col_piso") {
           var position = pointerInfo.pickInfo.pickedPoint
           position.y += 1.46
           var direction = pointerInfo.pickInfo.ray.direction
           direction.y = 0
           var target = position.add(direction)
           var tempCamera = camera.clone()
           tempCamera.position = position
           tempCamera.setTarget(target)
           var start = Quaternion.FromRotationMatrix(camera.getWorldMatrix())
           var end = Quaternion.FromRotationMatrix(tempCamera.getWorldMatrix())
           tempCamera.dispose()
           //change options
           useBox = false; //shows box transition instead of camera, but not with target animation
           useRotationNotTarget = false;

           var node = useBox ? Box : camera;
           Animation.CreateAndStartAnimation("transition", node, "position", 60, 60, camera.globalPosition, position,  Animation.ANIMATIONLOOPMODE_CONSTANT);
           if(useRotationNotTarget){
             Animation.CreateAndStartAnimation("transition", node, "rotation", 30, 30, start.toEulerAngles(), end.toEulerAngles(), Animation.ANIMATIONLOOPMODE_CONSTANT);
           }else{
             Animation.CreateAndStartAnimation("transition", node, "target", 6, 4, camera.getTarget(), target, Animation.ANIMATIONLOOPMODE_CONSTANT);
           }
           
         }
         break;
       } 
       
     });
     }else if(!moveClick){
       null;
     }
    ///////////FIM DO MOV & CLICK/////////////

      var coltel = scene.getMeshByName("col_telao");
      var telaud = scene.getMeshByName("tel_iniciosala");
      camera.position = telaud.position;
      camera.rotation = telaud.rotation;

      var cliqtelao = scene.getMeshByName("art_telaoseta");
      cliqtelao.visibility = false;
      var cliqweb = scene.getMeshByName("art_linkseta");
      cliqweb.visibility = false ;
      var butOut = scene.getMeshByName("art_botao");
      butOut.actionManager = new ActionManager(scene);
      butOut.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, function () {
      window.location.href="/#"
      setIsLoading(true)  
      }));
      fetch(`${process.env.NEXT_PUBLIC_API}/office`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
       })
      .then(response => response.json())
      .then((data: Office) => {
        var materiallogo1= new StandardMaterial("materiallogo1", scene);
        materiallogo1.diffuseTexture = new Texture(`${data.logo_left?.url}`, scene);
        materiallogo1.emissiveTexture = new Texture(`${data.logo_left?.url}`, scene);
        materiallogo1.specularColor = new Color3(0, 0, 0);
        materiallogo1.freeze();
        var materiallogo2= new StandardMaterial("materiallogo2", scene);
        materiallogo2.diffuseTexture = new Texture(`${data.logo_right?.url}`, scene);
        materiallogo2.emissiveTexture = new Texture(`${data.logo_right?.url}`, scene);
        materiallogo2.specularColor = new Color3(0, 0, 0);
        materiallogo2.freeze();
        var materialweb= new StandardMaterial("materialweb", scene);
        materialweb.diffuseTexture = new Texture(`${data.image_web?.url}`, scene);
        materialweb.emissiveTexture = new Texture(`${data.image_web?.url}`, scene);
        materialweb.specularColor = new Color3(0, 0, 0);
        materialweb.freeze();
        var materialvideo= new StandardMaterial("materialvideo", scene);
        materialvideo.diffuseTexture = new Texture(`${data.image_video?.url}`, scene);
        materialvideo.emissiveTexture = new Texture(`${data.image_video?.url}`, scene);
        materialvideo.specularColor = new Color3(0, 0, 0);
        materialvideo.freeze();
        var telao = scene.getMeshByName("art_telao");
        telao.material = materialvideo;
        const linkvideo = `${data.id_video}`;
        telao.actionManager = new ActionManager(scene)
        telao.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, function () {
          // id do video no youtube
          setVideoId(linkvideo)
          setVideoIsOpen(true)
          pauseMusic()
        }))
        var logo01 = scene.getMeshByName("art_logo11");
        logo01.material = materiallogo1;
        var logo02 = scene.getMeshByName("art_logo12");
        logo02.material = materiallogo2; 

        var web = scene.getMeshByName("art_link");
        web.material = materialweb;
        const linkweb = `${data.id_web}`;
        web.actionManager = new ActionManager(scene);
        web.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, function () {
        window.open(linkweb, "_blank");
        }));
            
      
  /* Glow Highlight */
  var hl = new HighlightLayer("hl", scene, { mainTextureFixedSize: 384})

    /* Make performance better */
    scene.autoClear = false
    scene.autoClearDepthAndStencil = false
    scene.blockMaterialDirtyMechanism = true
    scene.getAnimationRatio()
    if (screen.width < 924 || screen.height < 668){
      scene.activeCamera = camera;
      camSphere.parent = camera;
    }
    else{
      scene.activeCamera = camera
      camSphere.parent = camera;
    }
    scene.gravity = new Vector3(0, -0.1, 0)//gravity
    scene.fogMode = Scene.FOGMODE_NONE
        // Intersections
        if (screen.width < 640 || screen.height < 480) {
          // Mobile
          scene.activeCamera = camera;
          camSphere.parent = camera;
          SceneOptimizerOptions.HighDegradationAllowed()
          console.log("Modo Mobile");
/*           engine.setHardwareScalingLevel(1 / window.devicePixelRatio); */
          scene.registerBeforeRender(
            function() {
              //INICIO FOR
      
             //FIM FOR 
           });
        } else {
          scene.activeCamera = camera;
          camSphere.parent = camera;
          console.log("Modo Computador");
          scene.registerBeforeRender(function(){
            if(camSphere.intersectsMesh(coltel, true)){
              telao.isPickable = true;
              cliqtelao.visibility = true;
              hl.addMesh(telao,Color3.FromHexString("#ff0000"));
              web.isPickable = true;
              cliqweb.visibility = true;
              hl.addMesh(web,Color3.FromHexString("#ff0000"));
            } else{
              telao.isPickable = false;
              {/*
              // @ts-ignore */}
              hl.removeMesh(telao,Color3.FromHexString("#ff0000"));
              {/*
              // @ts-ignore */}
              hl.removeMesh(web,Color3.FromHexString("#ff0000"));
              cliqtelao.visibility = false;
              web.isPickable = false;
              cliqweb.visibility = false;
            }
          });
        }
        
      })
    setTimeout(function(){
      var loadingScreenDiv = window.document.getElementById("loadingScreen");
      loadingScreenDiv.style.display = "none";
    }, 5000)
    } 
    return scene
  }

  /**
  * Will run on every frame render.  Useful for animation such as rotating the object along the y-axis, etc.
  */
  const onRender = () => {
  //   if (box !== undefined) {
  //     var deltaTimeInMillis = scene.getEngine().getDeltaTime()
  //     const rpm = 10
  //     box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
  //   }
  }
  
  
  return (
    <>
    <GameLoading />
    <SideMenu />
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="demo-example-02"
    />
        <Box display={!isLoading && 'none'}  w="100%" h="100%" position='absolute' zIndex="1000010" backgroundColor='rgba(80, 80, 80, 0.8)'>
          <Spinner
            mt="-50px"
            ml="-50px"
            top="50%"
            left="50%"
            position='fixed'
            display={!isLoading && 'none'}
            thickness="20px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size='xl'
            w='100px'
            h='100px'
          />   
        </Box> 
    </>
  )
}