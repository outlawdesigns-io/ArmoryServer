**Create Vendor**
----
Create a new `Vendor` object

* **URL**

  `/vendor/`

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**
  **Required:**
  ```
  {
      "Name": "Gun Broker"
  }
  ```
  **Optional**
  ```
  {
      "Website": null
  }
  ```

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    {
	    "Id": 1,
	    "Name": "Gun Broker",
	    "Website": null,
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
      url: "/vendor/",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
