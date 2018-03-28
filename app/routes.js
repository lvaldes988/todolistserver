var moment = require('moment');

module.exports = function (app, database) {
  // get requestes listening to get task , 
  app.get('/', function (req, res) {
    res.render('index.ejs', {
      user: {
        name: 'Liset Valdes'
      }
    });
  });

  app.get('/get-todos', function (req, res) {
    //database.connect();
    //sending a query to retrieve informaction 
    //databae is a object 
    //is a funtio n that takes two parameters the database and the query


    database.query(
      `SELECT * FROM todos`,
      function (error, results, fields) {

        if (error) throw error;

        //console.log('results: ', results);

        res.render('todos.ejs', {
          todos: results
        });
      });

  });

  app.post('/update-todo', function (req, res) {
    var id = req.body.id;

    database.query(
      `UPDATE todos SET complete = true WHERE id = ${id}`,
      function (error, result, fields) {

        if (error) {
          console.log('error ', error);

          res.send({
            success: false,
            error: error,
            message: 'The todo was not updated :('
          });
        }
        else {
          console.log('result: ', result);

          res.send({
            success: true,
            id: id
          });
        }

      });
  });

  app.post('/delete-todo', function (req, res) {
    var id = req.body.id;

    database.query(
      `DELETE FROM todos WHERE id = ${id}`,
      function (error, result, fields) {

        if (error) {
          console.log('error ', error);

          res.send({
            success: false,
            error: error,
            message: 'The todo was not deleted :('
          });
        }
        else {
          console.log('result: ', result);

          res.send({
            success: true,
            id: id
          });
        }
      });

  });

  app.get('*', function (req, res) {
    res.render('404.ejs');
  });

}