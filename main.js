enchant();

window.onload = function () {
  game = new Game(320, 320);
  game.fps = 24;
  game.preload(["chara1.gif", "icon0.gif", "bg.png", "win.png"]);

  game.onload = function () {
    bear = new Sprite(32, 32);
    bear.x = 0;
    bear.y = 240;
    bear.width = 32;
    bear.height = 32;

    bear.image = game.assets["chara1.gif"];
    bear.frame = 0;

    background = new Sprite(320, 320);
    background.x = background.y = 0;
    background.image = game.assets["bg.png"];

    var scoreLabel = new Label();
    scoreLabel.x = 10;
    scoreLabel.y = 5;
    scoreLabel.color = "black";
    scoreLabel.font = '16px "Arial"';
    scoreLabel.text = "0";

    game.rootScene.addEventListener("touchstart", function (e) {
      bear.x = e.localX;
    });

    game.rootScene.addEventListener("touchmove", function (e) {
      bear.x = e.localX;
    });

    game.score = 0;
    game.rootScene.addEventListener("enterframe", function () {
      if (game.frame % 10 == 0) {
        if (game.score >= 0 && game.frame % 5 == 0) {
          addBanana();
        }
        if (game.score >= 3 && game.frame % 5 == 0) {
          addBomba();
        }
        if (game.score >= 15 && game.frame % 15 == 0) {
          addDinamite();
        }
        if (game.score > 20 && game.frame % 12 == 0) {
          addMorte();
        }
        if (game.score > 30 && game.frame % 18 == 0) {
          addEstrela();
        }
      }
      if (game.score >= 100) {
        victory();
      } else if (game.score < 0) {
        game.end(game.score, game.score + " bananas capturadas!");
      }
    });

    game.rootScene.addEventListener("enterframe", function () {
      scoreLabel.text = "Score: " + game.score;
    });

    game.rootScene.addChild(background);
    game.rootScene.addChild(bear);
    game.rootScene.addChild(scoreLabel);
  };
  game.start();
};

function addBanana() {
  var banana = new Sprite(16, 16);
  banana.x = rand(320);
  banana.y = 0;
  banana.image = game.assets["icon0.gif"];
  banana.frame = 16;

  banana.addEventListener("enterframe", function (e) {
    if (this.intersect(bear)) {
      game.rootScene.removeChild(this);
      game.score++;
    } else {
      this.y += 6;
    }
  });

  game.rootScene.addChild(banana);
}

function addEstrela() {
  var estrela = new Sprite(16, 16);
  estrela.x = rand(320);
  estrela.y = 0;
  estrela.image = game.assets["icon0.gif"];
  estrela.frame = 30;

  estrela.addEventListener("enterframe", function (e) {
    if (this.intersect(bear)) {
      game.rootScene.removeChild(this);
      game.score += 3;
    } else {
      this.y += 5;
    }
  });
  game.rootScene.addChild(estrela);
}

function addMorte() {
  var morte = new Sprite(16, 16);
  morte.x = rand(320);
  morte.y = 0;
  morte.image = game.assets["icon0.gif"];
  morte.frame = 11;

  morte.addEventListener("enterframe", function (e) {
    if (this.intersect(bear)) {
      game.rootScene.removeChild(this);
      game.score -= 10;
    } else {
      this.y += 5;
    }
  });
  game.rootScene.addChild(morte);
}

function addBomba() {
  var bomba = new Sprite(16, 16);
  bomba.x = rand(320);
  bomba.y = 0;
  bomba.image = game.assets["icon0.gif"];
  bomba.frame = 24;

  bomba.addEventListener("enterframe", function (e) {
    if (this.intersect(bear)) {
      game.rootScene.removeChild(this);
      game.score--; // Reduz a pontuação quando a bomba toca o personagem
    } else {
      this.y += 4;
    }
  });
  game.rootScene.addChild(bomba);
}

function addDinamite() {
  var dinamite = new Sprite(16, 16);
  dinamite.x = rand(320);
  dinamite.y = 0;
  dinamite.image = game.assets["icon0.gif"];
  dinamite.frame = 26;

  dinamite.addEventListener("enterframe", function (e) {
    if (this.intersect(bear)) {
      game.rootScene.removeChild(this);
      game.score -= 2;
    } else {
      this.y += 3;
    }
  });

  game.rootScene.addChild(dinamite);
}

function rand(num) {
  return Math.floor(Math.random() * num);
}

function victory() {
  
  var winImage = new enchant.Sprite();

  
  winImage.image = game.assets["win.png"];

 
  winImage.x = 22;
  winImage.y = 15;
  winImage.width = 250; 
  winImage.height = 250; 

  
  var victoryScene = new enchant.nineleap.SplashScene();

  
  victoryScene.addChild(winImage);

  
  victoryScene.addEventListener("touchend", function () {
    
    game.replaceScene(game.startScene);
  });

  
  game.replaceScene(victoryScene);
}