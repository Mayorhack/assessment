type BtnProps = {
  text: string;
};
const Button = ({ text }: BtnProps) => {
  return <button className="btn">{text}</button>;
};

export default Button;
