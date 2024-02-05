// Import necessary modules and types
import { createPool, Pool } from 'mysql'; // Import MySQL's createPool and Pool
import dotenv from "dotenv"; // Import the dotenv module for environment variables

dotenv.config(); // Load environment variables from a .env file (if available)

let pool: Pool | null = null; // Initialize a variable to hold the database connection pool

// Function to initialize the MySQL database connection pool
const initializeMySqlConnector = () => {
  try {    
    pool = createPool({
      // Configure the connection pool with parameters from environment variables
      connectionLimit: parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT || "0", 10), // Maximum number of connections
      port: parseInt(process.env.MY_SQL_DB_PORT || "0", 10), // MySQL server port
      
      host: process.env.MY_SQL_DB_HOST, // MySQL server host
      user: process.env.MY_SQL_DB_USER, // MySQL username
      password: process.env.MY_SQL_DB_PASSWORD, // MySQL password
      database: process.env.MY_SQL_DB_DATABASE, // MySQL database name
    });

    // Log a message to indicate successful pool creation
    console.debug('MySql Adapter Pool generated successfully');
    console.log('process.env.DB_DATABASE', process.env.MY_SQL_DB_DATABASE);

    // Attempt to obtain a connection from the pool to verify connectivity
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('error mysql failed to connect');
        throw new Error('not able to connect to the database');
      } else {
        console.log('connection made');
        connection.release(); // Release the connection back to the pool
      }
    });
  } catch (error) {
    console.error('[mysql.connector][initializeMySqlConnector][Error]: ', error);
    throw new Error('failed to initialize the pool');
  }
};

// Function to execute SQL queries using the connection pool
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) {
      initializeMySqlConnector(); // Initialize the pool if it doesn't exist
    }

    return new Promise<T>((resolve, reject) => {
      pool!.query(query, params, (error, results) => {
        if (error) reject(error); // Reject the promise if there's an error
        else resolve(results);   // Resolve the promise with query results if successful
      });
    });
  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute the MySQL query');
  }
}
