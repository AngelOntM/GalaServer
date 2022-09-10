/**
 * Importar Dependencias
 */
import { config as dotenv } from 'dotenv';
dotenv();

/**
 * Configuración de BD
 */
export const config = {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}