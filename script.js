// Definimos el array de códigos promocionales vigentes
const codigosPromocionales = ["DESC10", "DESC20", "DESC30"];

// Definimos los descuentos correspondientes a los códigos promocionales vigentes
const descuentos = [0.1, 0.2, 0.3];

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
        alert("El código ingresado no pertenece a un descuento vigente, no se aplicará ningún descuento sobre el precio final de este producto");
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

function calcularPrecio() {
  // Creamos un array vacío para almacenar los productos
  const productos = [];
  let continuar = true;
  let producto = 1;

  while (continuar) {
    // Solicitamos al usuario el precio base del producto
    const precioBase = parseFloat(prompt(`Ingrese el precio base del producto número ${producto}`));

    // Solicitamos al usuario si tiene un código de descuento
    const tieneDescuento = confirm("¿Quiere ingresar algún código de descuento?");
    let codigoDescuento = "";

    if (tieneDescuento) {
      // Si tiene descuento, solicitamos el código de descuento
      codigoDescuento = prompt(`Ingrese el código de descuento para el producto ${producto}`);
    }

    let cuotas;
    do {
      // Solicitamos al usuario la cantidad de cuotas, asegurándonos de que ingrese un número mayor o igual que 1
      cuotas = parseInt(prompt(`Ingrese la cantidad de cuotas para el producto ${producto} (Hasta 3 cuotas sin interés | 15% INTERÉS EN MÁS DE 3 CUOTAS.)`));
      if (cuotas < 1) {
        alert("Ingrese un número mayor o igual que 1 para las cuotas.");
      }
    } while (cuotas < 1);

    // Creamos un nuevo objeto Producto con los valores ingresados
    const nuevoProducto = new Producto(precioBase, codigoDescuento, cuotas);

    // Llamamos al método calcularPrecioFinal() para calcular el precio final y el valor de las cuotas
    nuevoProducto.calcularPrecioFinal();

    // Agregamos el nuevo producto al array de productos
    productos.push(nuevoProducto);

    // Preguntamos al usuario si quiere ingresar otro producto
    continuar = confirm("¿Desea calcular el precio de algún otro producto?");
    producto++;
  }

  return productos;
}

// Ejecutamos la función calcularPrecio() para obtener los productos ingresados por el usuario
const productos = calcularPrecio();

// Utilizamos el método map() para obtener un array con los precios finales formateados a 2 decimales
const preciosFinales = productos.map((producto) => producto.precioFinal.toFixed(2));

// Construimos el mensaje a mostrar al usuario con los precios finales y valores de las cuotas de los productos
let mensaje = "Tus productos:\n";

for (let i = 0; i < productos.length; i++) {
  mensaje += `Producto ${i + 1} - Precio final: $${preciosFinales[i]} - Valor de las cuotas: $${productos[i].valorCuota.toFixed(2)} cada una\n`;
}

// Mostramos el mensaje al usuario
alert(mensaje);
