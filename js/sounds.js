var sfx = {
  loos: new Howl({
    src: ["sounds/loos.mp3"],
  }),
  won: new Howl({
    src: ["sounds/won.mp3"],
  }),
  won: new Howl({
    src: ["sounds/won.mp3"],
  }),
  gameOver: new Howl({
    src: ["sounds/gameOver.mp3"],
  }),
  goal: new Howl({
    src: ["sounds/goal.mp3"],
    loop: false,
    onend: function () {
      console.log("Done playing sfx!");
    },
  }),
};
