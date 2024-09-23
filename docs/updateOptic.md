**Update Optic**
----
Update the properties of an existing `Optic` object.

* **URL**

  `/optic/:id`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  ```
  {
      "Manufacturer": 26,
      "MagnificationTimes": 1,
      "LinkToProduct": "https://holosun.com/products/reflex-sight/510/hs510c.html"
  }
  ```

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
	  {
        "Id": 1,
        "Manufacturer": 26,
        "Name": "HS510C",
        "MagnificationTimes": 1,
        "LinkToProduct": "https://holosun.com/products/reflex-sight/510/hs510c.html"
	  }
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
      url: "/optic/1",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });
  ```
