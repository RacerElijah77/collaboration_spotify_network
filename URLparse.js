/* variables */
var address = "https://open.spotify.com/track/20O48JTG6O46tPAuZbliRA?si=fd83815b5d224bee"; //input address (URL)
var stringarray1;
var stringarray2;
var product;

/* splits the URL between each slash */
stringarray1 = address.split("/");
stringarray2 = stringarray1[4].split("?");
console.log(stringarray2[0]);