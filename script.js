// Definimos el array de códigos promocionales vigentes
const codigosPromocionales = ["DESC10", "DESC20", "DESC30"];

// Definimos los descuentos correspondientes a los códigos promocionales vigentes
const descuentos = [0.1, 0.2, 0.3];

let productoCount = 1; // Variable para llevar la cuenta de los productos

// Utilizamos una clase constructora para crear una plantilla que usaremos para los productos ingresados por el usuario
class Producto {
  constructor(precioBase, codigoDescuento, cuotas) {
    this.precioBase = precioBase;
    this.codigoDescuento = codigoDescuento;
    this.cuotas = cuotas;
    this.precioFinal = 0;
    this.valorCuota = 0;
  }

  calcularPrecioFinal() {
    // Comprobamos si se ha proporcionado un código de descuento
    if (this.codigoDescuento) {
      // Buscamos el código de descuento en el array de códigos promocionales utilizando el método find()
      const descuentoEncontrado = codigosPromocionales.find((codigo) => codigo === this.codigoDescuento);

      if (descuentoEncontrado) {
        // Si el código de descuento se encuentra en la lista, calculamos el descuento correspondiente
        const indice = codigosPromocionales.indexOf(descuentoEncontrado);
        const descuento = descuentos[indice];
        this.precioFinal = this.precioBase - (this.precioBase * descuento);
      } else {
        // Si el código de descuento no se encuentra en la lista, mostramos una alerta y no se aplica ningún descuento
        //alert("El código ingresado no pertenece a un descuento vigente, no se aplicará ningún descuento sobre el precio final de este producto");
        Swal.fire({
          icon: 'error',
          title: 'CÓDIGO PROMOCIONAL INCORRECTO',
          text: 'El código ingresado no pertenece a un descuento vigente, no se aplicará ningún descuento sobre el precio final de este producto!',
        })
        
        this.precioFinal = this.precioBase;
      }
    } else {
      // Si no se proporciona un código de descuento, el precio final es igual al precio base
      this.precioFinal = this.precioBase;
    }

    // Aplicamos el interés del 15% si la cantidad de cuotas es mayor a 3
    if (this.cuotas > 3) {
      this.precioFinal *= 1.15;
    }

    // Calculamos el valor de las cuotas
    this.valorCuota = this.precioFinal / this.cuotas;
  }
}

function eliminarProducto(index) {
  // Remover la tarjeta del producto de la pantalla
  const tarjetaProducto = document.getElementById(`producto-${index}`);
  tarjetaProducto.remove();

  // Obtener los productos guardados en el Local Storage
  let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

  // Eliminar el producto del arreglo de productos guardados en el Local Storage
  productosGuardados.splice(index, 1);
  localStorage.setItem('productos', JSON.stringify(productosGuardados));
  
}

function crearTarjetaProducto(producto, index) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('col-md-4', 'mb-4');
  cardDiv.id = `producto-${index}`;

  const card = document.createElement('div');
  card.classList.add('card', 'h-100', 'm-1');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = `Producto ${productoCount}`;

  const precioInicial = document.createElement('p');
  precioInicial.classList.add('card-text');
  precioInicial.textContent = `Precio inicial: $${producto.precioBase.toFixed(2)}`;

  const precioFinal = document.createElement('p');
  precioFinal.classList.add('card-text');
  precioFinal.textContent = `Precio con descuentos e intereses aplicados: $${producto.precioFinal.toFixed(2)}`;

  const valorCuota = document.createElement('p');
  valorCuota.classList.add('card-text');
  valorCuota.textContent = `Valor de las cuotas: $${producto.valorCuota.toFixed(2)} cada una`;

  const botonEliminar = document.createElement('button');
  botonEliminar.classList.add('btn', 'btn-danger');
  botonEliminar.textContent = 'Eliminar';

  botonEliminar.addEventListener('click', () => {
    // Llamar a la función eliminarProducto y pasarle el índice del producto
    eliminarProducto(index);
    Toastify({
      text: "producto eliminado",
      duration: 1000,
      style: {
        background: "red",
      },
      }).showToast();
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(precioInicial);
  cardBody.appendChild(precioFinal);
  cardBody.appendChild(valorCuota);
  cardBody.appendChild(botonEliminar);

  card.appendChild(cardBody);
  cardDiv.appendChild(card);

  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.appendChild(cardDiv);

  productoCount++;
}

function calcularPrecio() {
  // Obtener el formulario y los campos de entrada utilizando el DOM
  const form = document.getElementById('calcularForm');
  const precioBaseInput = document.getElementById('precioBase');
  const codigoDescuentoInput = document.getElementById('codigoDescuento');
  const cuotasInput = document.getElementById('cuotas');

  // Agregar el evento submit al formulario
  form.addEventListener('submit', (formSubmit) => {
    formSubmit.preventDefault(); // Evitar que se envíe el formulario

    // Obtener los valores ingresados por el usuario
    const precioBase = parseFloat(precioBaseInput.value);
    const codigoDescuento = codigoDescuentoInput.value;
    const cuotas = parseInt(cuotasInput.value);

    // Verificar si el campo de precio base o cantidad de cuotas están vacíos
    if (!precioBase || !cuotas) {
      // Mostrar un mensaje de error o realizar alguna acción apropiada
      alert('Por favor, complete los campos de precio base y cantidad de cuotas.');
      return; // Detener la ejecución de la función
    }

    // Crear un nuevo objeto Producto con los valores ingresados
    const nuevoProducto = new Producto(precioBase, codigoDescuento, cuotas);

    // Llamar al método calcularPrecioFinal() para calcular el precio final y el valor de las cuotas
    nuevoProducto.calcularPrecioFinal();

    // Obtener los productos guardados en el Local Storage
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Almacenar el producto en el Local Storage
    productosGuardados.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    // Crear una tarjeta para el producto y mostrarla en el div de resultados
    crearTarjetaProducto(nuevoProducto, productosGuardados.length - 1);

    // Limpiar los campos del formulario
    form.reset();
  });

  // Obtener los productos guardados en el Local Storage al cargar la página
  let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

  // Recorrer los productos guardados y crear las tarjetas correspondientes
  productosGuardados.forEach((producto, index) => {
    crearTarjetaProducto(producto, index);
  });
}

// Ejecutamos la función calcularPrecio() al cargar la página para configurar el formulario
calcularPrecio();
