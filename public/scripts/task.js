setTagAsDone = async function(e, id) {
    try {
        let headers = new Headers({'Content-Type': 'application/json'});
        let body = JSON.stringify({task: {done: e.checked}});
        let responce = await fetch(`/task/${id}?_method=PUT`, { headers: headers, method: 'PUT', body: body});
        let data = await responce.json();
        let task = data.task;
        let parent = e.parentNode;
        if(task.done){
            e.checked = true;
            parent.classList.add('ist-italic');
            parent.classList.add('has-text-success');
        } else {
            e.checked = false;
            parent.classList.remove('ist-italic');
            parent.classList.remove('has-text-success');    
        }

    } catch (err) {
        alert('Erro ao atualizar');
        console.log(err);
    }
}