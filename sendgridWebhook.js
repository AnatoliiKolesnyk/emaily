var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'njkzyrhfcfdflflflf' }, function(err, tunnel) {
  console.log('LT running on ' + tunnel.url);
});
