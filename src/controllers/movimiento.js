import { connect } from '../database/database.js'

export const getMovimientos = async (req, res) => {
    try {
        var val = ' WHERE'
        var sql = 'SELECT Movimiento.MOV_NUMCTRL,Movimiento.MOV_FECHA,Movimiento.MOV_CLIENTE, Movimiento.MOV_NOMBRE,Movimiento.MOV_MONTO,Movimiento.MOV_TIPVTA, Movimiento.MOV_NOTAVTA,Movimiento.MOV_RECIBOS,Movimiento.MOV_COMENTA, motivo.MOT_NUMCTRL, motivo.MOT_NOMBRE, sucursal.SUC_NUMCTRL,sucursal.SUC_NOMBRE, movimiento.USU_NUMCTRL FROM Movimiento inner join motivo on Movimiento.MOV_NUMCTRL = motivo.MOT_NUMCTRL inner join sucursal on movimiento.SUC_NUMCTRL = sucursal.SUC_NUMCTRL inner join usuario on usuario.USU_NUMCTRL = movimiento.USU_NUMCTRL'
        if (req.body.MOV_NUMCTRL) {
            sql += val + ' Movimiento.MOV_NUMCTRL LIKE "%' + req.body.MOV_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.MOV_FECHA) {
            sql += val + ' Movimiento.MOV_FECHA LIKE "%' + req.body.MOV_FECHA + '%"'
            val = ' AND'
        }
        if (req.body.MOV_CLIENTE) {
            sql += val + ' Movimiento.MOV_CLIENTE LIKE "%' + req.body.MOV_CLIENTE + '%"'
            val = ' AND'
        }
        if (req.body.MOV_NOMBRE) {
            sql += val + ' Movimiento.MOV_NOMBRE LIKE "%' + req.body.MOV_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.MOV_MONTO) {
            sql += val + ' Movimiento.MOV_MONTO LIKE "%' + req.body.MOV_MONTO + '%"'
            val = ' AND'
        }
        if (req.body.MOV_TIPVTA) {
            sql += val + ' Movimiento.MOV_TIPVTA LIKE "%' + req.body.MOV_TIPVTA + '%"'
            val = ' AND'
        }
        if (req.body.MOV_NOTAVTA) {
            sql += val + ' Movimiento.MOV_NOTAVTA LIKE "%' + req.body.MOV_NOTAVTA + '%"'
            val = ' AND'
        }
        if (req.body.MOV_RECIBOS) {
            sql += val + ' Movimiento.MOV_RECIBOS LIKE "%' + req.body.MOV_RECIBOS + '%"'
            val = ' AND'
        }
        if (req.body.MOV_COMENTA) {
            sql += val + ' Movimiento.MOV_COMENTA LIKE "%' + req.body.MOV_COMENTA + '%"'
            val = ' AND'
        }
        if (req.body.MOT_NUMCTRL) {
            sql += val + ' motivo.MOT_NUMCTRL LIKE "%' + req.body.MOT_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.MOV_NOMBRE) {
            sql += val + ' motivo.MOV_NOMBRE LIKE "%' + req.body.MOV_NOMBRE + '%"'
            val = ' AND'
        }
        if (req.body.SUC_NUMCTRL) {
            sql += val + ' sucursal.SUC_NUMCTRL LIKE "%' + req.body.SUC_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.SUC_NUMCTRL) {
            sql += val + ' sucursal.SUC_NUMCTRL LIKE "%' + req.body.SUC_NUMCTRL + '%"'
            val = ' AND'
        }
        if (req.body.USU_NUMCTRL) {
            sql += val + ' movimiento.USU_NUMCTRL LIKE "%' + req.body.USU_NUMCTRL + '%"'
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

export const getMovimiento = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT Movimiento.MOV_NUMCTRL,Movimiento.MOV_FECHA,Movimiento.MOV_CLIENTE, Movimiento.MOV_NOMBRE,Movimiento.MOV_MONTO,Movimiento.MOV_TIPVTA, Movimiento.MOV_NOTAVTA,Movimiento.MOV_RECIBOS,Movimiento.MOV_COMENTA, motivo.MOT_NUMCTRL, motivo.MOT_NOMBRE, sucursal.SUC_NUMCTRL,sucursal.SUC_NOMBRE, movimiento.USU_NUMCTRL FROM Movimiento inner join motivo on Movimiento.MOV_NUMCTRL = motivo.MOT_NUMCTRL inner join sucursal on movimiento.SUC_NUMCTRL = sucursal.SUC_NUMCTRL inner join usuario on usuario.USU_NUMCTRL = movimiento.USU_NUMCTRL WHERE Movimiento.MOV_NUMCTRL = ?', [req.params.id,])
        res.json(rows[0])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const countMovimientos = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('SELECT COUNT(*) FROM Movimiento')
        res.json(rows[0]['COUNT(*)'])
    } catch (error) {
        res.sendStatus(400)
    }
}

export const createMovimiento = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query("INSERT INTO Movimiento(MOV_FECHA,MOV_CLIENTE,MOV_NOMBRE,MOV_MONTO,MOV_TIPVTA,MOV_NOTAVTA,MOV_RECIBOS,MOV_COMENTA,MOT_NUMCTRL,SUC_NUMCTRL,USU_NUMCTRL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                req.body.MOV_FECHA,
                req.body.MOV_CLIENTE,
                req.body.MOV_NOMBRE,
                req.body.MOV_MONTO,
                req.body.MOV_TIPVTA,
                req.body.MOV_NOTAVTA,
                req.body.MOV_RECIBOS,
                req.body.MOV_COMENTA,
                req.body.MOT_NUMCTRL,
                req.body.SUC_NUMCTRL,
                req.body.USU_NUMCTRL
            ])
        res.json({
            id: rows.insertId,
            ...req.body
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

export const deleteMovimiento = async (req, res) => {
    try {
        const connection = await connect()
        await connection.query('DELETE FROM Movimiento WHERE MOV_NUMCTRL = ?',
            [
                req.params.id
            ])
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const updateMovimiento = async (req, res) => {
    try {
        const connection = await connect()
        const [rows] = await connection.query('UPDATE Movimiento SET ? WHERE MOV_NUMCTRL = ?',
            [
                req.body,
                req.params.id
            ])
        res.json(rows)
    } catch (error) {
        res.sendStatus(400)
    }
}