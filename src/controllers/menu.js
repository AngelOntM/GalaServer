import { connect } from '../database/database.js'

export const getMenus = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT * FROM menu'
        if (req.body.MEN_NUMCTRL) {
            sql += val + ' MEN_NUMCTRL LIKE "%' + req.body.MEN_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.MEN_CLAVE) {
            sql += val + ' MEN_CLAVE LIKE "%' + req.body.MEN_CLAVE + '%"'
            val = ' AND'
        }
        if (req.body.MEN_NOMBRE) {
            sql += val + ' MEN_NOMBRE LIKE "%' + req.body.MEN_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.MEN_DESC) {
            sql += val + ' MEN_DESC LIKE "%' + req.body.MEN_DESC + '%"'
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

export const getMenu = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT * FROM menu WHERE MEN_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countMenus = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM menu')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createMenu = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO menu(MEN_CLAVE,MEN_NOMBRE,MEN_ICON,MEN_DESC) VALUES (?, ?, ?, ?)",
            [
                req.body.MEN_CLAVE,
                req.body.MEN_NOMBRE,
                req.body.MEN_ICON,
                req.body.MEN_DESC
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteMenu = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM menu WHERE MEN_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateMenu = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE menu SET ? WHERE MEN_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}