**Update Manufacturer**
----
Update the properties of an existing `Manufacturer` object.

* **URL**

  `/manufacturer/:id`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  ```
  {
      "Website": "http://wolfammo.com",
      "Ammo": 1,
  }
  ```

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    {
	    "Id": 4,
	    "Name": "WOLF Performance Ammunition",
	    "Website": "http://wolfammo.com",
	    "Firearm": 0,
	    "Ammo": 1,
	    "Optic": 0
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
      url: "/firearm/78910",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });
  ```
