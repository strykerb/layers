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
  HOLD_BUTTON_THRESHOLD: 100,
}
 
 /**
  * @type { SoundEffectType[] }
  */
let sounds = [ "coin", "laser", "explosion", "powerUp", "hit", "jump", "select"];

/**
 * @typedef {{
  * inputs: number[]
  * }} Layer
  */

/**
  * @type { Layer[] }
  */
let layers;

let descriptionA = [
  "chilly",
  "frigid",
  "frosty",
  "refreshing",
  "air-conditioned",
  "arctic",
  "chilling",
  "refrigerated",
  "cold",
  "sick",
]

let descriptionB = [
  "anthem",
  "ballad",
  "chant",
  "chorus",
  "hymn",
  "lullaby",
  "melody",
  "piece",
  "shanty",
  "tune",
  "verse",
  "beat",
]


let currLayer = 0;
let buttonDuration = 0;

function update() {
  if (!ticks) {
    Initialize();
  }
  
  if(input.isJustPressed){
    addKeyStrokeToLayer();
    play(sounds[currLayer]);
    console.log(ticks);
  }

  if (input.isPressed){
    buttonDuration++;
  } else {
    buttonDuration = 0;
  }

  // Quit game if player holds the button
  if (buttonDuration >= S.HOLD_BUTTON_THRESHOLD){
    buttonDuration = 0;
    // Randomize game over text
    end("What a " + descriptionA[rndi(descriptionA.length)] + " " + descriptionB[rndi(descriptionB.length)] + "!");
  }

  // Move to next layer if current loop is finished
  if (floor(ticks/S.LOOP_LENGTH) > currLayer){
    if (currLayer >= sounds.length){
      CompleteSong();
    } else {
      currLayer++;
      console.log("Layer " + currLayer);
    }
  }

  // Play previous sounds from this time stamp
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
  // TO-DO: Stop taking input once we reach this point
  // TO-DO: Add text saying to hold button to quit
  
  console.log("song done");
}

function Initialize(){
  console.log(options.seed);
  
  // Initialize 2D Array of timestamps
  layers = times(sounds.length, () => {
    return {
        inputs: []
    };
  });
  console.log(layers);
}
