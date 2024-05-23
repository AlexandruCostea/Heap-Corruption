const config = require('../config');
const { Client } = require('pg');
const CryptoJS = require('crypto-js');


const getUsers = async (req, res) => {
    const query = 'SELECT * FROM users';
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();
    client.query(query, (err, users) => {
        if (err) {
            console.error('Error getting users:', err);
        } else {
            const list = users.rows;
            const userList = list.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    password: user.password
                }
            });
            res.json(userList);
        }
        client.end();
    });
}

const getUser = async (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM users WHERE id = $1';
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();
    client.query(query, [id], (err, user) => {
        if (err) {
            console.error('Error getting user:', err);
        } else {
            const list = user.rows;
            if (list.length > 0) {
                const user = list[0];
                const userObj = {
                    id: user.id,
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    password: user.password
                }
                res.json(userObj);
            } else {
                res.status(404).send('User not found');
            }
        }
        client.end();
    });
}

const createUser = async (req, res) => {
    const user = req.body;
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();

    if(!user.firstName || !user.lastName || !user.username || !user.password) {
        res.status(400).send('Missing required fields');
        client.end();
        return;
    }

    const checkQuery = 'SELECT * FROM users WHERE username = $1';
    const checkValues = [user.username];

    const isUsed = await client.query(checkQuery, checkValues);
    if (isUsed.rows.length > 0) {
        res.status(400).send('Username already exists');
        client.end();
        return;
    }

    const hashedPassword = CryptoJS.SHA256(user.password).toString();
    const query = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [user.firstName, user.lastName, user.username, hashedPassword];
    client.query(query, values, (err, user) => {
        if (err) {
            console.error('Error creating user:', err);
        } else {
            const newUser = user.rows[0];
            const userObj = {
                id: newUser.id,
                username: newUser.username,
                firstName: newUser.first_name,
                lastName: newUser.last_name,
                password: newUser.password
            }
            res.json(userObj);
        }
        client.end();
    });
}

const updateUser = async (req, res) => {
    const user = req.body;
    const id = req.params.id;
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();

    if(!user.firstName || !user.lastName || !user.username || !user.password) {
        res.status(400).send('Missing required fields');
        client.end();
        return;
    }

    const searchQuery = 'SELECT * FROM users WHERE id = $1';
    const searchValues = [id];
    const searchResult = await client.query(searchQuery, searchValues);
    if (searchResult.rows.length === 0) {
        res.status(404).send('User not found');
        client.end();
        return;
    }

    const checkQuery = 'SELECT * FROM users WHERE username = $1 AND id != $2';
    const checkValues = [user.username, id];
    const isUsed = await client.query(checkQuery, checkValues);
    if (isUsed.rows.length > 0) {
        res.status(400).send('Username already exists');
        client.end();
        return;
    }

    const query = 'UPDATE users SET first_name = $1, last_name = $2, username = $3, password = $4 WHERE id = $5 RETURNING *';
    const values = [user.firstName, user.lastName, user.username, user.password, id];

    client.query(query, values, (err, user) => {
        if (err) {
            console.error('Error updating user:', err);
        } else {
            const updatedUser = user.rows[0];
            const userObj = {
                id: updatedUser.id,
                username: updatedUser.username,
                firstName: updatedUser.first_name,
                lastName: updatedUser.last_name,
                password: updatedUser.password
            }
            res.json(userObj);
        }
        client.end();
    });
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    client.query(query, [id], (err, user) => {
        if (err) {
            console.error('Error deleting user:', err);
        } else {
            if (user.rows.length > 0) {
                const deletedUser = user.rows[0];
                const userObj = {
                    id: deletedUser.id,
                    username: deletedUser.username,
                    firstName: deletedUser.first_name,
                    lastName: deletedUser.last_name,
                    password: deletedUser.password
                }
                res.json(userObj);
            } else {
                res.status(404).send('User not found');
            }
        }
        client.end();
    });
}

const authenticateUser = async (req, res) => {
    const { username, password } = req.body;
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [username, password];
    client.query(query, values, (err, user) => {
        if (err) {
            console.error('Error authenticating user:', err);
        } else {
            if (user.rows.length > 0) {
                const tokenExpiration = new Date();
                tokenExpiration.setHours(tokenExpiration.getHours() + 1);
                const token = {
                    id: user.rows[0].id,
                    expirationDate: tokenExpiration
                }
                const data = {
                    authenticated: true,
                    token: token
                }
                res.json(data);
            } else {
                res.status(404).send('User credentials not found');
            }
        }
        client.end();
    });
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, authenticateUser };