/**
 * Importar Dependencias
 */
import { connect } from '../database/database.js'

/**
 * Establecer Metodos
 */
export const getModulos = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT * FROM modulo'
        if (req.body.MOD_CLAVE) {
            sql += val + ' MOD_CLAVE LIKE "%' + req.body.MOD_CLAVE + '%"'
            val = ' AND'
        }
        if (req.body.MOD_NOMBRE) {
            sql += val + ' MOD_NOMBRE LIKE "%' + req.body.MOD_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.MOD_DESC) {
            sql += val + ' MOD_DESC LIKE "%' + req.body.MOD_DESC + '%"'
            val = ' AND'
        }
        if (req.body.ORDER) {
            sql += ' ORDER BY ' + req.body.ORDER + ' '
        }
        if (req.body.BY) {
            sql += req.body.BY
        }
        const connection = await connect()
        const [rows] = await connection.query(sql)
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const getModulo = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT * FROM modulo WHERE MOD_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countModulos = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM modulo')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createModulo = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO modulo(MOD_CLAVE,MOD_NOMBRE,MOD_ICONO,MOD_DESC) VALUES (?,?,?,?)",
            [
                req.body.MOD_CLAVE,
                req.body.MOD_NOMBRE,
                req.body.MOD_ICONO,
                req.body.MOD_DESC
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteModulo = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('DELETE FROM modulo WHERE MOD_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateModulo = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE modulo SET ? WHERE MOD_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}