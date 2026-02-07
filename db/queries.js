const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function getUsersUsername(username) {
    const {rows} = await pool.query("SELECT * FROM user_details WHERE username = $1", [username]);
    return rows[0];
}

async function getUsersId(userId) {
    const {rows} = await pool.query("SELECT id, username FROM user_details WHERE id = $1", [userId]);
    return rows[0];
}

async function getNewUser(first_name, last_name, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO user_details (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [first_name, last_name,
        username, hashedPassword
    ]);
    
}

module.exports = {
    getUsersUsername,
    getUsersId,
    getNewUser
}
