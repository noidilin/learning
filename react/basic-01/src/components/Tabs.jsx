/* eslint-disable react/prop-types */

export function Tabs({ children, buttons, ButtonsContainer = 'menu' }) {
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
