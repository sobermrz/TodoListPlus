var express = require("express")
var router = express.Router()
var uuid = require("node-uuid")
const fs = require("fs")
var path = require("path")
const mongoose = require("mongoose")
const model = require("./Mo")
const dns = require("dns")

// const app = express();
// const Port = process.env.Port || 4000;
// app.listen(Port,() => console.log("Server started"));
const redis = require('redis');
var client = null;
var firstConn = 'true';
const init = () => {
    var interval = setInterval(() => {
        if (firstConn) {
            dns.lookup('rediss-lb', (err, address, family) => {
                if (err) {
                    console.log('cannot get redis ip!');
                } else {
                    if (firstConn) {
                      try{
                        client = redis.createClient('80', address);
                        firstConn = false;
                      }catch(err){
                        console.log(err);
                      }
                        
                    }
                }
            });
        } else {
            clearInterval(interval);
        }
    }, 1000 * 2);
};

init();

// const PORT = process.env.PORT || 3002;
// const REDIS_PORT = process.env.PORT || 6379;

const connectDB = async () => {
  try {
      await mongoose.connect("mongodb+srv://dbUser:8012101Davy.@cluster0.09elx.mongodb.net/<dbname>?retryWrites=true&w=majority", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
      });

      console.log('MongoDB Connected...');
  } catch (err) {
      console.error(err.message);
      //Exit process with failure
      process.exit(1);
  }
};

connectDB();



// client.set(key, value);


// const todos = [
//   {
//     id: uuid.v4(),
//     name: "weibo",
//     title: "Take out the trash",
//     completed: false
//   },
//   {
//     id: uuid.v4(),
//     name: "weibo",
//     title: "Dinner with friend",
//     completed: false
//   },
//   {
//     id: uuid.v4(),
//     name: "weibo",
//     title: "finish DevOps midterm",
//     completed: false
//   }
// ]

router.get("/", function (req, res, next) {
  //=======read file========
 

  model.find()
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(err)
    })

  // res.json(todos)
})

//=======delete items======
router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  model.deleteOne({ id: req.params.id }).then(function (err) {
    if (err) console.log(err)
    
    console.log("Successful deletion")
  })

  res.json({
    id: req.params.id
  })
})

//=======add items=========
router.post("/", (req, res) => {
  const newTodo = {
    id: uuid.v4(),
    name: req.body.name,
    title: req.body.title,
    completed: req.body.completed
  }
  try {
    if (client) {
        client.set(newTodo.id, JSON.stringify(newTodo));
    }
} catch (err) {
    console.log(err);
}

const timer = () => {client.keys('*', function (err, keys) {
  keys.forEach(k => {
      client.get(k, (err, value) => {
          const data = JSON.parse(value);
          // store data
          new model(data).save();
          client.del(k);
      });
  });
}

)};

setInterval(() => {
  timer()
}, 1000 * 10);

  if (!newTodo.title) {
    return res.status(400).json({ msg: "please add a title" })
  }
  // todos.push(newTodo)
  res.json(newTodo)
})




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(todos)
});

module.exports = router;
