import React, { useState, useEffect } from "react";
import Badge from "../Badge";
import List from "../List";
import "./AddList.scss";
import CloseSvg from "../../assets/img/close.svg";
import axios from "axios";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, SetVisiblePopup] = useState(false);
  const [SelectedColor, SelectColor] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      SelectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    SetVisiblePopup(false);
    SelectColor(colors[0].id);
    setInputValue("");
  };
  const addList = () => {
    if (!inputValue) {
      alert("Вы не ввели название папки");
      return;
    }
    setIsLoading(true);
    axios.post('http://localhost:3001/lists', {name: inputValue, colorId: SelectedColor})
    .then(({data}) => {
     const color = colors.filter((color) => color.id === SelectedColor)[0].name;
     const listObj = { ...data, color: {name: color} };
     onAdd(listObj);
     onClose();
     setIsLoading(false);
    }).finally(() => setIsLoading(false))
  };

  return (
    <div className="add-list">
      <List
        onClick={() => SetVisiblePopup(!visiblePopup)}
        items={[
          {
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="list__add-plus"
              >
                <path
                  d="M6 1V11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
            className: "list__add-button",
          },
        ]}
      />

      {visiblePopup && (
        <div className="add-list__popup">
          <img
            src={CloseSvg}
            alt="close"
            className="add-list__popup-close-btn"
            onClick={onClose}
          />
          <input
            className="field"
            placeholder="Введите название списка"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => SelectColor(color.id)}
                key={Math.random()*10}
                color={color.name}
                className={SelectedColor === color.id && "true"}
              />
            ))}
          </div>
          <button onClick={addList}>
            {isLoading ? "Добавление..." : "Добавить"}
            </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
