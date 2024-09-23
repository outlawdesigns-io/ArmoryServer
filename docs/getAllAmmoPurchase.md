**Get All AmmoPurchase**
----
  Returns json array of all `AmmoPurchase` objects.

* **URL**

  `/ammopurchase/`

* **Method:**

  `GET`

*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    [
	  {
	    "Id": 4567,
	    "Ammo": 7,
	    "Vendor": 1,
	    "Rounds": 500,
	    "Price": 150,
	    "DatePurchased": "2023-10-07 00:00:00",
	    "DateReceived": "2023-10-29 18:44:37"
	  },
    ....]
    ```

* **Error Response:**

  * **Code:** 200
    **Content:** `{ error : "Access Denied. No Token Present." }`

   OR

  * **Code:** 200
      **Content:** `{ error : "Access Denied. Invalid Token." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/ammopurchase/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
