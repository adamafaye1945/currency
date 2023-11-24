

import { useEffect, useState } from "react";

export default function App() {
  // state
  const [amount, setAmount] = useState(10);
  const [from_currency, set_from_currrency] = useState("USD");
  const [to_currency, set_to_currency] = useState("EUR");
  const [result, set_result] = useState(null);

  // useEffect hook with dependencies amount, from_currency, to_currency. and function to fecth api
  // if dependencies changes
  useEffect(
    function () {
      async function converter() {
        try {
          //api fetching
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from_currency}&to=${to_currency}`
          );
          const data = await res.json();
          set_result(data.rates[to_currency]);
        } catch (error) {
          console.error(error);
          set_result(0);
        }
      }
      // setting result to amount if it's converted to the same currency
      if (from_currency === to_currency) {
        set_result(amount);
      } else {
        converter();
      }
    },
    [amount, from_currency, to_currency]
  );
  

  return (
    <div>
      <input
        value={amount}
        type="text"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select onChange={(e) => set_from_currrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e) => set_to_currency(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>

        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        <b>
          {amount} {from_currency}
        </b>{" "}
        is equal to{" "}
        <b>
          {result} {to_currency}
        </b>
      </p>
    </div>
  );
}
