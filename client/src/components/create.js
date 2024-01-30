import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
 const [form, setForm] = useState({
   item: "",
   quantity: "",
   maxQuantity: "",
   quantity_threshold: "",
 });
 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };

   await fetch("http://localhost:5050/record", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setForm({ item: "", quantity: "", maxQuantity: "", quantity_threshold: "" });
   navigate("/");
 }

 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="item">Item</label>
         <input
           type="text"
           className="form-control"
           id="item"
           value={form.item}
           onChange={(e) => updateForm({ item: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="quantity">Quantity</label>
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
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
