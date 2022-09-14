import { connect } from '../database/database.js'

export const getEstxmovs = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT Estxmov.EXM_NUMCTRL, Estxmov.EXM_COMENTA, estatus.EST_NUMCTRL, estatus.EST_NOMBRE, movimiento.MOV_NUMCTRL,movimiento.MOV_NOMBRE FROM Estxmov inner join estatus on estatus.EST_NUMCTRL = Estxmov.EST_NUMCTRL inner join movimiento on movimiento.MOV_NUMCTRL = Estxmov.MOV_NUMCTRL '
        if (req.body.EXM_COMENTA) {
            sql += val + ' Estxmov.EXM_COMENTA LIKE "%' + req.body.EXM_COMENTA + '%"'
            val = ' AND'
        }
        if (req.body.EST_NOMBRE) {
            sql += val + ' estatus.EST_NOMBRE LIKE "%' + req.body.EST_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.MOV_NOMBRE) {
            sql += val + ' movimiento.MOV_NOMBRE LIKE "%' + req.body.MOV_NOMBRE + '%"'
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

export const getEstxmov = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT Estxmov.EXM_NUMCTRL, Estxmov.EXM_COMENTA, estatus.EST_NUMCTRL, estatus.EST_NOMBRE, movimiento.MOV_NUMCTRL,movimiento.MOV_NOMBRE FROM Estxmov inner join estatus on estatus.EST_NUMCTRL = Estxmov.EST_NUMCTRL inner join movimiento on movimiento.MOV_NUMCTRL = Estxmov.MOV_NUMCTRL WHERE Estxmov.EXM_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countEstxmovs = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Estxmov')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createEstxmov = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Estxmov(EXM_COMENTA,EST_NUMCTRL,MOV_NUMCTRL) VALUES (?, ?, ?)",
            [
                req.body.EXM_COMENTA,
                req.body.EST_NUMCTRL,
                req.body.MOV_NUMCTRL,
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteEstxmov = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Estxmov WHERE EXM_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateEstxmov = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Estxmov SET ? WHERE EXM_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}