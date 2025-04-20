import React from "react";
import DataSet from "./DataSet";
import AddItem from "./AddItem";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";

const GenericTableApp = ({dataUrl, headers}) => {
    const [items, setItems] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [optimisticItems, addOptimisticItems] = React.useOptimistic(
        items,
        //функция которая определяет как новое значение(newItem) будет добавлено в текущее состояние (currentState)
        //в данном случае в начало массива
        (currentState, newItem) => [newItem, ...currentState]
    );

    const HandleRowClick = (index, e) => {
        if (e.target.className === "empty-column") {
            if (e.ctrlKey) {
                setSelectedRows((prev) => 
                    prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
                );
            } else {
                setSelectedRows((prev) => (prev.includes(index) ? [] : [index]));
            }
        }
    };


    React.useEffect(() => {
        fetch(dataUrl)
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("ошибка загрузки данных: ", error));
    }, [dataUrl]);


    const handleAddItem = async (newItem) => {
        const maxId = Math.max(0, ...items.map((item) => item.id));
        const newId = maxId + 1;

        const optimisticItem = {...newItem, id: newId};
        addOptimisticItems(optimisticItem);
        setItems((prev) => [optimisticItem, ...prev]);

        try {
            const response = await fetch(dataUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({newItem}),
            });

            if (!response.ok) {
                throw new Error("ошибка добавления комментария");
            }
        } catch(error) {
            console.error(error.message);

            //откатываем изменения в случае ошибки
            setItems((prev) => prev.filter((c) => c.id !== newId));
        }
    };


    const handleDeleteItems = async () => {
        const selectedIds = selectedRows.map((index) => optimisticItems[index].id);
        //исключаем те индексы которые находятся в массиве selectedRows
        const updatedItems = optimisticItems.filter((_, index) => !selectedRows.includes(index));

        addOptimisticItems(updatedItems);

        try {
            for (const id of selectedIds) {
                const response = await fetch(`${dataUrl}/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("ошибка удаления комментариев");
                }
            }
            setItems((prev) => prev.filter((_, index) => !selectedRows.includes(index)));
        } catch(error) {
            console.error(error.message);
            setItems((prev) => optimisticItems);
        } finally {
            setSelectedRows([]);
        }
    };


    const handleSaveEdit = async (updatedItem) => {
        const optimisticUpdate = optimisticItems.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );

        addOptimisticItems(optimisticUpdate);

        try {
            const response = await fetch(`${dataUrl}/${updatedItem.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedItem),
            });
            
            if (!response.ok) {
                throw new Error("ошибка обновления комментария при редактировании");
            }

            setItems((prev) =>
                prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
            );
        } catch(error) {
            console.log(error.message);
            setItems((prev) => optimisticItems);
        }
    };


    return (
        <div className="table-app">
            <AddItem 
                onAddItem={handleAddItem}
                fields={headers
                    .filter((header) => header.key !== "id")
                    .map((header) => header.key)}
            />
            <EditItem
                optimisticItems={optimisticItems}
                selectedRows={selectedRows}
                onSave={handleSaveEdit}
                headers={headers}
            />
            <DeleteItem onDeleteItem={handleDeleteItems}/>
            <DataSet 
                headers={headers} 
                data={optimisticItems}
                selectedRows={selectedRows}
                onRowClick={HandleRowClick}
            />
        </div>
    );
};

export default GenericTableApp;