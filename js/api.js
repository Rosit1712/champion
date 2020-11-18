const API_KEY = "8213539933724cbd82143ae0ecac579f";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2001;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings?standingType=TOTAL`;
const ENDPOINT_CL = `${BASE_URL}competitions/${LEAGUE_ID}/scorers`;
const ENDPOINT_MATCH = `${BASE_URL}competitions/${LEAGUE_ID}/matches?status=FINISHED`;
const ENDPOINT_SCHE = `${BASE_URL}competitions/${LEAGUE_ID}/matches?status=SCHEDULED`;
const ENDTEAM = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
// let homeLoad = document.getElementById('homeStandings');
// homeLoad.innerHTML = `<img src="/icon/loading.gif">`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log(`Error: ${res.status}`);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};
let team;
if ("caches" in window) {
    caches.match(ENDTEAM)
        .then(response => {
            if (response) {
                response.json()
                    .then(data => {
                        team = data;               
                    })
            }
        })
}
fetchAPI(ENDTEAM)
    .then(data => {
        team = data;
    })
    .catch(error => {
        console.log(error);
    });
function getGroup() {
    document.getElementById('homeStandings').innerHTML = `<img src="/icon/loading.svg" class="img-center">`;
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            document.getElementById('homeStandings').innerHTML = ``;
                            showGroup(data);                
                        })
                }
            })
    }
    document.getElementById('homeStandings').innerHTML = `<img src="/icon/loading.svg" class="img-center">`;
    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            document.getElementById('homeStandings').innerHTML = ``;
            showGroup(data);
        })
        .catch(error => {
            console.log(error);
        });
}

function showGroup(data) {
    let standingElement =  document.getElementById("homeStandings");
    data.standings.forEach(loc => {
    let stands = '';
        // if (loc.type ==='TOTAL') {
            loc.table.forEach(stan => {
                stands += `
                <tr>
                    <td class="nameClub"><img src="${stan.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="15px" alt="badge"/>${stan.team.name}</td>
                    <td>${stan.won}</td>
                    <td>${stan.draw}</td>
                    <td>${stan.lost}</td>
                    <td>${stan.points}</td>
                </tr>
                `;
            });
            standingElement.innerHTML += `
            <h5 id="#${loc.group.substr(6, 6)}">${loc.group.substr(0, 5)} ${loc.group.substr(6, 6)}</h5>
            <div class="card col s12">
                <table class="striped">
                    <thead>
                        <tr>
                            <th>Club</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${stands}
                    </tbody>
                </table>
            </div>
            `;
        // }
    });
}

function getScore() {
    document.getElementById('topscore').innerHTML = `<img src="/icon/loading.svg" class="img-center">`;
    fetchAPI(ENDPOINT_CL)
        .then(data => {
            document.getElementById('topscore').innerHTML = ``;
            showScore(data);
        })
        .catch(error => {
            console.log(error);
        })
}

function showScore(data) {
    let elScore = document.getElementById('topscore');
    let scorer = '';
    let i = 1;
    data.scorers.forEach(score => {
        scorer += `
        <tr>
            <td>${i++}</td>
            <td>${score.player.name}</td>
            <td>${score.team.name}</td>
            <td>${score.numberOfGoals}</td>
        </tr>
        `;
    });
    elScore.innerHTML = `
    <table class="striped">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Club</th>
                        <th>Goals</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${scorer}
                    </tbody>
                </table>
    `;

}
let scheduled;
function getMatchRes() {
    document.getElementById('match').innerHTML = `<img src="/icon/loading.svg" class="img-center">`;
    if ("caches" in window) {
        caches.match(ENDPOINT_MATCH)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            document.getElementById('match').innerHTML = ``;
                            showMatch(data);
                        })
                }
            })
    }
    fetchAPI(ENDPOINT_MATCH)
        .then(data => {
            document.getElementById('match').innerHTML = ``;
            showMatch(data);
        })
        .catch(error => {
            console.log(error);
        }); 
}

function getMatchSche() {
    document.getElementById('scheduled').innerHTML = `<img src="/icon/loading.svg" class="img-center">`;
    if ("caches" in window) {
        caches.match(ENDPOINT_SCHE)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            document.getElementById('scheduled').innerHTML = ``;
                            showSche(data);        
                            scheduled = data;
                        })
                }
            })
    }    
    fetchAPI(ENDPOINT_SCHE)
        .then(data => {
            document.getElementById('scheduled').innerHTML = ``;
            showSche(data);
            scheduled = data;
        })
        .catch(error => {
            console.log(error);
        });  
}

function showMatch(data) {
    let result = document.getElementById('match');
    for (let index = data.matches.length-1; index >= data.matches.length-10; index--) {
        let date = new Date(data.matches[index].utcDate);
        let homeCrestUrl;
        let awayCrestUrl;
        for (let loc = 0; loc < team.teams.length; loc++) {
            if (team.teams[loc].id === data.matches[index].homeTeam.id) {
                homeCrestUrl = team.teams[loc].crestUrl; 
            }
            if (team.teams[loc].id === data.matches[index].awayTeam.id) {
                awayCrestUrl = team.teams[loc].crestUrl;
            }    
        }

        result.innerHTML += `
        <div class="card col s12">
            <div class=""card-content>
                <div class="container">
                    <div class="row flow-text position home">
                        <div class="col s12 center">
                            <div class="text">${data.matches[index].homeTeam.name}</div>
                            <img src="${homeCrestUrl.replace(/^http:\/\//i, 'https://')}" alt="img-sche">   
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row flow-text">
                        <div class="col s12 center">
                            <div class="text">${data.matches[index].score.fullTime.homeTeam}</div>
                        </div>
                        <div class="col s12 center activator">
                            <span class="btn-floating btn-small waves-effect waves-light red"><i class="small material-icons">more_vert</i></span>
                        </div>
                        <div class="col s12 center">
                            <div class="text">${data.matches[index].score.fullTime.awayTeam}</div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row flow-text position away">
                        <div class="col s12 center">
                            <img src="${awayCrestUrl.replace(/^http:\/\//i, 'https://')}" alt="img-sche">
                            <div class="text">${data.matches[index].awayTeam.name}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Matchday ${data.matches[index].matchday}<i class="material-icons right">close</i></span>
                <table>
                <tr>
                    <td>Stage</td>
                    <td>${data.matches[index].stage.substr(0, 5)} ${data.matches[index].stage.substr(6, 11)}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>${days[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} 0${date.getHours()}:${date.getMinutes()} AM</td>
                </tr>
                </table>
            </div>
        </div>
        `;
    }
}

function showSche(data) {
    let result = document.getElementById('scheduled');
    data.matches.forEach(upcom => {
      let date = new Date(upcom.utcDate);
      let homeCrestUrl;
      let awayCrestUrl;
      for (let loc = 0; loc < team.teams.length; loc++) {
          if (team.teams[loc].id === upcom.homeTeam.id) {
              homeCrestUrl = team.teams[loc].crestUrl; 
          }
          if (team.teams[loc].id === upcom.awayTeam.id) {
              awayCrestUrl = team.teams[loc].crestUrl;
          }
      }
    //   console.log(upcom);
        result.innerHTML += `
        <div class="card col s12">
            <div class=""card-content>
                <div class="container">
                    <div class="row flow-text position home">
                        <div class="col s12 center">
                            <div class="text">${upcom.homeTeam.name}</div>
                            <img src="${homeCrestUrl}" alt="img-sche">   
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col s6 right-align">
                            <a class="btn-floating btn-small waves-effect waves-light red add" id="${upcom.id}"><i class="small material-icons">add</i></a>
                        </div>
                        <div class="col s6 left-align activator">
                            <span class="btn-floating btn-small waves-effect waves-light red"><i class="small material-icons">more_vert</i></span>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row flow-text position away">
                        <div class="col s12 center">
                            <img src="${awayCrestUrl}" alt="img-sche">
                            <div class="text">${upcom.awayTeam.name}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Matchday ${upcom.matchday}<i class="material-icons right">close</i></span>
                <table>
                <tr>
                    <td>Stage</td>
                    <td>${upcom.stage.substr(0, 5)} ${upcom.stage.substr(6, 11)}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>${days[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} 0${date.getHours()}:${date.getMinutes()} AM</td>
                </tr>
                </table>
            </div>
        </div>
        `;
    });
    const btnAdd = document.querySelectorAll('.add');
    btnAdd.forEach(el => {
        document.getElementById(el.id).addEventListener('click', () => {
            added(parseInt(el.id));
            document.getElementById(el.id).innerHTML = `<i class="small material-icons">check</i>`;
            document.getElementById(el.id).removeEventListener('click', () => console.log('terhapus'));
            document.getElementById(el.id).removeAttribute('id');

        });
    });
}

function added(id) {
    for (let index = 0; index < scheduled.matches.length; index++) {
        if (scheduled.matches[index].id === id) {
            savedMatch(scheduled.matches[index]);
            for (let loc = 0; loc < team.teams.length; loc++) {
                if (team.teams[loc].id === scheduled.matches[index].homeTeam.id) {
                    let home = team.teams[loc];
                    savedListClub(home);
                }
                if (team.teams[loc].id === scheduled.matches[index].awayTeam.id) {
                    let away = team.teams[loc];
                    savedListClub(away);
                }      
            }
        }
    }
}

function getSavedScheduled() {
    let result = document.getElementById('savedsche');
    let i = 0;
    getAll()
        .then(match => {
            if (match.length === 0) {
                result.innerHTML = `
                <div class="row">
                    <div class="col s12">
                        <div class="card z-depth-0">
                            <div class="card-content center">
                            <i class="large material-icons">info</i>
                            <p class="flow-text">No Schedule Match Found</p>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            } else {
                match.forEach(upcom => {
                    let date = new Date(upcom.utcDate);
                    result.innerHTML += `
                    <div class="card col s12" id="${i += 1}">
                        <div class=""card-content>
                            <div class="container">
                                <div class="row flow-text position home">
                                    <div class="col s12 center" id="${upcom.homeTeam.id}">
                                        <div class="text">${upcom.homeTeam.name}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                <div class="row">
                                    <div class="col s6 right-align">
                                        <a class="btn-floating btn-small waves-effect waves-light red" id="${upcom.id}" onclick="del(${upcom.id})""><i class="small material-icons">remove</i></a>
                                    </div>
                                    <div class="col s6 left-align activator">
                                        <span class="btn-floating btn-small waves-effect waves-light red"><i class="small material-icons">more_vert</i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                <div class="row flow-text position away">
                                    <div class="col s12 center" id="${upcom.awayTeam.id}">
                                        <div class="text">${upcom.awayTeam.name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">Matchday ${upcom.matchday}<i class="material-icons right">close</i></span>
                            <table>
                            <tr>
                                <td>Stage</td>
                                <td>${upcom.stage.substr(0, 5)} ${upcom.stage.substr(6, 11)}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>${days[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} 0${date.getHours()}:${date.getMinutes()} AM</td>
                            </tr>
                            </table>
                        </div>
                    </div>
                    `;
                    getAllClub().then(club => {
                        let homeCrestUrl, awayCrestUrl;
                        club.forEach(cl => {
                            if (cl.id === upcom.homeTeam.id) {
                                homeCrestUrl = cl.crestUrl;
                            }
                            if (cl.id === upcom.awayTeam.id) {
                                awayCrestUrl = cl.crestUrl;
                            }
                        });
                        document.getElementById(`${upcom.homeTeam.id}`).innerHTML += `
                        <img src="${homeCrestUrl}">
                        `;
                        let aw = document.getElementById(`${upcom.awayTeam.id}`);
                        aw.insertAdjacentHTML('afterbegin', `<img src="${awayCrestUrl}">`);
                    });
                });
                let card = document.querySelectorAll('#savedsche .card');
                card.forEach(el => {
                    document.getElementById(el.id).addEventListener('click', () => {
                        document.getElementById(el.id).remove();
                        let cardClick = document.querySelectorAll('#savedsche .card');
                        if (cardClick.length < 1) {
                            result.innerHTML = `
                            <div class="row">
                                <div class="col s12">
                                    <div class="card z-depth-0">
                                        <div class="card-content center">
                                        <i class="large material-icons">info</i>
                                        <p class="flow-text">No Schedule Match Found</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                        }
                    });
                });
            }
        });
}

function del(id) {
    getAll()
        .then(match =>{
            match.forEach(listMatch => {
                if (listMatch.id === id) {
                    delMatch(id);
                    getAllClub()
                        .then(club => {
                            club.forEach(cl => {
                                if (cl.id === listMatch.homeTeam.id) {
                                    delTeam(cl.id);
                                }
                                if (cl.id === listMatch.awayTeam.id) {
                                    delTeam(cl.id);
                                }
                            });
                        });
                }
            });
        });
}