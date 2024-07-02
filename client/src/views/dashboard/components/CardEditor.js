import "../styles/CardEditor.css";

import React, { Component, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";
import { useDispatch } from "react-redux";

function CardEditor(props){
  const dispatch = useDispatch();
  const [state,setState] = useState({
    text: props.text || ""
  })


 const  handleChangeText = event => setState({ text: event.target.value });

  const onEnter = (e) => {

    const { text } = state;
    console.log("text ✔✔",text);
    if (e.keyCode === 13) {
      e.preventDefault();
      props.onSave(text);
    }
  };
  

  const { text } = state;
  const { onSave, onCancel, onDelete, adding } = props;
  


    return (
      <div className="Edit-Card">
        <div className="Card">
          <TextareaAutosize
            autoFocus
            className="Edit-Card-Textarea"
            placeholder="Enter the text for this card..."
            value={text}
            onChange={handleChangeText}
            onKeyDown={onEnter}
          />
        </div>
        <EditButtons
          handleSave={() => onSave(text)}
          saveLabel={adding ? "Add card" : "Save"}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
      </div>
    );
  
}

export default CardEditor;





import "../styles/CardEditor.css";
import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";
import axios from 'axios';

class CardEditor extends Component {
  state = {
    modelName: this.props.modelName || "",
    fields: this.props.fields || [{ name: "", type: "String", required: false }],
    data: this.props.data || {}
  };

  handleChangeModelName = event => this.setState({ modelName: event.target.value });

  handleChangeField = (index, event) => {
    const fields = [...this.state.fields];
    fields[index][event.target.name] = event.target.value;
    this.setState({ fields });
  };

  handleAddField = () => {
    this.setState({ fields: [...this.state.fields, { name: "", type: "String", required: false }] });
  };

  handleChangeData = event => {
    const data = { ...this.state.data, [event.target.name]: event.target.value };
    this.setState({ data });
  };

  handleSaveModel = async () => {
    const { modelName, fields } = this.state;

    try {
      await axios.post('http://localhost:5000/create-model', { modelName, fields });
      alert(`Model ${modelName} created successfully.`);
    } catch (error) {
      console.error('Error creating model:', error);
    }
  };

  handleSaveData = async () => {
    const { modelName, data } = this.state;

    try {
      const response = await axios.post('http://localhost:5000/save-data', { modelName, data });
      this.props.onSave(response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  render() {
    const { modelName, fields, data } = this.state;
    const { onSave, onCancel, onDelete, adding } = this.props;

    return (
      <div className="Edit-Card">
        <div className="Card">
          <input
            type="text"
            placeholder="Enter model name"
            value={modelName}
            onChange={this.handleChangeModelName}
            className="Edit-Card-UserInput"
          />
          <button onClick={this.handleAddField}>Add Field</button>
          {fields.map((field, index) => (
            <div key={index} className="Edit-Card-Field">
              <input
                type="text"
                name="name"
                placeholder="Field name"
                value={field.name}
                onChange={e => this.handleChangeField(index, e)}
              />
              <select
                name="type"
                value={field.type}
                onChange={e => this.handleChangeField(index, e)}
              >
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Date">Date</option>
                <option value="Boolean">Boolean</option>
              </select>
              <input
                type="checkbox"
                name="required"
                checked={field.required}
                onChange={e => this.handleChangeField(index, { target: { name: 'required', value: e.target.checked } })}
              />
              <label>Required</label>
            </div>
          ))}
          <button onClick={this.handleSaveModel}>Save Model</button>
          {fields.map((field, index) => (
            <div key={index} className="Edit-Card-Field">
              <input
                type={field.type.toLowerCase()}
                name={field.name}
                placeholder={`Enter ${field.name}`}
                value={data[field.name] || ""}
                onChange={this.handleChangeData}
                required={field.required}
              />
            </div>
          ))}
        </div>
        <EditButtons
          handleSave={this.handleSaveData}
          saveLabel={adding ? "Add card" : "Save"}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
      </div>
    );
  }
}

export default CardEditor;
