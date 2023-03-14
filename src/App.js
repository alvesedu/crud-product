
import React, { useState, useEffect } from 'react';
import './AppStyle.css'
import Modal from './Modal'

const initialProducts = JSON.parse(localStorage.getItem('products')) || [];
let editingIndex = null;

function ProductCrud() {
  const [products, setProducts] = useState(initialProducts);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [myDate, setMyDate] = useState('');


  const [modalDelete, setModalDelete] = useState(false)
  const [detailDelete, setDetailDelete] = useState()

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex === null) {
      addProduct();
    } else {
      editProduct();
    }
  };

  const addProduct = () => {
    if (!name || !price || !amount || !myDate) {
      alert('Preencha todos os campos!')
    } else {
      setProducts([
        ...products,
        { name: name, price: price, amount: amount, myDate: myDate }
      ]);
      setName('');
      setPrice('');
      setAmount('');
      setMyDate('');
    }
  };

  const editProduct = () => {
    const newProducts = [...products];
    newProducts[editingIndex] = { name: name, price: price, amount: amount, myDate: myDate };
    setProducts(newProducts);
    setName('');
    setPrice('');
    setAmount('');
    setMyDate('');
    editingIndex = null;
  };

  const deleteProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    setModalDelete(false)
  };

  function toggleModalDelete(index) {
    setModalDelete(!modalDelete)
    setDetailDelete(index)
  }

  const editProductHandler = (index) => {
    const product = products[index];
    setName(product.name);
    setPrice(product.price);
    setAmount(product.amount);
    setMyDate(product.myDate);
    editingIndex = index;
  };



  return (
    <div className='container'>
      <h2>Gerenciamento de Produtos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          placeholder="Quantidade"
          value={myDate}
          onChange={(e) => setMyDate(e.target.value)}
        />
        <button className="btn-save" type="submit">
          {editingIndex === null ? 'Adicionar Produto' : 'Salvar Alterações'}
        </button>
      </form>

      <table >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Sub-total</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>

              <td style={{ padding: '5px' }}>{product.name}</td>
              {/* <td style={{ textAlign: 'center' }}>{product.price}</td> */}
              <td style={{ textAlign: 'center' }}> {(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price))}</td>
              <td style={{ textAlign: 'center' }}> {product.amount}</td>
              {/* <td style={{ textAlign: 'center' }}>R$ {product.price * product.amount}</td> */}
              <td style={{ textAlign: 'center' }}>R$ {(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.amount * product.price))}</td>
              {/* <td style={{ textAlign: 'center' }}> {product.myDate.split('-').reverse().join('/')}</td> */}
              <td style={{ textAlign: 'center' }}> {new Intl.DateTimeFormat('pt-BR').format(new Date(product.myDate).setHours(20))}</td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <button className="btn-edit" type="button" onClick={() => editProductHandler(index)}>
                    Editar
                  </button>
                  {/*  <button className="btn-del" type="button" onClick={() => deleteProduct(index)}>
                  Excluir
                </button> */}
                  <button className="btn-del" type="button" onClick={() => toggleModalDelete(index)}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {
        modalDelete && (
          <Modal
            deleteProduct={deleteProduct}
            detailDelete={detailDelete}
            toggleModalDelete={toggleModalDelete}
          />
        )
      }

    </div >
  );
}

export default ProductCrud;