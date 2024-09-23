**Get All Manufacturer**
----
  Returns json array of all `Manufacturer` objects.

* **URL**

  `/manufacturer/`

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
	    "Id": 4,
	    "Name": "WOLF Performance Ammunition",
	    "Website": "http://wolfammo.com",
	    "Firearm": 0,
	    "Ammo": 1,
	    "Optic": 0
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
      url: "/manufacturer/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
