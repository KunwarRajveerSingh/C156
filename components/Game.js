AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },    
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 120;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    var timer = setInterval(countDown, 1000);

    function countDown() {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } 
      else {
        clearInterval(timer);
        this.gameover()        
      }
    }
  },
  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible", false)
        this.updatescore()
          this.updatetargets()
        
      } else {
        this.gameover()
      }
    });
  },
  updatetargets: function(){
    const element = document.querySelector("#targets")
    var count = element.getAttribute("text").value
    let currenttargets = parseInt(count)
    currenttargets -= 1
    element.setAttribute("text",{
      value:currenttargets
    })
  },
  updatescore: function(){
    const element = document.querySelector("#score")
    var count = element.getAttribute("text").value
    let currentscore = parseInt(count)
    currentscore += 50
    element.setAttribute("text",{
      value:currentscore
    })
  },
  gameover: function(){
    var planeEl = document.querySelector("#plane_model")
    var element = document.querySelector("#gameovertext")
    element.setAttribute("visible", true)
    planeEl.setAttribute("dynamic-body",{
      mass: 1
    })
  }
});
