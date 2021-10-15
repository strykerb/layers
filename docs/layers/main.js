title = "LAYERS";


description = `
Click to make a sound.
Your sounds will loop.
Use loops to make a song.
`;

characters = [];


options = {
  viewSize: { x: 200, y: 100 },
  isPlayingBgm: true,
  seed: rndi(100),
};

const S = {
  LOOP_LENGTH: 480,

}
 
 /**
  * @type { SoundEffectType[] }
  */
let sounds;

/**
 * @typedef {{
  * inputs: number[]
  * }} Layer
  */

/**
  * @type { Layer[] }
  */
let layers;
let currLayer = 0;


function update() {
  if (!ticks) {
    Initialize();
  }
  
  if(input.isJustPressed){
    addKeyStrokeToLayer();
    play(sounds[currLayer]);
    console.log(ticks);
  }
  
  // Move to next layer
  if (floor(ticks/S.LOOP_LENGTH) > currLayer){
    if (currLayer >= sounds.length){
      CompleteSong();
    } else {
      currLayer++;
      console.log("Layer " + currLayer);
    }
  }

  CheckPrevLayers();
}

function addKeyStrokeToLayer(){
  layers[currLayer].inputs.push(ticks % S.LOOP_LENGTH);
}

function CheckPrevLayers(){
  let i;
  let timeStamp = ticks % S.LOOP_LENGTH;
  for(i = 0; i < layers.length; i++){
    if (layers[i].inputs[0] == timeStamp){
      
      play(sounds[i]);
      
      // dequeue and requeue this sound
      layers[i].inputs.push(layers[i].inputs.shift());
    }
  }
  
}

function CompleteSong(){
  console.log("song done");
}

function Initialize(){
  console.log(options.seed);
  sounds = [ "coin", "laser", "explosion", "powerUp", "hit", "jump", "select"];
  layers = times(sounds.length, () => {
    return {
        inputs: []
    };
  });
  console.log(layers);
  //layers[0] = {inputs: []};
}
