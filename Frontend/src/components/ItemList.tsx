import { useState } from "react";
import type { ItemListProps } from "../interfaces/itemListpropst";

export default function ItemList({ items }: ItemListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <ul className="item-list">
      {items.map((item) => {
        const isExpanded = expandedId === item.id;
        const isFavorite = favorites.includes(item.id);

        return (
          <li
            key={item.id}
            className={`item ${isFavorite ? "favorite" : ""}`}
            style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px", borderRadius: "5px", cursor: "pointer" }}
          >
            <div
              onClick={() => toggleItem(item.id)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <strong>{item.name}</strong>
              {isFavorite && <span style={{ color: "red" }}>❤️</span>}
            </div>

            {isExpanded && (
              <div style={{ marginTop: "10px" }}>
                <p>{item.description}</p>
                <p>Precio: ${item.price}</p>
                <p>Stock: {item.stock}</p>
                <button onClick={() => toggleFavorite(item.id)}>
                  {isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
