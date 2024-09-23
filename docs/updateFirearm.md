**Update Firearm**
----
Update the properties of an existing `Firearm` object.

* **URL**

  `/firearm/:id`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  ```
  {
      "Serial_Number": "22222222",
      "CurrentOptic": "5",
      "LinkToProduct": "https://www.colt.com/detail-page/msr/?attribute_pa_variant=m5-carbine"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "Id": "78910",
        "Manufacturer": "2",
        "Caliber": "3",
        "Model": "AR-15",
        "Serial_Number": 22222222,
        "LinkToProduct": "https://www.colt.com/detail-page/msr/?attribute_pa_variant=m5-carbine",
        "CurrentOptic": 5,
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
