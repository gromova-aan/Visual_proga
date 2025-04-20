import React from "react";
import "../assets/EditItem.css";

const EditItem = ({optimisticItems, selectedRows, onSave, headers = []}) => {
    const [editedItem, setEditedItem] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => {
        if (selectedRows.length !== 1) {
            alert("Выбрете только одну строку для редактирования");
            return;
        }
        
        const selectedIndex = selectedRows[0];
        const itemToEdit = optimisticItems[selectedIndex];
        
        const flattenedItem = {};
        headers.forEach((header) => {
            const path = header.key.split(".");
            flattenedItem[header.key] = path.reduce((acc, key) => acc?.[key], itemToEdit);
        });

        setEditedItem(flattenedItem);
        setShowForm(true);
    };
  
    const handleSubmit = () => {
        const updatedItem = {};
        headers.forEach((header) => {
          const path = header.key.split(".");
          if (path.length === 1) {
            updatedItem[path[0]] = editedItem[header.key];
          } else {
            let current = updatedItem;
            for (let i = 0; i < path.length - 1; i++) {
              current[path[i]] = current[path[i]] || {};
              current = current[path[i]];
            }
            current[path[path.length - 1]] = editedItem[header.key];
          }
        });
        const finalItem = { ...updatedItem, id: optimisticItems[selectedRows[0]].id };
        onSave(finalItem);   
        setShowForm(false);
        setEditedItem(null);
    };

    return (
        <div>
            <button onClick={handleEditClick} className="edit-button">Реадктировать</button>

            {showForm && editedItem && (
                <div className="form-container">
                    {headers
                    .filter((header) => header.key !== "id")
                    .map((header) => (
                        <div key={header.key}>
                            <input
                                type="text"
                                name={header.key}
                                placeholder={header.title || header.key}
                                value={editedItem[header.key] || ""}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div className="form-actions">
                        <button onClick={handleSubmit}>Сохранить</button>
                        <button onClick={() => setShowForm(false)}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditItem;