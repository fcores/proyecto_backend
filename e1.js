class ProductManajer {

    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products;
    }

    addProduct(title,description,price,thumbnail,code,stock){
        this.title = title
        this.description
        this.price
        this.thumbnail
        this.code
        this.stock

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        
        const productIndex = this.products.findIndex((e)=> e.code ===code)
        if (productIndex ===-1){
            if(this.products.length===0){
                product.id = 1
            }else {
                product.id = this.products[this.products.length -1].id + 1
            }
            this.products.push(product)
        }else{
            console.log("Estas ingresando un producto con un codigo repetido");
            return
        }


        
    }


    getProductsByiId(id){
        const productIndex = this.products.findIndex((e)=> e.id ===id)
        if (productIndex ===-1){
            
            return "Not found"
        }
        return this.products[productIndex]
    }


}

//PRUEBA1 - Se creará una instancia de la clase “ProductManager”
listadeProductos = new ProductManajer() 

//PRUEBA2 - Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(listadeProductos.getProducts()); // OK

//PRUEBA3 - Se llamará al método “addProduct” con un ejemplo:
listadeProductos.addProduct("producto prueba","Este es un producto prueba",200,"Sin Imagen","abc123",25)

//PRUEBA4 - Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(listadeProductos.getProducts()); // OK

//PRUEBA5 - Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
listadeProductos.addProduct("producto prueba","Este es un producto prueba",200,"Sin Imagen","abc123",25) // OK
console.log(listadeProductos.getProducts()); // OK

//PRUEBA6 - Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
listadeProductos.addProduct("producto prueba","Este es un producto prueba",200,"Sin Imagen","abc124",25) // OK
console.log("El producto con id 2 es: ",listadeProductos.getProductsByiId(2)); //OK
console.log("El producto con id 3 es: ",listadeProductos.getProductsByiId(3)); //OK