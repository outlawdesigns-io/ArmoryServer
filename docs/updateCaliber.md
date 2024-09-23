**Update Caliber**
----
Update the properties of an existing `Caliber` object.

* **URL**

  `/caliber/:id`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  ```
  {
      "Label": "223 Remington",
  }
  ```

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
	  {
	    "Id": 2,
	    "Label": "223 Remington"
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
      url: "/caliber/2",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });
  ```
