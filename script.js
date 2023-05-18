function calcularPrecioProducto(valorProducto, codigoPromocional, cuotas) {
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
  
    // Precio con descuento
    let precioDescuento = precioBase - (precioBase * descuento);
  
    // Calculamos valor de las cuotas
    let valorCuota = precioDescuento / cuotas;
  
    // Si se ingresa más de 3 cuotas, se agrega un interés del 15%
    if (cuotas > 3) {
      precioDescuento = precioDescuento * 1.15;
      valorCuota = precioDescuento / cuotas;
    }
  
    // Devolvemos precio con descuentos, y valor de las cuotas
    return [precioDescuento, valorCuota];
  }

  
function calcularPrecio() {
    //creamos un array vacío para ir acumulando los productos que ingrese el usuario
    let productos = [];
  
    let continuar = true;
    let producto = 1;


    //creamos un ciclo While, para que mientras el usuario desee seguir agregando productos, se vuelva a pedir el ingreso de los datos.
    while (continuar) {
      // Solicitamos al usuario el precio inicial del producto. Usamos parseFloat ya que este valor puede tener decimales
      const precioBase = parseFloat(prompt(`Ingrese el precio base del producto número ${producto}`));
  
      // Solicitamos al usuario el código de descuento
      const codigoDescuento = prompt(`Ingrese el código de descuento para el producto ${producto} (DESC10, DESC20 O DESC30)`);
  
      // Solicitamos al usuario la cantidad de cuotas, asegurándonos de que ingrese un número mayor o igual que 1
    do {
      cuotas = parseInt(prompt(`Ingrese la cantidad de cuotas para el producto ${producto} (Hasta 3 cuotas sin interés | 15% INTERÉS EN MÁS DE 3 CUOTAS.)`));
      if (cuotas < 1) {
        alert("Ingrese un número mayor o igual que 1 para las cuotas.");
      }
    } while (cuotas < 1);

      // Llamamos a la función calcularPrecio con los valores ingresados por el usuario
    const precioFinal = calcularPrecioProducto(precioBase, codigoDescuento, cuotas);
  
      productos.push({
        precioFinal: precioFinal[0],
        valorCuota: precioFinal[1]
      });
  
      // Preguntamos al usuario si quiere ingresar otro producto
      continuar = confirm("¿Desea calcular el precio de algún otro producto?");
      producto++;
    }
  
    return productos;
  }
  

  // Llamamos a la función y almacenamos el array de productos devuelto en una variable
  let productos = calcularPrecio();
  
  // Mostramos los resultados de todos los productos ingresados
  let mensaje = "Tus productos:\n";
  
  for (let i = 0; i < productos.length; i++) {
    mensaje += `Producto ${i + 1} - Precio final: $${productos[i].precioFinal.toFixed(2)} - Valor de las cuotas: $${productos[i].valorCuota.toFixed(2)} cada una\n`;
  }
  
  alert(mensaje);
