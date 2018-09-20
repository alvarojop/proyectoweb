//import the necessary files
import React from 'react';
import ReactDOM from 'react-dom';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//create the main class for displaying the recipes
class Factura extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        facturas: [
          {serie: "A", fecha: "01/01/2018", nit: "7654321-1", nombre: "Maria Anders", anulada: "No"},
          {serie: "A", fecha: "05/01/2018", nit: "7572413-8", nombre: "Francisco Chang", anulada: "Si"},
          {serie: "A", fecha: "02/02/2018", nit: "2035684-9", nombre: "Roland Mendel", anulada: "No"},
          {serie: "A", fecha: "27/02/2018", nit: "5256585-4", nombre: "Helen Bennett", anulada: "No"},
          {serie: "A", fecha: "08/06/2018", nit: "7582458-6", nombre: "Yoshi Tannamuri", anulada: "No"},
          {serie: "A", fecha: "07/08/2018", nit: "2563452-1", nombre: "Giovanni Rovelli", anulada: "No"}
        ]
      };
    }
    render() {
      const facturas = this.state.facturas;
      return(
        <div className="jumbotron">
          <h1>Listado de Facturas</h1>
          <PanelGroup accordion id="facturas">
            {facturas.map((factura, index) => (
              <Panel eventKey={index} key={index}>
                <Panel.Heading>
                  <Panel.Title className="title" toggle>{factura.serie}</Panel.Title>
                  <Panel.Title className="title" toggle>{factura.fecha}</Panel.Title>
                  <Panel.Title className="title" toggle>{factura.nit}</Panel.Title>
                  <Panel.Title className="title" toggle>{factura.nombre}</Panel.Title>
                  <Panel.Title className="title" toggle>{factura.anulada}</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ListGroup>
                    <ListGroupItem key={index}>{recipe.serie}</ListGroupItem>
                    <ListGroupItem key={index}>{recipe.fecha}</ListGroupItem>
                    <ListGroupItem key={index}>{recipe.nit}</ListGroupItem>
                    <ListGroupItem key={index}>{recipe.nombre}</ListGroupItem>
                    <ListGroupItem key={index}>{recipe.anulada}</ListGroupItem>
                  </ListGroup>
                  <ButtonToolbar>
                    <Button bsStyle="info">Detalle</Button>
                    <Button bsStyle="warning">Editar</Button>
                    <Button bsStyle="danger">Borrar</Button>
                  </ButtonToolbar>
                </Panel.Body>
              </Panel>
            ))}
          </PanelGroup>
          <Button bsStyle="primary">Crear Factura</Button>
        </div>
      );
    }
  };
  ReactDOM.render(<Factura />, document.getElementById('app'));
