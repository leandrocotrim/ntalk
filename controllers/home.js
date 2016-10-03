module.exports = function (app) {

  // var Usuario = app.models.usuario;

  var HomeController =
    {
      index: function (req, res) {
        res.render('home/index.ejs');
      },
      login: function (req, res) {
        var email = req.body.email, nome = req.body.nome;
        if (email && nome) {
          var usuario = req.body;
          usuario['contatos'] = [];
          req.session.usuario = usuario;
          res.redirect('/contatos');
        }
        else res.redirect('/');
      },
      logout: function (req, res) {
        req.session.destroy();
        res.redirect('/');
      }
    };
  return HomeController;
};