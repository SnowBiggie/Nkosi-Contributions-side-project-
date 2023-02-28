import mysql from 'mysql2';
export const db = mysql.createConnection({
    host:"localhost",  //must change on deployment
    user:"root", 
    password:"root",
    database:"nkosi contributions"
});
