import React, { useState } from 'react';
import AddEvent from '../AddEvent/AddEvent';
import RegisterTable from '../RegisterTable/RegisterTable';

const AdminPage = () => {
    const [volunteerList, setVolunteerList] = useState(true);
    return (
        <div className="row">
            <div className="col-md-3 pt-5 mt-4">
                <div className="admin-button my-5 d-flex flex-column">
                    <button className={`${volunteerList && "text-primary"}`} onClick={() => setVolunteerList(true)} >
                        <h5><i className="fa fa-user" aria-hidden="true"></i> Volunteer register list</h5>
                    </button>
                    <button className={`${!volunteerList && "text-primary"}`} onClick={() => setVolunteerList(false)} >
                        <h5><i className="fa fa-plus" aria-hidden="true"></i> Add event</h5>
                    </button>
                </div>
            </div>
            <div className="col-md-9">
                {volunteerList ? 
                    (
                        <div className="admin__table p-3">
                            <h3 className="mb-3">Volunteer Register List</h3>
                            <RegisterTable></RegisterTable>
                        </div>
                    ) 
                : 	
                    (
                        <div className="p-3">
                            <h3>Add another event</h3>
                            <AddEvent></AddEvent>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AdminPage;