module.exports = function(io) {  
  var sockets = io.sockets;  
  var crypto = require('crypto');
  sockets.on('connection', function(client) {
      var session = client.handshake.session, usuario = session.usuario;
      
      client.on('send-server', function(msg) {
        var msg = require('path').join('<b>', data.nome, ':</b>', data.msg, '<br>');
        client.get('sala', function(erro, sala) {
          var data = {email: usuario.email, sala: sala};
          client.broadcast.emit('new-message', data);
          sockets.in(sala).emit('send-client', msg);
        });
        //client.emit('send-client', msg);
        //client.broadcast.emit('send-client', msg);
      });

      client.on('join', function(sala) {  
        if(sala) {
          sala = sala.replace('?', '');
        } else {
          var timestamp = new Date().toString();
          var md5 = crypto  .createHash('md5');
          sala = md5.update(timestamp).digest('hex');
        }
        client.set('sala', sala);
        client.join(sala);
      });

      client.on('disconnect', function () {
        client.get('sala', function(erro, sala) {
          client.leave(sala);
        });
      });

  });
};