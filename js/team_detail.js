document.addEventListener("DOMContentLoaded", function () {
        if ("indexedDB" in window) {
          var urlParams = new URLSearchParams(window.location.search);
          var id = Number(urlParams.get("id"));
 
          var isFavorit = false;
 
          cekData("team_favorit", id)
            .then(msg => {
              document.getElementById("iconFav").innerHTML = "favorite";
              getSavedDataById("tim");
              isFavorit = true;
            })
            .catch(msg => {
              document.getElementById("iconFav").innerHTML = "favorite_border";
              getDetailTeam();
              isFavorit = false;
            });
 
          var iconFav = document.getElementById("iconFav");
 
          iconFav.onclick = function () {
            if (isFavorit) {
              deleteData("team_favorit", id);
              isFavorit = false;
            } else {
              item = getDetailTeam();
              item.then(function (tim) {
                saveData("tim", tim);
              });
              isFavorit = true;
            }
          };
        }
      },
      false
    );