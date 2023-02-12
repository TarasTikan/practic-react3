export function Button({ clickHandler, text }) {
  return (<button type="button" onClick={clickHandler}>{text}</button>);
}
