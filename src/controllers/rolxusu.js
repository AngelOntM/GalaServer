import { connect } from '../database/database.js'

export const getRolxusus = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT rolxusu.RXU_NUMCTRL, usuario.USU_NUMCTRL, usuario.USU_NOMBRE, usuario.USU_CLAVE, rol.ROL_NUMCTRL,rol.ROL_NOMBRE FROM rolxusu inner join usuario on usuario.USU_NUMCTRL = rolxusu.USU_NUMCTRL inner join rol on rol.ROL_NUMCTRL = rolxusu.ROL_NUMCTRL '
        if (req.body.RXU_NUMCTRL) {
            sql += val + ' rolxusu.RXU_NUMCTRL LIKE "%' + req.body.RXU_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.USU_NOMBRE) {
            sql += val + ' usuario.USU_NOMBRE LIKE "%' + req.body.USU_NOMBRE + '%"'
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

export const getRolxusu = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT rolxusu.RXU_NUMCTRL, usuario.USU_NUMCTRL, usuario.USU_NOMBRE, usuario.USU_CLAVE, rol.ROL_NUMCTRL,rol.ROL_NOMBRE FROM rolxusu inner join usuario on usuario.USU_NUMCTRL = rolxusu.USU_NUMCTRL inner join rol on rol.ROL_NUMCTRL = rolxusu.ROL_NUMCTRL WHERE rolxusu.RXU_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countRolxusus = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Rolxusu')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createRolxusu = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Rolxusu(USU_NUMCTRL,ROL_NUMCTRL) VALUES (?, ?)",
            [
                req.body.USU_NUMCTRL,
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

export const deleteRolxusu = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Rolxusu WHERE RXU_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateRolxusu = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Rolxusu SET ? WHERE RXU_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}