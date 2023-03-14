import React from 'react'
import './ModalStyle.css'
import { FiX } from 'react-icons/fi';

function Modal({ deleteProduct, detailDelete, toggleModalDelete }) {

  console.log(detailDelete);
  return (
    <div className='modal'>
      <div className='container'>
        <button className='close' onClick={toggleModalDelete}>
          <FiX size={15} color="#FFF" />
          {/* Voltar */}
        </button>

        <div>
          <h3>Detalhes da Exclusão</h3>

          <div className='row'>
            <span>
              Tem certeza de que deseja realmente excluir?
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <button className='btn-yes' onClick={() => deleteProduct(detailDelete.index)}>
              {/*  <FiX size={23} color="#FFF" /> */}
              Sim
            </button>
            <button className='btn-no' onClick={toggleModalDelete}>
              {/*  <FiX size={23} color="#FFF" /> */}
              Não
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Modal;