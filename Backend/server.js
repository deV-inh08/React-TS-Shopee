const express = require("express");
const jwt = require("jsonwebtoken")
const cors = require("cors") 
const fs = require("fs");

const app = express();
const PORT = 3001;

const readUsers = () => {
    const data = fs.readFileSync("./users.json", "utf8")
    return JSON.parse(data)
};

const writeUser = (users) => {
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
};

let users = readUsers();

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello express")
})

// Route Register
app.post("/register", (req, res) => {
    const {email, password} = req.body
    if(users.find((user) => user.email === email)) {
        return res.status(422).json({
            message: "Lỗi",
            data: {
                email: "Email đã tồn tại"
            }
        });
    }
    
    const newUser = {
        id: users.length + 1,
        email,
        password,
        roles: "user"
    };
    users.push(newUser);

    writeUser(users);

    const token = jwt.sign({email, roles: newUser.roles}, "secret_key", {expiresIn: "7d"})
    res.json({
        message: "Đăng kí thành công",
        data: {
            access_token: `Bearer ${token}`,
            expires: '7d',
            user: newUser
        }
    });
    console.log(users);

});

// Route login
app.post("/login", (req, res) => {
    const {email, password} = req.body

    const user = users.find((user) => user.email === email && user.password === password);
    if(!user) {
        res.status(401).json({
            message: "User is not exists"
        })
    };

    const token = jwt.sign({email, roles: user.roles}, "secret_key", {expiresIn: "7d"})

    res.json({
        message: "Login Success",
        data: {
            access_token: `Bearer ${token}`,
            expires: "7d",
            user
        }
    })
});

// Middleware kiểm tra token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        return res.status(403).json({ message: "Token are not provided"})
    };
    try {
        const decoded = jwt.verify(token.split(" ")[1], "secret_key");
        req.user = decoded;
        next();
    } catch(err) {
        res
            .status(401)
            .json({
                message: "Token are not invalid"
            })
    }
}

// Route logout
app.post("/logout",verifyToken, (req, res) => {
    res.json({
        message: "Logout success",
    })
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})