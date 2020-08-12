import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Addtraining from './Addtraining'
import Edittraining from './Edittraining'

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Please confirm delete')) {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        }
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const updateTraining = (training, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => {return moment(row.value).format('llll')}
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },        
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            sortable: false,
            filterable: false,
            width: 80,
            Cell: row => <Edittraining updateTraining={updateTraining} training={row.original}/>
        },
        {
            sortable: false,
            filterable: false,
            width: 80,
            accessor: 'links[0].href',
            Cell: row => <Button color="secondary" size="small" onClick={() => deleteTraining(row.value)}>Delete</Button>
        },
    ]

    return (
        <div>
            <Addtraining saveTraining={saveTraining}/>
            <ReactTable filterable={true} sortable={true} data={trainings} columns={columns} />
        </div>
    );
}