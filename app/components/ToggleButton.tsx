type Props = {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
};

export const ToggleButton = ({ children, onClick, active }: Props) => {
  return (
    <button
      className={`p-2 bg-gray-${active ? "900" : "200"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
