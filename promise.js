function mostrarData(archivos)
{
    var arrays = archivos;
    console.log(arrays);

    var productos = arrays[0];
    var detalles = arrays[1];
    var idbuscado = masVendido(detalles);
    
    mostrarProducto(productos, idbuscado);
}

Promise.all([
    fetch('https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json'),
    fetch('https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json')
]).then(function(responses){return Promise.all(responses.map(function(response){return response.json()}))} ).then(mostrarData);

function masVendido(data){
    console.log(data);
    var array = data;
    let x = 0;
    let objeto;

    for(let i = 0; i < array.length;i++)
    {
        var obj = array[i];
        for(var key in obj)
        {
            var name = key;
            var value = parseInt(obj[key]);
            if(name == "cantidad" && value > x)
            {
                x = value;
                objeto = obj;
            }
        }
    }
    console.log(x);
    console.log(objeto);

    var respuesta;
    for(var key in objeto)
    {
        var value = parseInt(objeto[key]);
        if(key == "idproducto")
        {
            respuesta = value+":";
            console.log("Id del producto: "+value);
        }
    }
    respuesta += x;

    console.log("Cantidad de veces pedido: "+x);
    console.log(respuesta);
    return respuesta;
}

function mostrarProducto(data2, idbuscado)
{
    console.log(data2);
    var temp = idbuscado;
    var split = temp.split(":");
    var id = split[0];
    var pedido = split[1];
    var array2 = data2;
    let objeto2;

    for(let i = 0; i < array2.length;i++)
    {
        var obj2 = array2[i];
        for(var key in obj2)
        {
            var value2 = parseInt(obj2[key]);
            if(key == "idproducto" && value2 == id)
            {
                objeto2 = obj2;
            }
        }
    }
    console.log(objeto2);

    var respuesta = "El producto más vendido se llama: ";
    for(var key in objeto2)
    {
        var v = (objeto2[key]);
        if(key == "nombreProducto")
        {
            respuesta += v+" y fue pedido: "+ pedido+ " veces.";
        }
    }

    console.log(respuesta);
}
