const ClassDescService = {
  getBeginnerClassDescs(knex) {
    return knex.select('*').from('classdesc').where({class_category: 'Beginner'}).orderBy('id', 'asc');
  }
}

module.exports = ClassDescService
