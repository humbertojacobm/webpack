// console.log("hola queridos estudiantes!");
import message from './message.js';
import './estilos.css';

const $container = document.getElementById('container');
const element = document.createElement('p');

$container.appendChild(element);

const printMessage = () => {
  element.textContent = message(); 
}

printMessage();

if (module.hot){
  module.hot.accept('./message.js', () => {
    console.log('hemos cambiado');
    printMessage();
  });
}