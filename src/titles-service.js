const TitlesService = {
  getBeginnerTitles(knex) {
    return knex.select('*').from('titles').where({class_category: 'Beginner'}).orderBy('id', 'asc');
  }
}

module.exports = TitlesService
