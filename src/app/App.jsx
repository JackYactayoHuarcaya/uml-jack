import html2canvas from "html2canvas";
import React, { useState } from "react";

let actionGuardarJPJ = () => {
  const containerGuardar = document.getElementById("container-button");
  const guardar = document.getElementById("img-canvas");
  html2canvas(guardar).then((canvas) => {
    let a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "jack-uml.png";
    containerGuardar.appendChild(a);
    a.click();
  });
};

let App = () => {
  const [claseTitulo, setClaseTitulo] = useState("");
  const [arrAtributos, setArrAtributos] = useState([]);
  const [constructor, setConstructor] = useState("");
  const [arrMetodos, setArrMetodos] = useState([]);
  let handlerTextarea = (e) => {
    setClaseTitulo("");
    setArrAtributos([]);
    setConstructor("");
    setArrMetodos([]);
    let text = `${e.target.value}`;
    let filterText = text.split("class");
    let corteClass = filterText[1].indexOf("{");
    // mi clase ----------------------------------------
    let textClass = filterText[1].slice(0, corteClass).trim();
    setClaseTitulo(textClass);
    // nuevo atributos---------------------------------------
    let newArregloMetodos = filterText[1].split("}");
    let corteDos = newArregloMetodos[0].split(`${textClass}`);
    let atributosClass = corteDos[1].split("(");
    let atrClss = atributosClass[0].split(";");
    atrClss.forEach((el, i) => {
      if (atrClss.length - 1 === i) {
        return;
      } else if (i === 0) {
        let e = el.split("{");
        let primerArr = e[1];
        let separar = primerArr.split(" ");
        let arr = [separar[separar.length - 1], separar[separar.length - 2]];
        let arrTe = arr.join(": ").concat(";");
        setArrAtributos((el) => [...el, arrTe]);
      } else {
        let e = el.split(" ");
        let arr = [e[e.length - 1], e[e.length - 2]];
        let arrTe = arr.join(": ").concat(";");
        setArrAtributos((el) => [...el, arrTe]);
      }
    });
    // contructor -----------------------------
    let arrNewCM = filterText[1].split("{");
    let constructor = arrNewCM[1].split(textClass);
    let newConstructor = `<<constructor>> ${textClass}${constructor[1].trim()};`;
    setConstructor(newConstructor);
    // metodos ---------------------------------
    newArregloMetodos.forEach((el, i) => {
      if (i > 0) {
        let arr = el.split(")");
        let newArrMetodo = arr[0];
        if (newArrMetodo.length > 6) {
          let arSpace = newArrMetodo.trim();
          let arr = arSpace.split(" ");
          let aarr = [];
          arr.forEach((el, i) => {
            if (i !== 0) {
              aarr.push(el);
            }
          });
          let aarrDos = [];
          let aarrTres = [];
          aarr.forEach((el, i) => {
            if (i === 0) {
              aarrTres.push(el);
            } else {
              aarrDos.push(el);
            }
          });

          let arrFinaly = [[...aarrDos, "): ", ...aarrTres]];
          let textArrFinaly = arrFinaly[0].join(" ").concat(";");
          setArrMetodos((el) => [...el, textArrFinaly]);
        }
      }
    });
  };
  return (
    <div className="container m-auto">
      <div className="w-full flex items-center flex-col">
        <div>
          <header>
            <h1 className="text-4xl text-center p-3">Progama UML - JACK</h1>
            <h2 className="text-2xl text-center">java-class</h2>
          </header>
          <div>
            <textarea
              className="textarea-codigo border-2 border-slate-800"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="codigo"
              onChange={handlerTextarea}
            ></textarea>
          </div>
        </div>
        <div id="img-canvas" className="p-3">
          <div>
            <section className="text-2xl section-list section-list-1 text-center">
              {claseTitulo}
            </section>
            <section className="section-list section-list-2 ">
              {arrAtributos.map((el, i) => (
                <li key={i}>{"- " + el}</li>
              ))}
            </section>
            <section className="section-list section-list-3 ">
              <li>{constructor}</li>
              {arrMetodos.map((el, i) => (
                <li key={i}>{"+ " + el}</li>
              ))}
            </section>
          </div>
        </div>
        <div id="container-button">
          <button
            onClick={actionGuardarJPJ}
            className="bg-slate-600 text-white p-2 rounded mt-1"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
