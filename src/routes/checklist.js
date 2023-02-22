const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist')
const Task = require('../models/task')


router.get('/', async (req, res) => {
    try {
        let checklist = await Checklist.find({})
        res.status(200).render('checklists/index', { checklist: checklist })
    } catch (error) {
        console.error(error)
        res.status(422).render('pages/error', { err: 'Error for show checklists' })
    }
});

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist()
        res.status(200).render('checklists/new',{checklist: checklist})
    } catch (error) {
        console.error(error)
        res.status(404).render('pages/error',{errors:error})
    }
})

router.get('/:id/edit', async(req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', {checklist});
    }catch(error){
        res.status(500).render('pages/error',{errors:error})
    }
})

router.get('/:id/jsonreq', async(req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id).populate('tasks')
        res.status(200).json(checklist)
    }catch(error){
        res.status(500).render('pages/error',{errors:error})
    }
})

router.post('/', async (req, res) => {

    let { name } = req.body.checklist
    let checklist = new Checklist({name})

    try {
        await checklist.save()
        res.redirect('/checklists')
    } catch (errors) {
        res.status(500).render('checklists/new', {checklist:{...checklist, errors}})
    }
});

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks')
        res.status(200).render('checklists/show', { checklist: checklist })
    } catch (error) {
        console.error(error)
        res.status(422).json(error)
    }
})

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist
    let checklist = await Checklist.findById(req.params.id)
    try {
        await checklist.update({name})
        res.redirect('/checklists')
    } catch (error) {
        console.error(error)
        res.status(422).render('checklists/edit', { checklist: { ...checklist, error } })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await Checklist.findByIdAndDelete(req.params.id, { new: true })
        res.redirect('/checklists')
    } catch (errors) {
        res.status(404).render('pages/error',{errors:errors})
    }
})

module.exports = router;