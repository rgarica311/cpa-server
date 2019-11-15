const NavService = {
  getAllNavElements(knex) {
    return knex.select('*').from('nav').orderBy('id', 'asc');
  },

  deleteNavElement(knex, id) {
    return knex('nav').where({id}).delete();
  },

  getColumn(knex) {
    return knex.raw(`SELECT id, (
      CASE WHEN col1 IS NULL OR col1 = '' THEN 'col1'
            WHEN col2 IS NULL OR col2 = '' THEN 'col2'
            WHEN col3 IS NULL OR col3 = '' THEN 'col3'
            WHEN col4 IS NULL OR col4 = '' THEN 'col4'
            WHEN col5 IS NULL OR col5 = '' THEN 'col5'
            WHEN col6 IS NULL OR col6 = '' THEN 'col6'
            WHEN col7 IS NULL OR col7 = '' THEN 'col7'
            WHEN col8 IS NULL OR col8 = '' THEN 'col8'
            ELSE ''
       END
    ) AS colValue FROM nav WHERE id = 1`);

  },

  addTopNavLink(knex, newNav, column) {
    //return knex('nav').where({id: 1}).update(newNav)
    return knex.raw(`UPDATE nav set ${column} = '${newNav}' WHERE id = ${1}`);
  },

  addSubMenu(knex, subMenu, column) {
    console.log('submenu', subMenu)
    let id = parseInt(column.slice(-1))
    console.log('id in add submenu', id);
    switch (subMenu.length) {
      case 1:
        return knex.raw(`UPDATE nav
                        set col1 = '${subMenu[0]}'
                        WHERE id = ${id}`)
        break;
      case 2:
        return knex.raw(`UPDATE nav
                        set col1 = '${subMenu[0]}',
                        set col2 = '${subMenu[1]}'
                        WHERE id = ${id}`)
        break;
      case 3:
        return knex.raw(`UPDATE nav
                        set col1 = '${subMenu[0]}',
                            col2 = '${subMenu[1]}',
                            col3 = '${subMenu[2]}'
                        WHERE id = ${id}`);
        break;
      case 4:
        return knex.raw(`UPDATE nav
                        set col1 = '${subMenu[0]}',
                        set col2 = '${subMenu[1]}',
                        set col3 = '${subMenu[2]}',
                        set col4 = '${subMenu[3]}'
                        WHERE id = ${id}`);
        break;
      case 5:
        return knex.raw(`UPDATE nav
                        set col1 = '${subMenu[0]}',
                        set col2 = '${subMenu[1]}',
                        set col3 = '${subMenu[2]}',
                        set col4 = '${subMenu[3]}',
                        set col5 = '${subMenu[4]}'
                        WHERE id = ${id}`);
        break;
      case 6:
        return knex.raw(`UPDATE nav
                        set col1 = '${subMenu[0]}',
                        set col2 = '${subMenu[1]}',
                        set col3 = '${subMenu[2]}',
                        set col4 = '${subMenu[3]}',
                        set col5 = '${subMenu[4]}',
                        set col6 = '${subMenu[5]}
                        WHERE id = ${id}`);
        break;
      case 7:
        return knex.raw(`UPDATE nav
                        set col1 = '${subMenu[0]}',
                        set col2 = '${subMenu[1]}',
                        set col3 = '${subMenu[2]}',
                        set col4 = '${subMenu[3]}',
                        set col5 = '${subMenu[4]}',
                        set col6 = '${subMenu[5]}',
                        set col7 = '${subMenu[6]}
                        WHERE id = ${id}`);
        break;
      case 8:
        return knex.raw(`UPDATE nav
                        set col1 = '${subMenu[0]}',
                        set col2 = '${subMenu[1]}',
                        set col3 = '${subMenu[2]}',
                        set col4 = '${subMenu[3]}',
                        set col5 = '${subMenu[4]}',
                        set col6 = '${subMenu[5]}',
                        set col7 = '${subMenu[6]}',
                        set col8 = '${subMenu[7]}
                        WHERE id = ${id}`);
        break;
    }
  }

};

module.exports = NavService;
