import menu from '../scripts/menu.json'


export const filtrarMenu = (menu) => {
    menu = menu.filter(obj => obj.visible === true)
    for (let i = 0; i < menu.length; i++) {
        menu[i].subnivel = menu[i].subnivel.filter(obj => obj.visible === true)
    }
    return menu
}