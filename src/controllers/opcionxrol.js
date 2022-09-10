import { connect } from '../database/database.js'

export const getOpcionxrols = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT opcionxrol.OXR_NUMTRL,opcionxrol.OXR_MENU, rol.ROL_NUMCTRL,rol.ROL_NOMBRE FROM opcionxrol inner join rol on rol.ROL_NUMCTRL = opcionxrol.ROL_NUMCTRL'
        if (req.body.OXR_NUMTRL) {
            sql += val + ' Opcionxrol.OXR_NUMTRL LIKE "%' + req.body.OXR_NUMTRL + '%"'
            val = ' AND'
        }
        if (req.body.OXR_MENU) {
            sql += val + ' Opcionxrol.OXR_MENU LIKE "%' + req.body.OXR_MENU + '%"'
            val = ' AND'
        }
        if (req.body.ROL_NUMCTRL) {
            sql += val + ' rol.ROL_NUMCTRL LIKE "%' + req.body.ROL_NUMCTRL + '%"'
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

export const getOpcionxrol = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT opcionxrol.OXR_NUMTRL,opcionxrol.OXR_MENU, rol.ROL_NUMCTRL,rol.ROL_NOMBRE FROM opcionxrol inner join rol on rol.ROL_NUMCTRL = opcionxrol.ROL_NUMCTRL WHERE Opcionxrol.OXR_NUMTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countOpcionxrols = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Opcionxrol')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createOpcionxrol = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Opcionxrol(OXR_NUMTRL,OXR_MENU,ROL_NUMCTRL) VALUES (?, ?, ?)",
            [
                req.body.OXR_NUMTRL,
                req.body.OXR_MENU,
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

export const deleteOpcionxrol = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Opcionxrol WHERE OXR_NUMTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateOpcionxrol = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Opcionxrol SET ? WHERE OXR_NUMTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}