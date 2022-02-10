import React from "react";
import "./Card.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Card() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
user();
  }, []);
function user(){
  setLoading(true);
  fetch(`http://localhost:3002/add/list/${197113}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setDataSource(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
}

function deleteuser(uid) {
  fetch(`http://localhost:3002/add/list/${uid}`, {
    method: "DELETE",
  }).then((result) => {
    result.json().then((resp) => {
      console.warn(resp);
      user();
    });
  });
}

  return (
    <>
      {dataSource.map((data) => {
        return (
          <>
            <div className='container'>
              <div class='row'>
                <div class='column'>
                  <div className='card'>
                    <div className='card_body'></div>
                    <h2 className='card_title'>{data.name}</h2>
                    <p className='card_email'>{data.email}</p>
                    <h7 className='card_id'>UID: {data.uid}</h7>

                    <Link to={`./Table/${data.uid}`}>
                      <button className='card_btn'>View Details</button>
                    </Link>
                    <button onClick={()=>deleteuser(data.uid)} className="dele-btn">delete </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
