function teamDataFavorit(data) {

    var teamDataFavoritHTML = ''

    data.forEach(function (team) {

        teamDataFavoritHTML += `
                <div class="col s12 m8 offset-m2 l6">
                <div class="card-panel grey lighten-5 z-depth-1">
                <div class="row valign-wrapper">
                    <div class="col s4">
                    <img src="${team.crestUrl}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
                    </div>
                    <div class="col s10">
                        <span class="card-title">${team.name}</span>
                        <p>${team.address}</p>
                    </div>
                </div>
                </div>
            </div>
            
        `
    });

    // Sisipkan komponen card ke dalam elemen dengan id divFavorit
    document.getElementById("favorit").innerHTML = teamDataFavoritHTML;
}