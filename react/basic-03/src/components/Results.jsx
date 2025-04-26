import { calculateInvestmentResults, formatter } from '../util/investment';

export function Results({ userInput }) {
  const annualData = calculateInvestmentResults(userInput);
  const initialInvestment =
    annualData[0].valueEndOfYear -
    annualData[0].interest -
    annualData[0].annualInvestment;

  return (
    <table id='result'>
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {annualData.map((c) => {
          const totalInterest =
            c.valueEndOfYear - c.annualInvestment * c.year - initialInvestment;
          const totalAmountInvested = c.valueEndOfYear - totalInterest;

          return (
            <tr key={c.year}>
              <td>{c.year}</td>
              <td>{formatter.format(c.valueEndOfYear)}</td>
              <td>{formatter.format(c.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
