const express = require('express');
const SearchService = require('../services/search');
const joi = require('@hapi/joi');

const { createSearchSchema } = require('../utils/schemas/search');

const validationHandler = require('../utils/middleware/validationHandler');

function searchApi(app) {
  const router = express.Router();
  app.use('/api/search', router);

  const searchService = new SearchService();

  router.get('/', async function(req, res, next) {
    try {
      const searchs = await searchService.getSearchs();

      res.status(200).json({
        data: searchs,
        message: 'searchs listed'
      })
    } catch (error) {
        next(error)
    }
  })

  router.get(
    '/:searchId',
    async function(req, res, next) {
      const { searchId } = req.params
      try {
        const search = await searchService.getSearch({ searchId })

        res.status(200).json({
          data: search,
          message: 'search listed'
        })
      } catch (error) {
          next(error)
      }
    })


  router.post(
    '/',
    // validationHandler(createSearchSchema), 
    async function(req, res, next) {
    const { body: search } = req
    try {
      const createdSearchId = await searchService.createSearch({ search })

      res.status(201).json({
        data: createdSearchId,
        message: 'search created'
      })
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:searchId',
    // validationHandler(createSearchSchema), 
    async function(req, res, next) {
    const { searchId } = req.params;
    const { body: search } = req;
    try {
      const updatedSearchId = await searchService.updateSearch({ searchId, search })

      res.status(200).json({
        data: updatedSearchId,
        message: 'search updated'
      })
    } catch (err) {
      next(err);
    }
  });

  router.delete(
    '/:searchId',
    async function(req, res, next) {
    const { searchId } = req.params;
    try {
      const deletedSearchId = await searchService.deleteSearch({ searchId })

      res.status(200).json({
        data: deletedSearchId,
        message: 'search deleted'
      })
    } catch (err) {
      next(err);
    }
  });
  
  
}

module.exports = searchApi;