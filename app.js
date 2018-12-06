var Joi = require('joi');
var express = require('express');
var app = express();
// now also add mongodb to int
//simply add a mongo client and the url of mongodb-270
//var MongoClient=require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017mydb";
/*
MongoClient.connect(url, function(err, db)){
  if(err) throw err;
  console.log('Database created');
  db.close();
}
*/
app.use(express.json());

const courses=[
  { id:1, name:'course1'},
  { id:2, name:'course2'},
  { id:3, name:'course3'},
];

app.get('/', function (req, res) {
    res.send('Hello World!');
    });

app.get('/api/courses', function (req, res){
  res.send(courses);
});
/*
app.get('/api/courses/:id',function (req, res){
  Joi.validate(name,schema);
  const course = courses.find( c=> c.id == parseInt(req.params.id));
  if(!course) res.status(404).send('ID not found');
  res.send(course);
});
*/
app.post('/api/courses', (req, res) => {
  const schema={
    name : Joi.string().min(3).required()
  };

  const result=Joi.validate(req.body, schema)

  console.log(result);

  if(result.error){
    //show that it's a bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id : courses.length+1,
    name : req.body.name
  };
  courses.push(course);
  res.send(course);
  console.log(`entered the data ${name}`)
});

app.put('/api/courses/:id',(req,res) => {
  const schema={
    name: Joi.string().min(3).required()
  };

  //look up
  //if not - 404 not found
  const course = courses.find(c => c.id == parseInt(req.params.id));
  if(!course) res.status(404).send("Not found");

  //validate
  //not correct - 400 bad request
  const result = Joi.validate(req.body,schema);

  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }

  //update
  //return the updated course - 200 ok
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
  /*const schema={
    name : Joi.string().min(3).required()
  };
  */
  const course = courses.find(c => c.id == parseInt(req.params.id));
  if(!course) return res.status(404)

  const result = Joi.validate(req.body, schema);

  /*
  if(result.error){
    res.status(400).send(result.error)//.details[0].message);
    return;
  }
  */

  courses.splice(course, 1);
  res.send(course);
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
    });
