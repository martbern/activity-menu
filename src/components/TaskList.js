import React, { useState, useEffect } from 'react'
import Todo from "./Record";
import Airtable from 'airtable-node'

const airtable = new Airtable({apiKey: 'keywMvCl7aRV4a5af'})
    .base('appMcSmdPtPWcBhIX')
    .table('Activities')

export default function TaskList(props) {

    const [activities, setActivities] = useState({});

    useEffect(() => {
        airtable.list({
            maxRecords: 999,
            pageSize: 100,
            view: "L: All activities",
            cellFormat: 'json'
        })
        .then((data) => {
            setActivities(data.records);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    console.log(activities)

    console.log("Testing " + props.cycle)

    return (
        <div className="justify-center max-w-lg w-full">
            <ul>
                {activities.length > 0 ? (
                    activities
                    .filter(record => record.fields["Show in menu"] === 1)
                    .filter(record => record.fields["Fin"] !== true)
                    .sort((a,b) => (a.fields["Rting_UL"] < b.fields["Rting_UL"]) ? 1 : ((b.fields["Rting_UL"] < a.fields["Rting_UL"]) ? -1 : 0))
                    .map((record) => (
                        <Todo
                            name={record.fields.name_string}
                            key={record.id}
                            id={record.id}
                        />
                    ))
                ) : (
                    <p>Fetching activity-menu if any uncompleted...</p>
                )}
            </ul>
        </div>
    );
}
