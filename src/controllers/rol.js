import { connect } from '../database/database.js'

export const getRols = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT * FROM Rol'
        if (req.body.ROL_NUMCTRL) {
            sql += val + ' ROL_NUMCTRL LIKE "%' + req.body.ROL_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.ROL_CLAVE) {
            sql += val + ' ROL_CLAVE LIKE "%' + req.body.ROL_CLAVE + '%"'
            val = ' AND'
        }
        if (req.body.ROL_NOMBRE) {
            sql += val + ' ROL_NOMBRE LIKE "%' + req.body.ROL_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.ROL_DESC) {
            sql += val + ' ROL_DESC LIKE "%' + req.body.ROL_DESC + '%"'
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
        console.error(error)
        res.sendStatus(400)
    }
}

export const getRol = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT * FROM Rol WHERE ROL_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countRols = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Rol')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createRol = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Rol(ROL_CLAVE,ROL_NOMBRE,ROL_DESC) VALUES (?, ?, ?)",
            [
                req.body.ROL_CLAVE,
                req.body.ROL_NOMBRE,
                req.body.ROL_DESC
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteRol = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Rol WHERE ROL_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateRol = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Rol SET ? WHERE ROL_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}