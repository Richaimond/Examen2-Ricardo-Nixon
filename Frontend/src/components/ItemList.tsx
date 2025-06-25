import type { ItemListProps } from "../interfaces/itemListpropst";

export default function ItemList({ items }: ItemListProps){
  // TODO: controlar item expandido (estado local)
  // TODO: manejar que solo un item esté expandido a la vez

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id} onClick={() => { /* TODO: toggle expandido */ }}>
          <strong>{item.name}</strong>
          {/* TODO: mostrar detalles solo si está expandido */}
        </li>
      ))}
    </ul>
  );
}

