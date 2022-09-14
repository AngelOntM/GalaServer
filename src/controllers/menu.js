import { connect } from '../database/database.js'
import menu from '../scripts/menu.json'

export const getMenus = async (req, res) => {
    try {
        res.json(menu)
    } catch (error) {
        console.error(error)
        res.sendStatus(400)
    }
}
