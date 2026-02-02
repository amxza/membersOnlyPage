const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function getNewUser(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await pool.query("INSERT INTO user_details (first_name, last_name, username, password VALUES ($1, $2, $3, $4)", [user.firstName, user.lastName,
        user.username, hashedPassword
    ]);
    
}
