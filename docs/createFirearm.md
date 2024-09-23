**Create Firearm**
----
Create a new `Firearm` object

* **URL**

  `/firearm/`

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**
  **Required:**
  ```
  {
      "Manufacturer": "2",
      "Caliber": "3",
      "Model": "AR-15"
  }
  ```
  **Optional**
  ```
  {
      "Serial_Number": null,
      "LinkToProduct": null,
      "CurrentOptic": null,
  }
  ```

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    {
        "Id": "78910",
        "Manufacturer": "2",
        "Caliber": "3",
        "Model": "AR-15",
        "Serial_Number": null,
        "LinkToProduct": null,
        "CurrentOptic": null,
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
      url: "/firearm/",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
