/**
 * Importar Dependencias
 */
import { connect } from '../database/database.js'

/**
 * Establecer Metodos
 */
export const getMotivos = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT * FROM Motivo'
        if (req.body.MOT_CLAVE) {
            sql += val + ' MOT_CLAVE LIKE "%' + req.body.MOT_CLAVE + '%"'
            val = ' AND'
        }
        if (req.body.MOT_NOMBRE) {
            sql += val + ' MOT_NOMBRE LIKE "%' + req.body.MOT_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.MOT_DESC) {
            sql += val + ' MOT_DESC LIKE "%' + req.body.MOT_DESC + '%"'
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

export const getMotivo = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT * FROM Motivo WHERE MOT_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countMotivos = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Motivo')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createMotivo = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Motivo(MOT_CLAVE,MOT_NOMBRE,MOT_DESC) VALUES (?,?,?)",
            [
                req.body.MOT_CLAVE,
                req.body.MOT_NOMBRE,
                req.body.MOT_DESC
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteMotivo = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('DELETE FROM Motivo WHERE MOT_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateMotivo = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Motivo SET ? WHERE MOT_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}