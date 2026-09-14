let basket = [];

    function addProduct(e, name, price, imageSrc) {
      if(e) e.preventDefault();
      basket.push({ name: name, price: price, image: imageSrc });
      updatePopupView();
    }

    function updatePopupView() {
      let listContainer = document.getElementById('popup-items-list');
      let totalContainer = document.getElementById('popup-total');
      let popupWindow = document.getElementById('myCartPopup');

      listContainer.innerHTML = "";
      let grandTotal = 0;

      basket.forEach(function(item) {
        listContainer.innerHTML += `
          <div class="popup-item">
            <img src="${item.image}">
            <div><strong>${item.name}</strong><br>Price: ${item.price}</div>
          </div>
        `;
        grandTotal += item.price;
      });

      totalContainer.innerText = grandTotal;
      popupWindow.style.display = "block";
    }

    function closePopup() {
      document.getElementById('myCartPopup').style.display = "none";
    }

   
    function prepareWhatsAppLink(e) {
        if (basket.length === 0) {
            e.preventDefault();
            alert("⚠️ Your shopping cart is empty!");
            return;
        }

        var ownerPhoneNumber = "918838653627"; 
        var totalPrice = document.getElementById('popup-total').innerText; 
        
        var itemsListText = "";
        basket.forEach(function(item, index) {
            itemsListText += (index + 1) + ". " + item.name + " - Rs" + item.price + "\n";
        });
        var lasttoken=localStorage.getItem('canteen_token')?parseInt(localStorage.getItem('canteen_token')):0;
        var tokennumber=lasttoken+1
        localStorage.setItem('canteen_token',tokennumber);

        var message ="🔢 *Token No:* #" + tokennumber + "\n" +
                      "🛒 *NEW ORDER RECEIVED!*\n\n" +
                      "📝 *Items List:*\n" + itemsListText + "\n" +
                      "💵 *Grand Total:* Rs" + totalPrice + "\n\n" +
                      "Please confirm availability. Thanks!";

        
        var targetUrl = "https://wa.me/" + ownerPhoneNumber + "?text=" + encodeURIComponent(message);

        
        var linkElement = document.getElementById('order-submit-btn');
        linkElement.href = targetUrl;
        linkElement.target = "_blank"; 

        alert("🎉 Success! Opening WhatsApp to send your order.");

        
        basket = [];
        setTimeout(closePopup, 500); 
        
    }

