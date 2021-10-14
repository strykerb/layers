title = "LAYERS";


description = `
Click to make a 
sound. Each new 
layer has a new 
sound. Build up 
sounds in layers 
to make a song.
`;

characters = [];


options = {
  viewSize: { x: 200, y: 100 },
  isPlayingBgm: true,
  seed: rndi(100),

};

const S = {
  LOOP_LENGTH: 600,

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
    console.log("nect layer");
    if (currLayer >= sounds.length){
      CompleteSong();
    } else {
      currLayer++;
    }
    console.log(layers);
  }

  CheckPrevLayers();
}

function addKeyStrokeToLayer(){
  layers[currLayer].inputs.push(ticks);
  console.log("adding " + ticks + " to layer " + currLayer);
}

function CheckPrevLayers(){
  let idx = 0;
  layers.forEach(layer => {
    let timeStamp = ticks % S.LOOP_LENGTH;
    if (layer.inputs[0] == timeStamp){
      play(sounds[idx]);
      // dequeue and requeue this sound if 
      layer.inputs.push(layer.inputs.shift());
    }
    idx++;
  });
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
