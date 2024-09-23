**Create Optic**
----
Create a new `optic` object

* **URL**

  `/optic/`

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**
  **Required:**
  ```
  {
      "Name": "HS510C"
  }
  ```
  **Optional**
  ```
  {
      "Manufacturer": null,
      "MagnificationTimes": null,
      "LinkToProduct": null
  }
  ```

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    {
	    "Id": 1,
	    "Name": "HS510C",
	    "Manufacturer": null,
	    "MagnificationTimes": null,
	    "LinkToProduct": null
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
      url: "/optic/",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
