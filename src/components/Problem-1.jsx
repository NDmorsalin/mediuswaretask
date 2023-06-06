import { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [data, setData] = useState([]);

  const handleClick = (val) => {
    setShow(val);
    if (val === "all") {
      const fetchAll = async () => {
        const req = await fetch("http://localhost:5000/api/userInfo");
        const data = await req.json();
        const active = data.filter(
          (info) => info.status.toLowerCase() === "active"
        );
        const completed = data.filter(
          (info) => info.status.toLowerCase() === "completed"
        );
        const pending = data.filter(
          (info) => info.status.toLowerCase() === "pending"
        );
        const archive = data.filter(
          (info) => info.status.toLowerCase() === "archive"
        );
        const rest = data.filter(
          (info) =>
            info.status.toLowerCase() !== "active" &&
            info.status.toLowerCase() !== "completed" &&
            info.status.toLowerCase() !== "pending" &&
            info.status.toLowerCase() !== "archive"
        );
        setData([...active, ...completed, ...pending, ...archive, ...rest]);
      };
      fetchAll();
    } else if (val === "active") {
      const fetchAll = async () => {
        const req = await fetch("http://localhost:5000/api/userInfo");
        const data = await req.json();
        const newData = data.filter(
          (info) => info.status.toLowerCase() === "active"
        );
        setData(newData);
      };
      fetchAll();
    } else if (val === "completed") {
      const fetchAll = async () => {
        const req = await fetch("http://localhost:5000/api/userInfo");
        const data = await req.json();
        const newData = data.filter(
          (info) => info.status.toLowerCase() === "completed"
        );
        setData(newData);
      };
      fetchAll();
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const status = e.target[1].value;
    const newData = [...data, { name, status }];

    const req = await fetch("http://localhost:5000/api/userInfo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        status,
      }),
    });
    const res = await req.json();

    setData(newData);
    console.log({ data, res });
  };

  useEffect(() => {
    const fetchAll = async () => {
      const req = await fetch("http://localhost:5000/api/userInfo");
      const data = await req.json();
      const active = data.filter(
        (info) => info.status.toLowerCase() === "active"
      );
      const completed = data.filter(
        (info) => info.status.toLowerCase() === "completed"
      );
      const pending = data.filter(
        (info) => info.status.toLowerCase() === "pending"
      );
      const archive = data.filter(
        (info) => info.status.toLowerCase() === "archive"
      );
      const rest = data.filter(
        (info) =>
          info.status.toLowerCase() !== "active" &&
          info.status.toLowerCase() !== "completed" &&
          info.status.toLowerCase() !== "pending" &&
          info.status.toLowerCase() !== "archive"
      );
      setData([...active, ...completed, ...pending, ...archive, ...rest]);
    };
    fetchAll();
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={onSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((info, index) => (
                <tr key={index}>
                  <td>{info.name}</td>
                  <td>{info.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
