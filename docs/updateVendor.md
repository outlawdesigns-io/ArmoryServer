**Update Vendor**
----
Update the properties of an existing `Vendor` object.

* **URL**

  `/vendor/:id`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  ```
  {
      "Website": "https://www.gunbroker.com/",
  }
  ```

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
	  {
	    "Id": 1,
	    "Name": "Gun Broker",
	    "Website": "https://www.gunbroker.com/",
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
      url: "/vendor/1",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });
  ```
