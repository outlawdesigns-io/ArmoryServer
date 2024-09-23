**Get All Firearms**
----
  Returns json array of all `Firearm` objects.

* **URL**

  `/firearm/`

* **Method:**

  `GET`

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    [
	  {
	    "Id": 78910,
	    "Manufacturer": 13,
	    "Caliber": 2,
	    "Model": "AR-15",
	    "Serial_Number": "11111111",
	    "CurrentOptic": 2,
	    "LinkToProduct": "null"
	  },
    ....]
    ```

* **Error Response:**

  * **Code:** 200 <br />
    **Content:** `{ error : "Access Denied. No Token Present." }`

   OR

  * **Code:** 200 <br />
      **Content:** `{ error : "Access Denied. Invalid Token." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/firearm/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
