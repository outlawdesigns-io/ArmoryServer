**Create Manufacturer**
----
Create a new `Manufacturer` object

* **URL**

  `/manufacturer/`

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**
  **Required:**
  ```
  {
      "Name": "WOLF Performance Ammunition"
  }
  ```
  **Optional**
  ```
  {
      "Website": null,
      "Firearm": null,
      "Ammo": null,
      "Optic": null
  }
  ```

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    {
	    "Id": 4,
	    "Name": "WOLF Performance Ammunition",
	    "Website": null,
	    "Firearm": 0,
	    "Ammo": 0,
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
      url: "/manufacturer/",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
