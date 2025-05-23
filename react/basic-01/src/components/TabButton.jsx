/* eslint-disable react/prop-types */

export function TabButton({ children, isSelected, ...props }) {
  return (
    <li>
      <button className={isSelected ? 'active' : undefined} {...props}>
        {children}
      </button>
    </li>
  );
}
