const {Router} = require('express');
const {planController} = require('../controller/plan.controller');

const planRouter =  new Router();

planRouter.get('/', planController.getAllPlans);
planRouter.get('/:id', planController.getPlanById);
planRouter.post('/', planController.createPlan);
planRouter.put('/:id', planController.updatePlan);
planRouter.delete('/:id', planController.deletePlan);

module.exports = { planRouter };