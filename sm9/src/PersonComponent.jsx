import React from 'react';

const PersonComponent = ({ people }) => {
  return (
    <div>
      {people.length === 0 ? (
        <p>Нет данных</p>
      ) : (
        <ul>
          {people.map((person, index) => {
            console.log('Обрабатываемый человек:', person);
            return (
              <li key={index}>
                <h3>{person.name}</h3>
                <p>Возраст: {person.age}</p>
                <p>Email: {person.email}</p>
                <h4>Питомцы:</h4>
                {Array.isArray(person.pet) && person.pet.length > 0 ? (
                  <ul>
                    {person.pet.map((pet, petIndex) => (
                      <li key={petIndex}>
                        <p>Имя: {pet.name}</p>
                        <p>Возраст: {pet.age}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Нет питомцев</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PersonComponent;