**Get All Optic**
----
  Returns json array of all `Optic` objects.

* **URL**

  `/optic/`

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
        "Id": 1,
        "Manufacturer": 26,
        "Name": "HS510C",
        "MagnificationTimes": 1,
        "LinkToProduct": "https://holosun.com/products/reflex-sight/510/hs510c.html"
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
      url: "/optic/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
