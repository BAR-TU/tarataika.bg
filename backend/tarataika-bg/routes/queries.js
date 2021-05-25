const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tarataika',
    password: '1234',
    port: 5432,
})

const getCars = (request, response) => {
    pool.query('SELECT * FROM cars', (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).json(results.rows);
    })
}

module.exports = {
    getCars,
}