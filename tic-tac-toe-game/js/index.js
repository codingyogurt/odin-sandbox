const playerFactory = (name, marker, selections) => {
  return { name, marker, selections };
};

const gameBoardManager = (() => {
  const boardItems = document.querySelectorAll(".game-board-item");

  // adds all listeners to clickables
  const addListeners = () => {
    // listeners for the grid items
    boardItems.forEach(item => {
      item.addEventListener("click", () => {
        const itemChild = item.firstElementChild;
        if (!itemChild.classList.contains("locked")) {
          itemChild.className = gameManager.currentPlayer().marker + " locked";
          gameManager.switchPlayers();
          document.querySelector(".banner-text").textContent =
            gameManager.currentPlayer().name + "'s Turn";
          document.querySelector(
            "#marker"
          ).className = gameManager.currentPlayer().marker;
        }
      });
    });
    // listener for the reset button
    document.querySelector("#reset-btn").addEventListener("click", () => {
      // note do not re-add listeners!
    });
    // listener for settings button
    document.querySelector("#settings-btn").addEventListener("click", () => {
      document.querySelector(".settings").style.display = "unset";
    });
    // listener for settings save button
    document.querySelector("#save").addEventListener("click", () => {
      document.querySelector(".settings").style.display = "none";
      gameInit();
      gameManager.gameInit();
    });
  };

  // initialize board ui
  const gameInit = () => {
    // clear board
    boardItems.forEach(item => {
      item.firstElementChild.className = "";
    });
    // reset the score board
    const boardStats = document.querySelectorAll(".stat p");
    boardStats.forEach(item => {
      item.textContent = "0 wins";
    });
    // set current player in banner
    document.querySelector(".banner-text").textContent =
      gameManager.currentPlayer().name + "'s Turn";
    document.querySelector(
      "#marker"
    ).className = gameManager.currentPlayer().marker;

    // reset player cue in the bottom
    // todo
  };

  return { gameInit, addListeners };
})();

const gameManager = (() => {
  // scores counters
  let xScore = 0,
    yScore = 0;
  // player objects
  let p1, p2;
  // monitoring variable
  let isP1;

  // init method
  const gameInit = () => {
    // get names from DOM
    const p1name = document.querySelector("#p1-name").value;
    const p2name = document.querySelector("#p2-name").value;
    // get markers from DOM
    const p1marker = document.querySelector("#p1-marker").className;
    const p2marker = document.querySelector("#p2-marker").className;
    // set to players
    p1 = playerFactory(p1name, p1marker, []);
    p2 = playerFactory(p2name, p2marker, []);
    // set player 1 as first player
    isP1 = true;

    // call gameboard manager, clear ui
    gameBoardManager.gameInit();
  };

  // returns the player object who is in turn
  const currentPlayer = () => {
    // true = p1, false = p2
    return isP1 ? p1 : p2;
  };

  // switches players
  const switchPlayers = () => {
    // switches currentPlayer at call
    isP1 = !isP1;
  };

  return { gameInit, currentPlayer, switchPlayers };
})();

gameManager.gameInit();
gameBoardManager.addListeners();
