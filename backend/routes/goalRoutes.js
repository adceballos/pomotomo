// we could add our functionality in the body of these callback functions, but its better practice to create a controller and have our functions there (/controllers/goalController.js)
const express = require('express')  // common js module syntax, different from ES2015 syntax where you say "import" and so on
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

// we were able to condense get and post together because they had the same route '/', same with put and delete '/:id'
/*
router.get('/', getGoals)

router.post('/', setGoal)

// this is an example of our post callback function before we condensed them using controller functions
router.post('/', (req, res) => {
    res.status(200).json({message: 'set goal'})
})

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)
*/

module.exports = router