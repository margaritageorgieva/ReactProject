import React, { useState, useEffect } from 'react';
import { saveTask, getTaskById } from '../../core/api/tasks.api';
import { Redirect } from 'react-router-dom';


export function TaskEdit(props){

    
    const [currentTask, setCurrentTask] = useState({title: '', content: '', authorId: '', authorName: '', date: '' }); 
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(()=>{
        if(props.computedMatch.params.id){
            getTaskById(props.computedMatch.params.id).then((result) =>{
                    setCurrentTask(result.data); // populva neshtata v state-a
            });
        }
    },[props.computedMatch.params.id]) // useEffecta se izpulnqva samo kogato params.id se promeni
  
    
    const onInputChange = (event) =>{
            event.persist();
            setCurrentTask((prevState) =>({
                ...prevState,
                [event.target.name]: event.target.value
            }));
            //ograjdame {} s () za da return-va neshto
    }

    const onTaskSave =(event) =>{
        event.preventDefault();
        saveTask(currentTask).then(() => {
                setShouldRedirect(true);
        })
        .catch((err) => console.error(err));
    }

    return(
        <>
        {shouldRedirect && <Redirect to='/tasks'></Redirect>}

        <div className='task-edit-wrapper'>
                <form onSubmit={onTaskSave}>

                        <div className="form-group">
                            <label labelfor="title">Title: </label>
                            <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentTask.title} requared />
                        </div>
                        <div className="form-group">
                            <label labelfor="content">Content: </label>
                            <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentTask.content} requared />
                        </div>
                        <div className="form-group">
                            <label labelfor="rating">Rating: </label>
                            <input className="form-control" id="rating" type="number" name="rating" onChange={onInputChange} value={currentTask.rating} requared/>
                        </div>
                        <div className='form-group'> 
                            <label labelfor='status'>Status: </label>
                            <select className='form-control' id='status' name='status' onChange={onInputChange} value={currentTask.status}>
                                <option value='Active'>Active</option>
                                <option value='Pending'>Pending</option>
                                <option value='Done'>Done</option>
                            </select>
                        </div>

                     <button className="btn btn-primary">Save task</button>
                </form>
        </div>
    </>
    )
}
