**Create TargetImage**
----
Create a new `TargetImage` object.

* **URL**

  `/shoot/:id/target`

* **Method:**

  `POST`

*  **URL Params**

   None

* **Data Params**
  **Required:**
  ```
  {
      "ShootId": 3,
      "File": new File([blob],"tmpname"),
  }
  ```
  **Optional**

  None

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    {
	    "Id": 765,
	    "ShootId": 3,
	    "BinaryData": {type:"Buffer", data:[]},
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
      url: "/shoot/1234/target",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
