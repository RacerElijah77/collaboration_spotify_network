const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQBjiA15tHpNHpK6OUyf1E2BBey156NLwBAHlhvQJZUots9krwojD0NmyHD_ZOX4KpGUHfh4tnOQKJ00cAs4Zrol5oTcFP0564hWQM4scDQ0BWAMtWiOafMbY1LuZV0-1w9bz0j80uRzECrJuJJ1aT2X1OlHylSuzKWUANcY7nAVqUHlRVqICpUxQ_BWaGMAEIncsR6T9V4-YG0PH8MpGn0DTBZpsk8VY6DmyW6kokYQF3HE_cSodgWnyQRzH_RO-nn8qHfWBrrWuf7BoaULN9kETtwrhcTuxSsx_mgJTvbVs8A8tVanGsrz";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
async function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    //console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    //console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    //console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

//getMyData();
function iterateAlbums(artistID){
    i = 0;
    var albumsKnown = [];
spotifyApi.getArtistAlbums(artistID).then(
    
    function(data) {
        
        //console.log('Artist Albums One Time', data.body.items[0]["name"]);
        for(i in data.body.items){
        if(data.body.items[i]["name"]!=null){
            if(!albumsKnown.includes(data.body.items[i]["uri"])){
                //console.log('Artist albums', data.body.items[i]["uri"].split(":")[2]);
                albumsKnown.push(data.body.items[i]["uri"].split(":")[2]);
                //console.log("Len",albumsKnown.length);
        }
        i++;
    }
}
    for (ID in albumsKnown){
        console.log("ID:",albumsKnown[ID]);
    getArtistsGivenAlbum(albumsKnown[ID]);
    }
    },
    function(err) {
      console.error(err);
    }
  );
  
  //console.log(albumsKnown.length);
  var testlist = [1,2,3,4,5];
  for (i in testlist){
      //console.log(i);
  }
  //i = 0;
  //while(data.body.items[i]["name"]!=null){
    //console.log('Artist albums', data.body.items[i]["name"]);
  //}
  //console.log('Artist Albums One Time', data.body.items[0]["name"]);
}

function getCollaborators(artist){
    /*spotifyApi.getArtistAlbums('64tNsm6TnZe2zpcMVMOoHL').then(
        function(data) {
            for (i in data.body.items){
                onsole.log('Artist albums', data.body.items[i].name);
            }
        },
        
      );*/
      var data =  spotifyApi.getArtistAlbums(artist);
      for (i in data.body){
        console.log('Artist albums', data.body.items[i].name);
        }
    //console.log(data.body);
};
//iterateAlbums("64tNsm6TnZe2zpcMVMOoHL");//AIC
iterateAlbums("0ONHkAv9pCAFxb0zJwDNTy");//Pusha-T

//getArtistsGivenAlbum("07bIdDDe3I3hhWpxU6tuBp");
// //GET SONGS FROM PLAYLIST
async function getArtistsGivenAlbum(albumID){
    console.log("Start");
    var thing = {};
    
   spotifyApi
  //.getAlbum('20r762YmB5HeofjMCiPMLv')
  //.getAlbum("07bIdDDe3I3hhWpxU6tuBp") //daytona
  //.getAlbum("1o31VAqq2nAW0uGAGLs5YD")
  .getAlbum(albumID)
	.then(function(data) {
    return data.body.tracks.items.map(function(t) {
	return t.id;
    });
    })
    
  .then(function(trackIds) {
    return spotifyApi.getTracks(trackIds);
  })
    
  .then(function(data) {
      return data.body;
      
  })
	.then(function(traObj){
	    return traObj.tracks.map(function(t) {
		return t.artists
	    });
	})
	.then(function(arts) {
	    var recordedArtists = [];
      for(var i in arts){
        j=0;
        while ((arts[i][j])!=null){
            //console.log("while");
          if(!recordedArtists.includes(arts[i][j]["name"])){
            console.log("Colabs:",(arts[i][j]["name"]));
            console.log("HTML:",(arts[i][j]["external_urls"]["spotify"]));
            console.log("ID:",(arts[i][j]["id"]))
            recordedArtists.push(arts[i][j]["name"]);
            
          }
          j++;
        }   
    }   
	})
	.then(function(b) {
	    //console.log(b);
	})  
  .catch(function(error) {
    console.error(error);
  });
  let tracks = [];
  console.log("---------------+++++++++++++++++++++++++")
}