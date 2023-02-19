import { ReactElement } from "react";
type CardProps = {
  children: ReactElement;
  variant: string;
  borderRadius: string;
};
const Card = ({ children, variant, borderRadius = "12px" }: CardProps) => {
  return (
    <div
      className={
        variant === "contained"
          ? "card_component contained"
          : "card_component outlined"
      }
      style={{ borderRadius: borderRadius }}
    >
      {children}
    </div>
  );
};

export default Card;
