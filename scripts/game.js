import end from "./end.js";
import GameOver from "./GameOver.js";
import GameLevel from "./GameLevel.js";
import NextLevel from "./next.js";
import GameStart from "./start.js";








/*
  A data object for every level
*/

const data1 = {
    waterCoinsX:[288, 430 , 667 , 700, 136 ,430, 750, 276 ],
    waterCoinsy:[130, 230, 220  , 130, 318, 430, 510, 606 ],
    fireCoinsX:[228, 60 , 567 , 600, 296 ,50, 650, 376 ],
    fireCoinsy:[130, 230, 220  , 130, 318, 480, 490, 606],

    walls :[
        [480, 435 , 0.8 , 450, 606,420 , 478,0.2 ], /* wallx , wally , wall scale, pad1x, pad1y ,pad2x , pad2y,pads scale*/
        [600, 305 , 0.8 , 418, 318,500 , 190,0.2 ]
    ],

    water:[[729,350],[746,348]],
    fire:[[370,188],[401,188], [47,444] ]
}



var data2 = {
    waterCoinsX:[288, 127 , 667 , 700, 136 ,430, 750, 276 ],
    waterCoinsy:[130, 600, 220  , 130, 318, 370, 510, 606 ],
    fireCoinsX:[348, 60 , 550 , 600, 296 ,50, 650, 376 ],
    fireCoinsy:[130, 350, 200  , 300, 338, 480, 500, 640],

    walls :[
        [470, 465 , 0.8 , 408, 510,  583 , 510,0.2 ],
        [215, 83 , 0.8 , 300, 222,   130 , 126,0.2 ]
    ],
    
    water:[[594,382],[625,382]],
    fire:[[241,222],[495,158], [432,382] ]
}



const data3 = {
    waterCoinsX:[288, 127 , 720 , 700, 116 ,250, 750, 276 ],
    waterCoinsy:[130, 250, 400  , 130, 400, 500, 510, 636 ],
    fireCoinsX:[228, 60 , 670 , 600, 226 ,50, 650, 376 ],
    fireCoinsy:[130, 260, 400  , 130, 400, 500, 500, 636],

    walls :[
        [424, 340 , 0.8 , 177, 253  ,475 , 382,0.2 ],
        [542, 83 , 0.8 , 713, 254   ,410 , 158,0.2 ]
    ],
    
    water:[[755,252],[243,252]],
    fire:[[525,252],[304,380], [656,508] ]
}

// levelkey,  map name , data object
var GameLevel1 = new GameLevel("level1", "tilemap1",data1);
var GameLevel2 = new GameLevel("level2", "tilemap2",data2);
var GameLevel3 = new GameLevel("level3", "tilemap3",data3);








var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  parent: "gameContainer",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [GameStart, GameLevel1, NextLevel, GameLevel2, GameLevel3,end, GameOver],
};

var game = new Phaser.Game(config);
