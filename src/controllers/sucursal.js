import { connect } from '../database/database.js'

export const getSucursals = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT sucursal.SUC_NUMCTRL,sucursal.SUC_CLAVE,sucursal.SUC_NOMBRE, region.REG_NUMCTRL,region.REG_NOMBRE,region.REG_CLAVE FROM Sucursal inner join region on sucursal.REG_NUMCTRL = region.REG_NUMCTRL'
        if (req.body.SUC_NUMCTRL) {
            sql += val + ' sucursal.SUC_NUMCTRL LIKE "%' + req.body.SUC_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.SUC_CLAVE) {
            sql += val + ' sucursal.SUC_CLAVE LIKE "%' + req.body.SUC_CLAVE + '%"'
            val = ' AND'
        }
        if (req.body.SUC_NOMBRE) {
            sql += val + ' sucursal.SUC_NOMBRE LIKE "%' + req.body.SUC_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.REG_NOMBRE) {
            sql += val + ' region.REG_NOMBRE LIKE "%' + req.body.REG_NOMBRE + '%"'
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

export const getSucursal = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT sucursal.SUC_NUMCTRL,sucursal.SUC_CLAVE,sucursal.SUC_NOMBRE, region.REG_NUMCTRL,region.REG_NOMBRE,region.REG_CLAVE FROM Sucursal inner join region on sucursal.REG_NUMCTRL = region.REG_NUMCTRL WHERE sucursal.SUC_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countSucursals = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Sucursal')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createSucursal = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Sucursal(SUC_CLAVE,SUC_NOMBRE,REG_NUMCTRL) VALUES (?, ?, ?)",
            [
                req.body.SUC_CLAVE,
                req.body.SUC_NOMBRE,
                req.body.REG_NUMCTRL
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteSucursal = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Sucursal WHERE SUC_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateSucursal = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Sucursal SET ? WHERE SUC_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}