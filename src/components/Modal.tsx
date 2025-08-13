type ModalProps = {
  onClose: () => void;
  data?: {
    id: number;
    name: string;
    image: string;
    types: string[];
    stats: { name: string; base: number }[];
    height: number;
    weight: number;
    description: string;
  };
};

export const Modal = ({ onClose, data }: ModalProps) => {
  if (!data) return null;
  const { name, image, types, stats, height, weight, description } = data;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <h3>{name}</h3>
        <img src={image} alt={name} />
        <p>{description}</p>
        <p>
          <strong>Types:</strong> {types.join(", ")}
        </p>
        <strong>Stats:</strong>
        <ul>
          <li>Height: {height}</li>
          <li>Weight: {weight}</li>
          {stats.slice(0, 6).map((s) => (
            <li key={s.name}>
              {s.name}: {s.base}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
