import { connect } from '../database/database.js'

export const getRegions = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT * FROM Region '
        if (req.body.REG_NUMCTRL) {
            sql += val + ' REG_NUMCTRL LIKE "%' + req.body.REG_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.REG_CLAVE) {
            sql += val + ' REG_CLAVE LIKE "%' + req.body.REG_CLAVE + '%"'
            val = ' AND'
        }
        if (req.body.REG_NOMBRE) {
            sql += val + ' REG_NOMBRE LIKE "%' + req.body.REG_NOMBRE + '%"'
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

export const getRegion = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT * FROM Region WHERE REG_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countRegions = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Region')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createRegion = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Region(REG_CLAVE, REG_NOMBRE) VALUES (?, ?)",
            [
                req.body.REG_CLAVE,
                req.body.REG_NOMBRE
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteRegion = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('DELETE FROM Region WHERE REG_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateRegion = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Region SET ? WHERE REG_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}