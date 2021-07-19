import React,{useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { addTodo, deleteTodo } from '../../actions/index';
import {useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";

function TasksPages() {
    const [cardForm, setcardForm] = useState(false)
    const [date, setDate] = useState(new Date());
    const [titel, setTitel] = useState("");
    const [description, setDescription] = useState("");
    const timeValue: Date = new Date("01/01/2021 00:00 AM");
    const minTime: Date = new Date("01/02/2021 01:00 AM");
    const maxTime: Date = new Date("01/02/2021 05:00 AM");
    const list = useSelector((state)=> state.todoReducers.list);
    const dispatch = useDispatch();
  
    const formToggle = () =>{
        setcardForm(!cardForm)
    }
    const onchangeDate = date =>{
        setDate(date) 
    }

    const onChangeTitle = (e) =>{
        setTitel(e.target.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    
    return (
        <div className="container my-5 App" style={{alignItems: "center"}}>
            <div className="jumbotron py-3" style={{backgroundColor: "LightGray", width: "50%"}}>
                <div className="row">
                    <div className="col-md-10">
                        <h2 className="display-10 text-upperCase">
                            TASk
                        </h2>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-success m-1 text-center" onClick={formToggle}>+</button>
                    </div>
                </div>
                {/* inputs from */}
                {cardForm && (
                <form>
                    <div className="form-group">
                    <div>Task Description</div>
                        <textarea type="text"
                            className="form-control"
                            onChange={onDescriptionChange}
                        >
                        </textarea>
                    </div>
                    <div>Date</div>
                    <div>
                        <DatePicker selected={date} onChange={onchangeDate}/>
                       <div>
                       <div>Time</div>
                        <TimePickerComponent 
                        value={timeValue}
                        min={minTime}
                        max={maxTime}
                        format="HH.mm"
                        step={60}
                      
                        ></TimePickerComponent>
                       </div>
                    </div>
                    <div className="form-group">
                        <div>Assign User</div>
                        <input type="text"
                            className="form-control"
                            onChange={onChangeTitle}
                        />
                    </div>
                    <button type="submit"
                    className="btn btn-primary"
                    onchange={() => dispatch(addTodo(titel, description), setTitel(''), setDescription(''))}
                    >
                        Submit
                    </button>
                </form>
                )}
            </div>
            <div className="row d-flex justify-content-center position-relative" style={{backgroundColor: "LightGray", width: "50%", marginTop: "20px", alignItems: "center"}}>
                {
                    list.map((elem)=> {
                        return(
                        <div key={elem.id}>
                          <h3>{elem.data}</h3>
                          <FaTrash  onchange={() => dispatch(deleteTodo(elem.id), setTitel(''))} />
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TasksPages
