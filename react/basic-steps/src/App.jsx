/* eslint-disable react/prop-types */

import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrev() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button bgClr="#7950f2" textClr="#fff" onClick={handlePrev}>
              <span>- </span>Previous
            </Button>
            <Button bgClr="#7950f2" textClr="#fff" onClick={handleNext}>
              Next<span> -</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ children, step }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      <p>{children}</p>
    </div>
  );
}

function Button({ children, bgClr, textClr, onClick }) {
  return (
    <button
      style={{ backgroundColor: bgClr, color: textClr }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
