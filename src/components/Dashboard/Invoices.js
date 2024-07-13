import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, "invoices"),
      where("uid", "==", localStorage.getItem("uid"))
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInvoices(data);
    setIsLoading(false);
  };

  const deleteInvoice = async (id) => {
    const isSure = window.confirm("Are you sure you want to Delete");
    if (isSure) {
      try {
        await deleteDoc(doc(db, "invoices", id));
        getData();
      } catch (error) {
        window.alert("Something is Wrong");
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            style={{ fontSize: 30 }}
            class="fa-solid fa-spinner fa-spin-pulse"
          ></i>
        </div>
      ) : (
        <div>
          {invoices.map((data) => (
            <div className="box" key={data.id}>
              <p>{data.to}</p>
              <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
              <p>Rs. {data.total}</p>
              <button
                onClick={() => {
                  deleteInvoice(data.id);
                }}
                className="delete-btn"
              >
                <i className="fa-solid fa-trash"></i> Delete
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard/invoice-detail", { state: data });
                }}
                className="delete-btn view-btn"
              >
                <i className="fa-solid fa-eye"></i> View
              </button>
            </div>
          ))}
          {invoices.length < 1 && (
            <div className="no-invoice-wrapper">
              <p>You have no invoice till now</p>
              <button
                onClick={() => {
                  navigate("/dashboard/newinvoice");
                }}
              >
                Create New Invoice
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Invoices;
