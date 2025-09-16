import { DATA } from '../App';

export function UserInputGroup(props) {
  return (
    <section id='user-input'>
      {DATA.reduce((acc, { name, display }, i) => {
        if (i % 2 === 0) return [...acc, { name, display }];
        if (i % 2 === 1) {
          const last = acc.pop();
          return [
            ...acc,
            <div className='input-group' key={i}>
              <UserInput display={last.display} name={last.name} {...props} />
              <UserInput display={display} name={name} {...props} />
            </div>,
          ];
        }
        return {};
      }, [])}
    </section>
  );
}
function UserInput({ display, name, onChange, userInput }) {
  return (
    <p>
      <label>{display}</label>
      <input
        type='number'
        required
        value={userInput[name]}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </p>
  );
}
