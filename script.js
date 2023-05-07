function calcularPrecio(valorProducto, codigoPromocional, cuotas) {
    // Definimos variable para descuento
    let descuento = 0;
  
    // Evaluamos código promocional y aplicamos descuento correspondiente
    if (codigoPromocional === "DESC10") {
      descuento = 0.1;
    } else if (codigoPromocional === "DESC20") {
      descuento = 0.2;
    } else if (codigoPromocional === "DESC30") {
      descuento = 0.3;
    }
  
    //precio sin descuento
    let precioBase = valorProducto;
  
    // Precio con descuento descuento
    let precioDescuento = precioBase - (precioBase * descuento);
  
    // Calculamos valor de las cuotas
    let valorCuota = precioDescuento/ cuotas;

      // Si se ingresa más de 3 cuotas, se agrega un interés del 15%
    if (cuotas > 3) {
    precioDescuento = precioDescuento * 1.15;
    valorCuota = precioDescuento / cuotas;
    }
  
    // Devolver precio con descuentos, y valor de las cuotas
   return [precioDescuento, valorCuota];
  }

// Definimos un array vacío para almacenar los productos
let productos = [];
let continuar = true;
let producto = 1;
  
while (continuar) {
    // Solicitar al usuario el precio base del producto. Usamos parseFloat ya que este valor puede tener decimales
    const precioBase = parseFloat(prompt(`Ingrese el precio base del producto número ${producto}`));
  
    // Solicitar al usuario el código de descuento
    const codigoDescuento = prompt(`Ingrese el código de descuento para el producto ${producto} (DESC10, DESC20 O DESC30)`);
  
    // Solicitar al usuario la cantidad de cuotas
    const cuotas = parseInt(prompt(`Ingrese la cantidad de cuotas para el producto ${producto} (Hasta 3 cuotas sin interés | 15% INTERÉS EN MÁS DE 3 CUOTAS.)`));
  
    // Llamar a la función calcularPrecio con los valores ingresados por el usuario
    const precioFinal = calcularPrecio(precioBase, codigoDescuento, cuotas);
  
    // Mostrar el precio final al usuario
    alert(`El precio final del producto número ${producto} abonando en ${cuotas} cuotas es de $${precioFinal[0].toFixed(2)}, y el valor de las cuotas es de $${precioFinal[1].toFixed(2)} cada una.`);

    productos.push({
        precioFinal: precioFinal[0],
        valorCuota: precioFinal[1]
      });

    // Preguntar al usuario si quiere ingresar otro producto
    continuar = confirm("¿Desea calcular el precio de otro producto?");
    producto++;
}

// Mostrar los resultados de todos los productos ingresados
let mensaje = "Tus productos:";

for (let i = 0; i < productos.length; i++) {
  mensaje += `\nProducto ${i + 1} - \nPrecio final: $${productos[i].precioFinal.toFixed(2)} - Valor de las cuotas: $${productos[i].valorCuota.toFixed(2)} cada una`;
}

alert(mensaje);
  