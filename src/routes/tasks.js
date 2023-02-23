const express = require('express');

const TasksDependentRoute = express.Router();
const TasksDependentDelete = express.Router();
const simpleRouter = express.Router()

const Checklist = require('../models/checklist')
const Task = require('../models/task')

TasksDependentRoute.get('/:id/tasks/new', async (req , res) => {
    try{
        let task = Task();
        res.status(200).render('tasks/new',{listId: req.params.id, task: task })
    }catch(error){
        res.status(500).render('pages/error',{errors:error})
    }
});
TasksDependentRoute.post('/:id/tasks', async (req, res) => {

    let {name} = req.body.task;
    let task = Task({name, checklist:req.params.id});

    try{
        await task.save()

        let checklist = await Checklist.findById(req.params.id);
        checklist.tasks.push(task);
        await checklist.save()

        res.status(200).redirect('/checklists/'+req.params.id)
    }catch(errors){
        res.status(500).render('/tasks/new',{listId: req.params.id,task:{...task,errors:errors}})
    }
});

TasksDependentDelete.delete('/:id', async (req,res) => {

    try{
        let task = await Task.findByIdAndDelete (req.params.id);
        let checkList = await Checklist.findById(task.checklist);
        let taskToRm = checkList.tasks.indexOf(task._id);
        checkList.tasks.splice(taskToRm, 1);
        await checkList.save();
        res.status(200).redirect(`/checklists/${checkList._id}`);
    } catch(error) {
        res.status(500).render('pages/error',{errors: error});
        console.log(error);
    }
})

simpleRouter.put('/:id', async (req, res) => {
    let task = await Task.findById(req.params.id)

    try{
        task.set(req.body.task);
        await task.save();
        res.status(200).json({ task });
    } catch(error){
        let errors = error.errors;
        res.status(500).json({task:{...errors}});
        console.log(error);
    }
})

module.exports = {
    TasksDependent: TasksDependentRoute,
    TasksDelete: TasksDependentDelete,
    Simple: simpleRouter
}