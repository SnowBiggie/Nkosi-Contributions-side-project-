import { db } from "../db.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export const register = (req, res)=>{
    // check existing user 
    console.log(req.body.body.name);
    const query = "SELECT * FROM users WHERE email = ? OR name = ?";
    db.query(query, [req.body.body.email, req.body.body.name], (err, data)=>{
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exist");

        //Register user
        //hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.body.password,salt);

        //insert the user in db
        const query = "INSERT INTO users(`name`,`email`,`password`) VALUES (?)";
        const values =[
            req.body.body.name,
            req.body.body.email,
            hash
        ]

        db.query(query, [values], (err, data)=>{
            if (err) return res.json(err);
            return res.status(200).json("User created");
        })
        
    }
    );

}

export const login = (req, res)=>{
    // CHECK user exist
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [req.body.body.email], (err, data)=>{
        if (err) return res.json(err);
        if(data.length === 0) return  res.status(404).json("User not found");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.body.password, data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password");
        
        const token = jwt.sign({id:data[0].id}, "jwtkey");
        const {password, ...other} =data[0];
        res.cookie('access_token', token, {
            httpOnly:true,
        }).status(200).json(other)
        
    })    
}

export const logout = (req, res)=>{
  res.clearCookie("access-token", {
    sameSite:"none",
    secure:true,
  }).status(200).json("User logged out");
}