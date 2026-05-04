const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect("mongodb+srv://brightfutureacadseason3_db_user:kEwLvQuFpehkB2AN@cluster0.zy9u1zm.mongodb.net/?appName=Cluster0").then(()=>{
    console.log("mongodb connected")
}).catch(err => console.log("connection error", err))

const datas = new mongoose.Schema({
    name:String,
    mail:String,
    password:String
})

const userdata = mongoose.model("userdata", datas)


app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "./public/login.html"))
})

app.get("/register", (req, res)=>{
    res.sendFile(path.join(__dirname, "./public/register.html"))
})

app.post("/register", async(req,res)=>{
    const {username, usermail, password} = req.body
    // console.log(usermail, username, password)
     const hash1 = await bcrypt.hash(password, 10)
    try{

        const exist = await userdata.findOne({mail:usermail})
        if(exist){
            return res.send(`]
            <script>
              alert("user mail already exist try any other mail")
                 window.location.href="/register"
            </script>
            
            `)
        }
        const newdata = new userdata({
                name:username,
                mail:usermail,
                password:hash1
        })
         await newdata.save();

          res.send(`]
            <script>
              alert("register successfully ")
                 window.location.href="/"
            </script>
            
            `)

    }catch(err){
        console.log(err)
        res.send("error on storing")
    }

})

app.post("/login", async(req, res)=>{

    const {usermail, password} = req.body
    // console.log(usermail, password)

        try{

        const user = await userdata.findOne({mail:usermail})

        if(!user){
            return res.send(`]
            <script>
              alert("user not exist try again")
                 window.location.href="/"
            </script>
            
            `)
        }
        const ismatch = await bcrypt.compare(password, user.password)

        if(ismatch){
            return   res.send(`]
            <script>
              alert("login successfully ")
                 window.location.href="/home"
            </script>
            
            `)
        }else{
            return  res.send(`]
            <script>
              alert("password worng")
                 window.location.href="/"
            </script>
            
            `)
        }


    }catch(err){
        console.log(err)
        res.send("error on storing")
    }

})

app.get("/home" , (req, res) =>{
    res.send("welcome user")
})

app.listen(4000,()=>{
    console.log("server is running")
})