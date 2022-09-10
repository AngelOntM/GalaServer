import { connect } from '../database/database.js'

export const getEstatuss = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT * FROM Estatus'
        if (req.body.EST_NUMCTRL) {
            sql += val + ' EST_NUMCTRL LIKE "%' + req.body.EST_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.EST_CLAVE) {
            sql += val + ' EST_CLAVE LIKE "%' + req.body.EST_CLAVE + '%"'
            val = ' AND'
        }
        if (req.body.EST_NOMBRE) {
            sql += val + ' EST_NOMBRE LIKE "%' + req.body.EST_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.EST_DESC) {
            sql += val + ' EST_DESC LIKE "%' + req.body.EST_DESC + '%"'
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

export const getEstatus = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT * FROM Estatus WHERE EST_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countEstatuss = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Estatus')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createEstatus = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Estatus(EST_CLAVE,EST_NOMBRE,EST_DESC) VALUES (?, ?, ?)",
            [
                req.body.EST_CLAVE,
                req.body.EST_NOMBRE,
                req.body.EST_DESC
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteEstatus = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Estatus WHERE EST_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateEstatus = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Estatus SET ? WHERE EST_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}