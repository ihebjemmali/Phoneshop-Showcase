(function ($) {
  "use strict";

  function createItem(name, price, quantity, state, image) {
    return {
      name: name,
      price: price,
      quantity: quantity,
      state: state,
      image: image,
    };
  }

  var items = [
    createItem("iPhone 14", 999, 10, "New", "images/iphone14.jpg"),
    createItem("Samsung Galaxy S21", 799, 15, "New", "images/galaxy-s21.jpg"),
    createItem("Google Pixel 6", 699, 20, "Used", "images/pixel6.jpg"),
    createItem("OnePlus 9", 729, 12, "New", "images/oneplus9.jpg"),
    createItem("Xiaomi Mi 11", 599, 25, "New", "images/mi11.jpg"),
    createItem("Sony Xperia 5 II", 949, 5, "Used", "images/xperia5ii.jpg"),
    createItem("Nokia 8.3", 649, 8, "New", "images/nokia83.jpg"),
    createItem("Motorola Edge", 699, 18, "New", "images/motorola-edge.jpg"),
    createItem("Huawei P40", 799, 7, "Used", "images/huawei-p40.jpg"),
    createItem("Asus ROG Phone 5", 999, 10, "New", "images/rog-phone5.jpg"),
    createItem("LG Wing", 999, 8, "New", "images/lg-wing.jpg"),
    createItem("Realme GT", 699, 12, "New", "images/realme-gt.jpg"),
    createItem("Oppo Find X3", 799, 14, "New", "images/oppo-find-x3.jpg"),
    createItem("ZTE Axon 20", 649, 9, "Used", "images/zte-axon20.jpg"),
    createItem("Vivo X60 Pro", 899, 6, "New", "images/vivo-x60-pro.jpg"),
  ];

  var currentEditItem = null;

  function displayItems() {
    var $itemList = $("#item-list");
    $itemList.html("");

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var $itemDiv = $("<div>").addClass("item");

      $itemDiv.append(
        $("<img>").attr("src", item.image).addClass("item-image")
      );
      $itemDiv.append($("<h3>").text(item.name));
      $itemDiv.append($("<p>").text("Price: $" + item.price.toFixed(2)));
      $itemDiv.append($("<p>").text("Quantity: " + item.quantity));
      $itemDiv.append($("<p>").text("State: " + item.state));

      var $buttonGroup = $("<div>").addClass("button-group");

      var $editBtn = $("<button>")
        .addClass("edit-btn")
        .text("Edit")
        .click(
          (function (item) {
            return function () {
              openEditModal(item);
            };
          })(item)
        );

      var $deleteBtn = $("<button>")
        .addClass("delete-btn")
        .text("Delete")
        .click(
          (function (item) {
            return function () {
              if (
                confirm("Are you sure you want to delete " + item.name + "?")
              ) {
                var newItems = [];
                for (var j = 0; j < items.length; j++) {
                  if (items[j].name !== item.name) {
                    newItems.push(items[j]);
                  }
                }
                items = newItems;
                displayItems();
              }
            };
          })(item)
        );

      $buttonGroup.append($editBtn, $deleteBtn);
      $itemDiv.append($buttonGroup);

      $itemList.append($itemDiv);
    }
  }

  function openEditModal(item) {
    currentEditItem = item;
    $("#edit-name").val(item.name);
    $("#edit-price").val(item.price);
    $("#edit-quantity").val(item.quantity);
    $("#edit-state").val(item.state);
    $("#edit-image").val(item.image);
    $("#edit-modal").css("display", "flex");
  }

  window.closeModal = function () {
    $("#edit-modal").css("display", "none");
    currentEditItem = null;
  };

  $("#item-form").submit(function (e) {
    e.preventDefault();

    var name = $("#item-name").val();
    var price = parseFloat($("#item-price").val());
    var quantity = parseInt($("#item-quantity").val());
    var state = $("#item-state").val();
    var image = $("#item-image").val();

    var itemExists = false;
    for (var i = 0; i < items.length; i++) {
      if (items[i].name === name) {
        itemExists = true;
        break;
      }
    }

    if (!itemExists) {
      items.push(createItem(name, price, quantity, state, image));
      this.reset();
      displayItems();
    } else {
      alert("Item with this name already exists!");
    }
  });

  $("#edit-form").submit(function (e) {
    e.preventDefault();

    if (currentEditItem) {
      var name = $("#edit-name").val();
      var price = parseFloat($("#edit-price").val());
      var quantity = parseInt($("#edit-quantity").val());
      var state = $("#edit-state").val();
      var image = $("#edit-image").val();

      var itemIndex = -1;
      for (var i = 0; i < items.length; i++) {
        if (items[i].name === currentEditItem.name) {
          itemIndex = i;
          break;
        }
      }

      if (itemIndex !== -1) {
        items[itemIndex] = createItem(name, price, quantity, state, image);
        closeModal();
        displayItems();
      }
    }
  });

  displayItems();
})(jQuery);
