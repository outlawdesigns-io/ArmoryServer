**Receive AmmoPurchase**
----
  Updates an `AmmoPurchase` object's `DateReceived` property to the current date. Adds the value of the `Rounds` property to the associated `Ammo` object's `Rounds` property. Returns json representation of the `AmmoPurchase`.

* **URL**

  `/ammopurchase/:id/receive`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
	  {
	    "Id": 4567,
	    "Ammo": 7,
	    "Vendor": 1,
	    "Rounds": 500,
	    "Price": 150,
	    "DatePurchased": "2023-10-07 00:00:00",
	    "DateReceived": "2023-10-29 18:44:37"
	  }
    ```

* **Error Response:**

  * **Code:** 200
    **Content:** `{ error : "Invalid UID" }`

  OR

  * **Code:** 200
    **Content:** `{ error : "Access Denied. No Token Present." }`

   OR

  * **Code:** 200
    **Content:** `{ error : "Access Denied. Invalid Token." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/ammo/4567/receive",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });
  ```
