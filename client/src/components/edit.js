import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
 const [form, setForm] = useState({
   item: "",
   quantity: "",
   maxQuantity: "",
   quantity_threshold: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();

 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);

     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }

     setForm(record);
   }

   fetchData();

   return;
 }, [params.id, navigate]);

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     item: form.item,
     quantity: form.quantity,
     maxQuantity: form.maxQuantity,
     quantity_threshold: form.quantity_threshold,
   };

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5050/record/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });

   navigate("/");
 }

 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="item">Item </label>
         <input
           type="text"
           className="form-control"
           id="item"
           value={form.item}
           onChange={(e) => updateForm({ item: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="quantity">Quantity: </label>
         <input
           type="text"
           className="form-control"
           id="quantity"
           value={form.quantity}
           onChange={(e) => updateForm({ quantity: e.target.value })}
         />
       </div>
       <div className="form-group">
        <label htmlFor="maxQuantity">Max Quantity</label>
        <input
          type="text"
          className="form-control"
          id="maxQuantity"
          value={form.maxQuantity}
          onChange={(e) => updateForm({ maxQuantity: e.target.value })}
         />
       </div>
       <div className="form-group">
          <label htmlFor="quantity_threshold">Threshold</label>
          <input
            type="text"
            className="form-control"
            id="quantity_threshold"
            value={form.quantity_threshold}
            onChange={(e) => updateForm({ quantity_threshold: e.target.value })}
          />
       </div>
       <br />

       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
