import { useState } from "react";
import type { ItemListProps } from "../interfaces/itemListpropst";

export default function ItemList({ items }: ItemListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id} onClick={() => toggleItem(item.id)}>
          <strong>{item.name}</strong>
          {expandedId === item.id && (
            <div>
              <p>{item.description}</p>
              <p>Precio: ${item.price}</p>
              <p>Stock: {item.stock}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}