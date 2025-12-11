import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import {api} from '../../../services/api.js'
import { orderStatusOptions } from './orderStatus.js';
import { Row } from './row';
import { Filter, FilterOptions } from './styles';

export function Orders() {
  const [orders, setOrders] = useState([]) // BACKUP
  // orders vai filtrar/guardar os pedidos, mas quem vai receber os pedidos é o filteredOrders
  const [filteredOrders, setFilteredOrders] = useState([]) // valores que estão na tela
  const [rows, setRows] = useState([])
  const [activeStatus, setActiveStatus] = useState(0)//o status ativo inicial é zero: TODOS

  function handleStatus(status){
    if(status.id === 0 ){
      setFilteredOrders(orders)//vai mostrar todos os produtos
    }else{
      // vai mostrar os produtos que correspondem ao status selecionado
      const newOrders = orders.filter(order => order.status === status.value)
      setFilteredOrders(newOrders)
    }

    setActiveStatus(status.id)//guarda o valor do status selecionado
  }

  useEffect(() => {
    async function loadOrders(){
      const {data} = await api.get('orders') //pega os dados dos pedidos do backend
      setOrders(data)
      setFilteredOrders(data)
      //console.log(data) => mostra os dados dos pedidos no console
    }
    
    loadOrders()
  }, [])

  function createData(order) {
    return {
      name: order.user.name,
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products,
    };
  }

  useEffect(() => {
    const newRows = filteredOrders.map((order) => createData(order))
    setRows(newRows)
  }, [filteredOrders])

  useEffect(() => {
    if(activeStatus === 0 ){
      setFilteredOrders(orders)
    }
    else {
      const statusIndex = orderStatusOptions.findIndex(item => item.id === activeStatus)
      const newFilteredOrders = orders.filter(order => order.status === orderStatusOptions[statusIndex].value)
      setFilteredOrders(newFilteredOrders)
    }
  }, [orders])

  return (
    <>
      <Filter>
        {orderStatusOptions.map(status => (
          <FilterOptions 
          key={status.id}
          onClick={() => handleStatus(status)}
          $isActiveStatus={activeStatus === status.id}
          >{status.label}</FilterOptions>
        ))}
      </Filter>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedidos</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data do pedido</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row 
              key={row.orderId} 
              row={row} 
              orders={orders}
              setOrders={setOrders}
            />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}