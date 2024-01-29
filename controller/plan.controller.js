const PlanRepository = require('../repositories/plan.repository');
const planRepository = new PlanRepository();

exports.planController = {
    async getAllPlans(req, res) {
        const result = {
            status: 200,
            message: '',
            data : await planRepository.find()
        };
        res.status(result.status);
        res.json( result.message || result.data );
    },
    async getPlan(req, res) {
        const {id} = req.params;
        const result = {
            status: 200,
            message: '',
            data : await planRepository.retrieve(id)
        };
        res.status(result.status);
        res.json(result.data || result.message);
    },
    async createPlan(req, res) {
        const {body : plan} = req;
        const result = {
            status: 201,
            message: '',
            data : await planRepository.create(plan)
        };
        res.status(result.status);
        res.json(result.data || result.message);
    },
    async updatePlan(req, res) {
        const {body : plan , params : {id}} = req;
        console.log(plan);
        const result = {
            status: 200,
            message: '',
            data : await planRepository.update(id, plan)
        };
        res.status(result.status);
        res.json(result.data || result.message);
    },
    async deletePlan(req, res) {
        const {id} = req.params;
        const result = {
            status: 200,
            message: '',
            data : await planRepository.delete(id)
        };
        res.status(result.status);
        res.json(result.data || result.message);
    }
};