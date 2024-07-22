document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000 },
            { id: 2, name: 'Arabica Blend', img: '1.jpg', price: 25000 },
            { id: 3, name: 'Primo Passo', img: '1.jpg', price: 30000 },
            { id: 4, name: 'Aceh Gayo', img: '1.jpg', price: 35000 },
            { id: 5, name: 'Sumatra Madheling', img: '1.jpg', price: 40000 },
        ]
    }));
    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            //Buat Variabel untuk cek ada cart yang sama atau tidak
            const cartItem = this.items.find((items) => items.id === newItem.id);

            //Pengkondisian
            if (!cartItem) {
                //Jika Belum ada
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            }else{
                //Jika ada
                this.items = this.items.map((item) =>{
                    //Jika berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    }else{
                        //Jika ada yang samai
                        item.quantity++;
                        item.total = item.price * item.quantity; 
                        this.quantity++;
                        this.total += newItem.price;
                        return item;
                    }
                })
            }

            // console.log(this.total);
        },
        remove(id){
            const cartItem = this.items.find((items) => items.id === id);
            if (cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if (item.id !== id) {
                        return item;
                    }else{
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            }else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

// Konversi ke Rupiah 
const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(number);
}