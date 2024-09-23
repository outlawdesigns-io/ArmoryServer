**Get Firearm**
----
  Returns json data about a particular `Firearm` object.

* **URL**

  `/firearm/:id`

* **Method:**

  `GET`

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
	    "Id": 78910,
	    "Manufacturer": 13,
	    "Caliber": 2,
	    "Model": "AR-15",
	    "Serial_Number": "11111111",
	    "CurrentOptic": 2,
	    "LinkToProduct": "null"
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
      url: "/firearm/78910",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
