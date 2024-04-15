enchant();

window.onload = function () {
  game = new Game(320, 320);
  game.fps = 24;
  game.preload(["chara1.gif", "icon0.gif", "bg.png", "fire.png", "win.png"]);

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

    // Adicione isto no início do seu código, após a criação do jogo
    var scoreLabel = new Label();
    scoreLabel.x = 10; // Posição x do contador na tela
    scoreLabel.y = 5; // Posição y do contador na tela
    scoreLabel.color = "black"; // Cor do texto
    scoreLabel.font = '16px "Arial"'; // Tamanho e tipo da fonte
    scoreLabel.text = "0"; // Texto inicial do contador

    game.rootScene.addEventListener("touchstart", function (e) {
      bear.x = e.localX;
    });

    game.rootScene.addEventListener("touchmove", function (e) {
      bear.x = e.localX;
    });

    game.score = 0;

    game.rootScene.addEventListener("enterframe", function () {
      if (game.frame % 6 == 0) {
        addBanana();
      }

      if (game.score >= 100) {
        victory();
      }
      if (game.score < 0) {
        game.end(game.score, game.score + " bananas capturadas!");
      }
    });

    // Atualize o texto do contador a cada quadro
    game.rootScene.addEventListener("enterframe", function () {
      scoreLabel.text = "Score: " + game.score;
    });

    game.rootScene.addChild(background);
    game.rootScene.addChild(bear);
    game.rootScene.addChild(scoreLabel); // Adiciona o contador à cena
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
      this.y += 3;
    }
  });

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
      this.y += 3;
    }
  });

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

  game.rootScene.addChild(banana);
  game.rootScene.addChild(bomba);
  if (game.score > 10 && game.score < 25) {
    game.rootScene.addChild(dinamite);
  }
  if (game.score > 25) {
    game.rootScene.addChild(morte);
    game.rootScene.addChild(estrela);
  }
}
function rand(num) {
  return Math.floor(Math.random() * num);
}

function victory() {
  // Crie um novo sprite para a imagem
  var winImage = new enchant.Sprite();

  // Defina a imagem do sprite para a imagem PNG
  winImage.image = game.assets["win.png"];

  // Ajuste a largura e a altura do sprite
  winImage.x = 22;
  winImage.y = 15;
  winImage.width = 250; // Ajuste para a largura desejada
  winImage.height = 250; // Ajuste para a altura desejada

  // Crie uma nova cena de vitória
  var victoryScene = new enchant.nineleap.SplashScene();

  // Adicione o sprite à cena
  victoryScene.addChild(winImage);

  // Adicione um ouvinte de evento para a cena de vitória
  victoryScene.addEventListener("touchend", function () {
    // Quando a cena de vitória é tocada, volte para a cena inicial
    game.replaceScene(game.startScene);
  });

  // Substitua a cena atual pela cena de vitória
  game.replaceScene(victoryScene);
}
