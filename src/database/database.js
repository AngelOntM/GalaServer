/**
 * Importar Dependencias
 */
import mysql from 'mysql2/promise';
import { config } from '../config/config.js';

/**
 * Establecer Conexion de BD
 */
export const connect = async () => {
    return await mysql.createConnection(config);
};
