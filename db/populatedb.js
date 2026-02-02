const {Client} = require("pg");
require("dotenv").config();

const SQL = `
 CREATE TABLE IF NOT EXISTS user_details(
 id SERIAL PRIMARY KEY,
 first_name VARCHAR(100) NOT NULL,
 last_name VARCHAR(100) NOT NULL,
 username VARCHAR(100) UNIQUE NOT NULL,
 password VARCHAR(100) NOT NULL,
 is_member BOOLEAN DEFAULT FALSE,
 is_admin BOOLEAN DEFAULT FALSE);


 CREATE TABLE IF NOT EXISTS user_posts (
 post_id SERIAL PRIMARY KEY,
 title VARCHAR(100) NOT NULL,
 timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 text TEXT NOT NULL,
 user_id INTEGER REFERENCES user_details(id) ON DELETE CASCADE);

 INSERT INTO user_details (first_name, last_name, username, password, is_member, is_admin)
 VALUES
 ('Jane', 'Doe', 'janeD@gmail.com', 'hash_secret_123', TRUE, FALSE),
 ('Peter', 'Parker', 'spooderman@gmail.com', 'hash_secret_456', FALSE, FALSE);

 INSERT INTO user_posts (title, text, user_id)
 VALUES
 ('Welcome to the Club', 'This Club is to discuss the goat Steph Curry', 1),
 ('Is Steph really the goat', 'YESSSSSSS', 1),
 ('Not Spiderman', 'I am really not spiderman', 2);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DB_CONNECTIONSTRING,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Done");
}

main();