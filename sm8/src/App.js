import React from 'react';
import TreeComponent from './components/TreeComponent';


const treeData = {
  height0: {
    header: "Root (height 0 - лист)",
    children: null
  },
  height1: {
    header: "Root (height 1)",
    children: [
      { header: "Child 1 (лист)", children: null },
      { header: "Child 2 (лист)", children: null }
    ]
  },
  height2: {
    header: "Root (height 2)",
    children: [
      { 
        header: "Child 1", 
        children: [
          { header: "Grandchild 1 (лист)", children: null },
          { header: "Grandchild 2 (лист)", children: null }
        ]
      },
      { header: "Child 2 (лист)", children: null }
    ]
  },
  height3: {
    header: "Data Grid",
    children: [
      { 
        header: "@mui/x-data-grid", 
        children: [
          { 
            header: "Pro version", 
            children: [
              { header: "@mui/x-data-grid-pro", children: null },
              { header: "@mui/x-data-grid-premium", children: null }
            ]
          }
        ]
      }
    ]
  }
};

const renderHeader = (header) => <span>{header}</span>; //возращает заголовок узла

const renderChildren = (children) => ( //рекурсивно рендерит каждый дочерний узел
  children.map((child, index) => (
    <TreeComponent 
      key={index}
      node={child}
      renderHeader={renderHeader}
      renderChildren={renderChildren}
    />
  ))
);

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h2>Дерево высотой 0:</h2>
      <TreeComponent                      //компонент вызывает сам себя ждя рендеринга детей
        node={treeData.height0}
        renderHeader={renderHeader}
        renderChildren={renderChildren}
      />

      <h2>Дерево высотой 1:</h2>
      <TreeComponent 
        node={treeData.height1}
        renderHeader={renderHeader}
        renderChildren={renderChildren}
      />

      <h2>Дерево высотой 2:</h2>
      <TreeComponent 
        node={treeData.height2}
        renderHeader={renderHeader}
        renderChildren={renderChildren}
      />

      <h2>Дерево высотой 3:</h2>
      <TreeComponent 
        node={treeData.height3}
        renderHeader={renderHeader}
        renderChildren={renderChildren}
      />
    </div>
  );
}

export default App;