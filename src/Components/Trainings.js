import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    }

    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => {return moment(row.value).format('LLL')}
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} sortable={true} data={trainings} columns={columns} />
        </div>
    );
}