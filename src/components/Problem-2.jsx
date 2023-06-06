import { useEffect, useState } from "react";

const Problem2 = () => {
  const [allContact, setAllContact] = useState(null);
  const [usaContact, setUsaContact] = useState(null);
  const fetchAllContacts = async () => {
   
    const req = await fetch("https://contact.mediusware.com/api/contacts/");
    const data = await req.json();
    console.log(data);
    setAllContact(data);
  };
  const fetchEvenContacts = async (e) => {
    if (!e.target.checked) {
      const req = await fetch("https://contact.mediusware.com/api/contacts/");
      const data = await req.json();
      
      
      setAllContact(data);
    } else { 
      const req = await fetch("https://contact.mediusware.com/api/contacts/");
      const data = await req.json();

      const evenContact = {
        ...data,
        results:data.results.filter((contact) => contact.id % 2 === 0)
      }
      setAllContact(evenContact);
     }
    
  };
 
  const fetchUsContacts = async() =>{
const req = await fetch("https://contact.mediusware.com/api/country-contacts/United%20States/");
      const data = await req.json();
      setUsaContact(data)
  }
  
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

          <div className="d-flex justify-content-center gap-3">
            <button
              onClick={fetchAllContacts}
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
              className="btn btn-lg btn-outline-primary"
              type="button"
            >
              All Contacts
            </button>
            <button
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
              className="btn btn-lg btn-outline-warning"
              type="button"
              onClick={fetchUsContacts}

            >
              US Contacts
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button className="btn btn-lg btn-outline-primary" type="button">
                All Contacts
              </button>

              <button
              onClick={fetchUsContacts}
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
                className="btn btn-lg btn-outline-warning mx-auto"
                type="button"
              >
                US Contacts
              </button>

              <button
                type="button"
                className="btn btn-lg btn-outline-danger mx-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
            <div className="modal-body">
              <table className="table table-striped-columns">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Country</th>
                  </tr>
                </thead>
                <tbody>
                  {allContact &&
                    allContact?.results?.map((contact, index) => (
                      <tr key={contact.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{contact.phone}</td>
                        <td>{contact.country.name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <input
                onChange={fetchEvenContacts}
                type="checkbox"
                name=""
                id="evenId"
                className="text-bg-info"
              />{" "}
              <label htmlFor="evenId" className="">
                Even id only
              </label>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={fetchAllContacts}
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
                className="btn btn-lg btn-outline-primary"
                type="button"
              >
                All Contacts
              </button>

              <button
                className="btn btn-lg btn-outline-warning mx-auto"
                type="button"
              >
                US Contacts
              </button>

              <button
                type="button"
                className="btn btn-lg btn-outline-danger mx-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
            <div className="modal-body">
              
            <table className="table table-striped-columns">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Country</th>
                  </tr>
                </thead>
                <tbody>
                  {usaContact &&
                    usaContact?.results?.map((contact, index) => (
                      <tr key={contact.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{contact.phone}</td>
                        <td>{contact.country.name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Problem2;
