// Definimos el array de códigos promocionales vigentes
const codigosPromocionales = ["DESC10", "DESC20", "DESC30"];

// Definimos los descuentos correspondientes a los códigos promocionales vigentes
const descuentos = [0.1, 0.2, 0.3];


//utilizamos una clase constructora para crear una plantilla que usaremos para los productos ingresados por el usuario
class Producto {
  constructor(precioBase, codigoDescuento, cuotas) {
    this.precioBase = precioBase;
    this.codigoDescuento = codigoDescuento;
    this.cuotas = cuotas;
    this.precioFinal = 0;
    this.valorCuota = 0;
  }
//aplicamos el método calcularPrecioFinal al objeto.
  calcularPrecioFinal() {
    // Buscamos el índice del código promocional ingresado
    const indice = codigosPromocionales.indexOf(this.codigoDescuento);

    // Si se encuentra el código promocional, asignamos el descuento correspondiente
    if (indice !== -1) {
      const descuento = descuentos[indice];
      this.precioFinal = this.precioBase - (this.precioBase * descuento);
    } else {
      alert("El código ingresado no pertenece a un descuento vigente, no se aplicará ningún descuento sobre el precio final");
      this.precioFinal = this.precioBase;
    }

    // Si se ingresan más de 3 cuotas, se agrega un interés del 15%
    if (this.cuotas > 3) {
      this.precioFinal *= 1.15;
    }

    // Calculamos el valor de las cuotas
    this.valorCuota = this.precioFinal / this.cuotas;
  }
}


function calcularPrecio() {
  //Creamos un array vacío de productos  
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

const productos = calcularPrecio();

let mensaje = "Tus productos:\n";

for (let i = 0; i < productos.length; i++) {
  mensaje += `Producto ${i + 1} - Precio final: $${productos[i].precioFinal.toFixed(2)} - Valor de las cuotas: $${productos[i].valorCuota.toFixed(2)} cada una\n`;
}

alert(mensaje);
