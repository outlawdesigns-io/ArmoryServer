**Get All Vendor**
----
  Returns json array of all `Vendor` objects.

* **URL**

  `/vendor/`

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
	    "Name": "Gun Broker",
	    "Website": "https://www.gunbroker.com/"
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
      url: "/vendor/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
