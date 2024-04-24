import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [sol, setSol] = useState(0); // Assumes sol is a number
  const [computeBudget, setComputeBudget] = useState(0); // Assumes computeBudget is a number
  const [pricePerUnit, setPricePerUnit] = useState(0); // Assumes pricePerUnit is a number

  const convertSolToLamports = (sol: number) => sol * 1e9;
  const convertSolToMicrolamports = (sol: number) => sol * 1e12;

  const calculatePriorityFee = (
    computeBudget: number,
    pricePerUnit: number
  ) => {
    const totalMicrolamports = computeBudget * pricePerUnit;
    return totalMicrolamports / 1e12; // Convert microlamports back to SOL
  };

  const calculateTotalSpendingInMicrolamports = (
    sol: number,
    computeBudget: number
  ) => {
    const totalMicrolamportsNeeded = sol * 1e12; // Convert SOL to microlamports
    const microlamportsPerUnit = totalMicrolamportsNeeded / computeBudget;
    return microlamportsPerUnit;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />
        <p>
          Enter SOL amount:
          <input
            type="number"
            value={sol}
            onChange={(e) => setSol(parseFloat(e.target.value) || 0)}
          />
        </p>
        <p>Lamports: {convertSolToLamports(sol)}</p>
        <p>Microlamports: {convertSolToMicrolamports(sol)}</p>
        <p>
          Enter Compute Budget:
          <input
            type="number"
            value={computeBudget}
            onChange={(e) => setComputeBudget(parseFloat(e.target.value) || 0)}
          />
        </p>
        <p>
          Enter Price Per Unit (Microlamports):
          <input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(parseFloat(e.target.value) || 0)}
          />
        </p>
        <p>
          Priority Fee in SOL:{" "}
          {calculatePriorityFee(computeBudget, pricePerUnit)}
        </p>
        <p>
          Required Microlamports per Unit:{" "}
          {calculateTotalSpendingInMicrolamports(sol, computeBudget)}
        </p>
      </header>
    </div>
  );
}

export default App;
