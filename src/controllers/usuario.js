import { connect } from '../database/database.js'

export const getUsuarios = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT usuario.USU_NUMCTRL,usuario.USU_CLAVE,usuario.USU_NOMBRE, region.REG_NUMCTRL,region.REG_NOMBRE,region.REG_CLAVE FROM Usuario inner join region on usuario.REG_NUMCTRL = region.REG_NUMCTRL'
        if (req.body.USU_NUMCTRL) {
            sql += val + ' usuario.USU_NUMCTRL LIKE "%' + req.body.USU_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.USU_CLAVE) {
            sql += val + ' usuario.USU_CLAVE LIKE "%' + req.body.USU_CLAVE + '%"'
            val = ' AND'
        }
        if (req.body.USU_NOMBRE) {
            sql += val + ' usuario.USU_NOMBRE LIKE "%' + req.body.USU_NOMBRE + '%"'
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

export const getUsuario = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT usuario.USU_NUMCTRL,usuario.USU_CLAVE,usuario.USU_NOMBRE, region.REG_NUMCTRL,region.REG_NOMBRE,region.REG_CLAVE FROM Usuario inner join region on Usuario.REG_NUMCTRL = region.REG_NUMCTRL WHERE usuario.USU_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countUsuarios = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Usuario')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createUsuario = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Usuario(USU_CLAVE,USU_NOMBRE,REG_NUMCTRL) VALUES (?, ?, ?)",
            [
                req.body.USU_CLAVE,
                req.body.USU_NOMBRE,
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

export const deleteUsuario = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Usuario WHERE USU_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateUsuario = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Usuario SET ? WHERE USU_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}