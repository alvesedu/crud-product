import React from 'react';

const Dropdown = (props) => {
  const options = [
    { value: '1', label: 'Opcao 1' },
    { value: '2', label: 'Opcao 2' },
    { value: '3', label: 'Opcao 3' },
  ];

  return (
    <div className="dropdown">
      <h3>Data selecionada: {props.date}</h3>

      <select>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;