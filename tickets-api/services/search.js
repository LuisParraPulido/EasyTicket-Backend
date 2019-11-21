const MongoLib = require('../lib/mongo');

class SearchService {
  constructor() {
    this.collection = 'search';
    this.mongoDB = new MongoLib;
  }

  async getSearchs() {
    const searchs = await this.mongoDB.getAll(this.collection)
    return searchs || [];
  }
  async getSearch({ searchId }) {
    const search = await this.mongoDB.get(this.collection, searchId)
    return search || [];
  }

  async createSearch({ search }) {
    const createSearchId = await this.mongoDB.create(this.collection, search)
    return createSearchId;
  }

  async updateSearch({ searchId, search } = {}) {
    const updateSearchId = await this.mongoDB.update(this.collection, searchId, search)
    return updateSearchId;
  }

  async deleteSearch({ searchId }) {
    const deleteSearchId = await this.mongoDB.delete(this.collection, searchId)
    return deleteSearchId;
  }
}

module.exports = SearchService;