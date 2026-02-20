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

async function changeMembershipStatus(username) {
    await pool.query(
        "UPDATE user_details SET is_member = true WHERE username = $1"
    ,[username]);
}

async function getAllMessages() {
    const { rows } = await pool.query(`
        SELECT 
            user_details.username, 
            user_posts.title, 
            user_posts.text, 
            user_posts.timestamp 
        FROM user_posts
        INNER JOIN user_details ON user_posts.user_id = user_details.id
        ORDER BY user_posts.timestamp DESC
    `);
    return rows;
}

async function newMessage(title, text, userId) {
    await pool.query("INSERT INTO user_posts (title, text, user_id) VALUES ($1, $2, $3)", [title, text, userId]);
}

module.exports = {
    getUsersUsername,
    getUsersId,
    getNewUser,
    changeMembershipStatus,
    getAllMessages,
    newMessage,
}
