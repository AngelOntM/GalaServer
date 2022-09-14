import { connect } from '../database/database.js'

export const getComentas = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT comenta.COM_NUMCTRL, comenta.COM_COMENTA, comenta.COM_FECHA, movimiento.MOV_NUMCTRL, movimiento.MOV_NOMBRE, usuario.USU_NUMCTRL, usuario.USU_NOMBRE, estatus.EST_NUMCTRL, estatus.EST_NOMBRE FROM Comenta inner join movimiento on comenta.MOV_NUMCTRL = movimiento.MOV_NUMCTRL inner join estatus on comenta.EST_NUMCTRL = estatus.EST_NUMCTRL'
        if (req.body.COM_NUMCTRL) {
            sql += val + ' comenta.COM_NUMCTRL LIKE "%' + req.body.COM_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.COM_COMENTA) {
            sql += val + ' comenta.COM_COMENTA LIKE "%' + req.body.COM_COMENTA + '%"'
            val = ' AND'
        }
        if (req.body.COM_FECHA) {
            sql += val + ' comenta.COM_FECHA LIKE "%' + req.body.COM_FECHA + '%"'
            val = ' AND'
        }
        if (req.body.MOV_NUMCTRL) {
            sql += val + ' movimiento.MOV_NUMCTRL LIKE "%' + req.body.MOV_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.MOV_NOMBRE) {
            sql += val + ' movimiento.MOV_NOMBRE LIKE "%' + req.body.MOV_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.USU_NUMCTRL) {
            sql += val + ' usuario.USU_NUMCTRL LIKE "%' + req.body.USU_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.USU_NOMBRE) {
            sql += val + ' usuario.USU_NOMBRE LIKE "%' + req.body.USU_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.EST_NUMCTRL) {
            sql += val + ' estatus.EST_NUMCTRL LIKE "%' + req.body.EST_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.EST_NOMBRE) {
            sql += val + ' estatus.EST_NOMBRE LIKE "%' + req.body.EST_NOMBRE + '%"'
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

export const getComenta = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT * FROM Comenta WHERE EST_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countComentas = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Comenta')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createComenta = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Comenta(COM_COMENTA,COM_FECHA,MOV_NUMCTRL,USU_NUMCTRL,EST_NUMCTRL) VALUES (?, ?, ?, ?, ?)",
            [
                req.body.COM_COMENTA,
                req.body.COM_FECHA,
                req.body.MOV_NUMCTRL,
                req.body.USU_NUMCTRL,
                req.body.EST_NUMCTRL
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteComenta = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Comenta WHERE COM_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateComenta = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Comenta SET ? WHERE COM_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}