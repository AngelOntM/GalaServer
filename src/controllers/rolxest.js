import { connect } from '../database/database.js'

export const getRolxests = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT Rolxest.RXE_NUMCTRL, estatus.EST_NUMCTRL, estatus.EST_NOMBRE, estatus.EST_CLAVE, rol.ROL_NUMCTRL,rol.ROL_NOMBRE FROM Rolxest inner join estatus on estatus.EST_NUMCTRL = Rolxest.EST_NUMCTRL inner join rol on rol.ROL_NUMCTRL = Rolxest.ROL_NUMCTRL '
        if (req.body.RXE_NUMCTRL) {
            sql += val + ' Rolxest.RXE_NUMCTRL LIKE "%' + req.body.RXE_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.EST_NOMBRE) {
            sql += val + ' estatus.EST_NOMBRE LIKE "%' + req.body.EST_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.ROL_NOMBRE) {
            sql += val + ' rol.ROL_NOMBRE LIKE "%' + req.body.ROL_NOMBRE + '%"'
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

export const getRolxest = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT Rolxest.RXE_NUMCTRL, estatus.EST_NUMCTRL, estatus.EST_NOMBRE, estatus.EST_CLAVE, rol.ROL_NUMCTRL,rol.ROL_NOMBRE FROM Rolxest inner join estatus on estatus.EST_NUMCTRL = Rolxest.EST_NUMCTRL inner join rol on rol.ROL_NUMCTRL = Rolxest.ROL_NUMCTRL WHERE Rolxest.RXE_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countRolxests = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Rolxest')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createRolxest = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Rolxest(RXE_NUMCTRL,EST_NUMCTRL,ROL_NUMCTRL) VALUES (?, ?, ?)",
            [
                req.body.RXE_NUMCTRL,
                req.body.EST_NUMCTRL,
                req.body.ROL_NUMCTRL
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteRolxest = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Rolxest WHERE RXE_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateRolxest = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Rolxest SET ? WHERE RXE_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}