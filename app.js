const express = require('express');
require('./config/database');
const checkList = require('./src/routes/checklist');
const taskRouter = require('./src/routes/tasks')
const indexEjs = require('./src/routes/index');
const methodOverride = require('method-override');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method', { methods:['POST','GET'] }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', indexEjs);
app.use('/task', taskRouter.Simple)
app.use('/checklists',checkList);
app.use('/checklists',taskRouter.TasksDependent)
app.use('/tasks',taskRouter.TasksDelete)

app.listen(3000, () => {
    console.log('Starter Server...');
})