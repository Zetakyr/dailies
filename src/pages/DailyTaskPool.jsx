import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { dailySetPool } from "../redux/dailies";

const DailyTaskPool = () => {
  const [view, setView] = useState("mandatory");
  const { dailyPool } = useSelector((state) => state.dailies);
  const [mandatoryTasks, setMandatoryTasks] = useState(dailyPool[0]);
  const [optionalTasks, setOptionalTasks] = useState(dailyPool[1]);
  const { control, register } = useForm();
  const dispatch = useDispatch();

  const [tempDailyPool, setTempDailyPool] = useState([...dailyPool]);

  const {
    fields: fieldsMandatory,
    remove: removeMandatory,
    append: appendMandatory,
    update: updateMandatory,
  } = useFieldArray({ control, name: "mandatories" });

  const {
    fields: fieldsOptional,
    remove: removeOptional,
    append: appendOptional,
    update: updateOptional,
  } = useFieldArray({ control, name: "optionals" });

  useEffect(() => {
    for (let i = 0; i < mandatoryTasks.length; i++) {
      appendMandatory({ task: mandatoryTasks[i].task });
    }

    for (let i = 0; i < optionalTasks.length; i++) {
      appendOptional({ task: optionalTasks[i].task });
    }
  }, []);

  useEffect(() => {
    setTempDailyPool([fieldsMandatory, fieldsOptional]);
  }, [fieldsOptional, fieldsMandatory]);

  const renderTasks = () => {
    switch (view) {
      case "optional":
        return (
          <>
            {fieldsOptional.map((field, index) => (
              <div className="taskRow" key={[field, index]}>
                <input
                  className="taskInput"
                  key={field.id}
                  {...register(`optionals.${index}.value`, {
                    onBlur: (e) => {
                      if (e.target.value != "") {
                        updateOptional(index, { task: e.target.value });
                      } else {
                        removeOptional(index);
                      }
                    },
                  })}
                  placeholder="Task"
                  defaultValue={field.task}
                />
                <div
                  className="removeButton"
                  onClick={() => removeOptional(index)}
                >
                  Remove
                </div>
              </div>
            ))}
          </>
        );

      default:
        return (
          <>
            {fieldsMandatory.map((field, index) => (
              <div className="taskRow" key={[field, index]}>
                <input
                  className="taskInput"
                  key={field.id}
                  {...register(`mandatories.${index}.value`, {
                    onBlur: (e) => {
                      if (e.target.value != "") {
                        updateMandatory(index, { task: e.target.value });
                      } else {
                        removeMandatory(index);
                      }
                    },
                  })}
                  placeholder="Task"
                  defaultValue={field.task}
                />
                <div
                  className="removeButton"
                  onClick={() => removeMandatory(index)}
                >
                  Remove
                </div>
              </div>
            ))}
          </>
        );
    }
  };

  return (
    <div className="rightContainer">
      <div className="rc-Child">
        <div
          className={`mandatoryOptional mandatory ${
            view === "mandatory" ? "currentTab" : ""
          }`}
          onClick={() => {
            setView("mandatory");
          }}
        >
          Mandatory
        </div>
        <div
          className={`mandatoryOptional optional ${
            view === "optional" ? "currentTab" : ""
          }`}
          onClick={() => {
            setView("optional");
          }}
        >
          Optional
        </div>
      </div>
      <div className="tasks center tasksShorter">
        <div className="taskInputs">
          {renderTasks()}
          <div
            className="addButton"
            onClick={() => {
              if (view == "mandatory") {
                appendMandatory({ task: "" });
              } else if (view == "optional") {
                appendOptional({ task: "" });
              }
            }}
          >
            Add
          </div>
        </div>
      </div>
      <div className="rc-footer">
        <div
          className="submitButton"
          onClick={() => {
            console.table(fieldsOptional);
            console.log([fieldsMandatory, fieldsOptional]);
            for (let i = fieldsMandatory.length - 1; i >= 0; i--) {
              if (fieldsMandatory[i].task == "") {
                removeMandatory(i);
              }
            }
            for (let i = fieldsOptional.length - 1; i >= 0; i--) {
              if (fieldsOptional[i].task == "") {
                removeOptional(i);
              }
            }
            dispatch(dailySetPool(tempDailyPool));
          }}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default DailyTaskPool;
